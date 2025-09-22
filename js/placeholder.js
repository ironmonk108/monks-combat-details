import { MonksCombatDetails, i18n, log, debug, setting, patchFunc } from "../monks-combat-details.js";

export class MCD_Placeholder {
    static init() {
        Hooks.on("renderCombatTracker", (app, html, data) => {
            if (game.user.isGM && (setting("enable-placeholders") == "both" || (setting("enable-placeholders") == "true" && !app.isPopout) || (setting("enable-placeholders") == "popout" && app.isPopout)) && app.viewed) {
                if ($('nav.combat-controls.add-placeholder', html).length == 0) {
                    $('<nav>').addClass("combat-controls add-placeholder").append(
                        $("<button>").attr("type", "button").addClass("combat-control combat-control-lg").html(`<i class="fa fa-plus"></i> ${i18n("MonksCombatDetails.AddPlaceholder")}`).on("click", MCD_Placeholder.addPlaceholder.bind(this, app)))
                        .insertBefore($(".combat-controls", html));
                }
            }

            if (app.viewed?.combatants) {
                for (let combatant of app.viewed?.combatants) {
                    if (combatant.getFlag("monks-combat-details", "placeholder")) {
                        $(`.combatant[data-combatant-id="${combatant.id}"]`).addClass("placeholder");
                        //$(`.combatant[data-combatant-id="${combatant.id}"] .combatant-controls > *:not([data-control="toggleHidden"])`, html).remove();
                    }
                }
            }
        });

        Hooks.on("getCombatTrackerContextOptions", (app, menu) => {
            let idx = menu.findIndex(m => m.name == "COMBAT.CombatantUpdate") || 1;
            menu.splice(idx, 0,
                {
                    name: i18n("MonksCombatDetails.CreatePlaceholder"),
                    icon: '<i class="fas fa-user"></i>',
                    condition: li => {
                        let combatant = game.combats.viewed.combatants.get($(li).data("combatant-id"));
                        return combatant && !combatant.getFlag("monks-combat-details", "placeholder");
                    },
                    callback: li => {
                        let combatant = game.combats.viewed.combatants.get($(li).data("combatant-id"));
                        if (combatant) {
                            combatant = new PlaceholderCombatant(combatant);
                            delete combatant._id;
                            new PlaceholderCombatantConfig({ document: combatant }).render(true);
                        }
                    }
                });
        });

        let CombatantInitiative = function (wrapped, ...args) {
            if (this.getFlag("monks-combat-details", "placeholder")) {
                let formula = String(setting("placeholder-initiative") || CONFIG.Combat.initiative.formula || game.system.initiative);
                const rollData = this.actor?.getRollData() || {};
                return Roll.create(formula, rollData);
            }
            return wrapped(...args);
        }

        patchFunc("Combatant.prototype.getInitiativeRoll", CombatantInitiative, "MIXED");

        let ConfigureCombatant = function (wrapped, ...args) {
            let [li] = args;
            const combatant = this.viewed.combatants.get(li.data("combatant-id"));
            if (combatant?.getFlag("monks-combat-details", "placeholder")) {
                return new PlaceholderCombatantConfig(combatant, {
                    top: Math.min(li[0].offsetTop, window.innerHeight - 350),
                    left: window.innerWidth - 720
                }).render(true);
            }
            return wrapped(...args);
        }

        patchFunc("foundry.applications.sidebar.tabs.CombatTracker.prototype._onConfigureCombatant", ConfigureCombatant, "MIXED");
    }

    static addPlaceholder(app) {
        let combatant = new PlaceholderCombatant(app.viewed);
        delete combatant._id;
        new PlaceholderCombatantConfig({ document: combatant }).render(true);
    }

    static createPlaceholder({ combat, combatant, initiative, removeAfter, img, name, hidden } = {}) {
        combat = combat ?? game.combats.viewed;
        if (combat?.started) {
            let combatantData = { initiative, name, img, hidden, flags: { 'monks-combat-details': { placeholder: true, removeStart: combat.round } } };
            if (combatant) {
                combatantData.actorId = combatant.actorId;
                combatantData.tokenId = combatant.tokenId;
            }

            if (!combatantData.initiative) {
                combatant = combatant ?? combat.combatant;
                if (combatant?.initiative) {
                    combatantData.initiative = combatant.initiative - 1;
                    if (combat.nextCombatant?.initiative) {
                        let diff = combatant.initiative - combat.nextCombatant?.initiative;
                        if (diff <= 1 && diff >= 0)
                            // set combatant initiative to halfway between current and next combatant round to one decimal place
                            combatantData.initiative = Math.round((combatant.initiative + combat.nextCombatant?.initiative) / 2 * 10) / 10;
                    }
                }
            }

            if (removeAfter)
                combatantData.flags['monks-combat-details'].removeAfter = removeAfter;

            combat.createEmbeddedDocuments("Combatant", [combatantData]);
        }
    }
}

class PlaceholderCombatant extends Combatant {
    constructor(entity) {
        let data = { name: i18n("MonksCombatDetails.PlaceholderCombatantName"), img: setting("placeholder-image") };

        let combat = entity instanceof Combat ? entity : entity.combat;
        let combatant = entity instanceof Combatant ? entity : combat?.combatant;

        if (entity instanceof Combatant) {
            data = combatant.toObject();
            data.img = combatant.img || setting("placeholder-image");
            data.name = combatant.name + " [Placeholder]"
        }

        if (combatant.initiative)
            data.initiative = combatant.initiative - 1;

        if (combat?.started && combat.nextCombatant?.initiative) {
            let diff = combatant?.initiative - combat.nextCombatant?.initiative;
            if (diff <= 1 && diff >= 0)
                // set combatant initiative to halfway between current and next combatant round to one decimal place
                data.initiative = Math.round((combatant?.initiative + combat.nextCombatant?.initiative) / 2 * 10) / 10;
        }
        super(data, { parent: combat });
    }
}

export class PlaceholderCombatantConfig extends foundry.applications.sheets.CombatantConfig {
    constructor(object, options) {
        super(object, options);
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "placeholder-combatant-form",
        });
    }

    async _render(force = false, options = {}) {
        await super._render(force, options);
        $(`input[name="defeated"]`, this.element).parent().remove();
        $('<div>').addClass("form-group")
            .append($('<label>').html(i18n("MonksCombatDetails.RemoveAfter")))
            .append($('<input>').attr("type", "number").css({
                "text-align": "right",
                "flex": "0 0 75px"
        }).attr("name", "flags.monks-combat-details.removeAfter").val(this.object.getFlag("monks-combat-details", "removeAfter")))
            .insertBefore($(`footer`, this.element));

        this.setPosition({ height: "auto" });
    }

    async _updateObject(event, formData) {
        formData["flags.monks-combat-details.placeholder"] = true;
        formData["flags.monks-combat-details.removeStart"] = game.combat.round;
        if (!this.object._id) {
            formData.actorId = this.object.actorId;
            formData.tokenId = this.object.tokenId;
        }
        super._updateObject(event, formData);
    }
}