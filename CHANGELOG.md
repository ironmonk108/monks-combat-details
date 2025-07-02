# version 13.04

Added different background to the round messages when in the notification area

Fixed issue with playing sunds when combat starts

Fixed issue with positioning the combat window

Added a next turn button while there's still combatants active in a combat, because why would you want the largest button on the combat tracker to end the combat when you're still in the middle of combat.

# version 13.03

Removing support for the transition from Little Details to Combat Details.  If you havn't updated by now, then transferring settings isn't going to be a big help.

# version 13.02

Removing debug code

# version 13.01

v13 Compatibility

# version 12.02

Fixing issues where combatant is deselected when remembering last target

Adding default placeholder image

Added the option to show the combat CR while the combat is in progress

Fixed issue when changing the dead to invisible, it's no longer tied with the auto defeated setting.

Fixed issue with not showing the combatant sheet when there's only one enemy in the combat.

Fixed issue with setting the defeated effect

# version 12.01

v12 Compatibility

# version 11.16

Fixed issues with the combat round message in DnD5e

Fixed compatibility issues with Combat Tracker Extensions

Fixed issues with combat bar data not being shown on the prototype token dialog

Fixed issues with the placeholder rolling initiative

Added a setting to allow for custom initiative rolling for a placeholder

Fixed issues with some systems that weren't getting combat data properly crashing the combat popup.

# version 11.15

Fixed combat initiative for GM for NPCs that havn't rolled initiative.

Added the option to set the combat playlist when creating the combat

# version 11.14

Fixed issue with switching to the chat tab when combat starts

Added the option to keep player characters that have not rolled initiative at the top of the list for them, so they don't move around when they're trying to press the roll initiative button.

# version 11.12

Fixed issues playing combat playlist

# version 11.11

Fixed round marker background changes in the new 5e version

Possibly fixed controlling a token that players shouldn't be able to control.

Added the option to play a combat playlist when combat starts.

# version 11.10

Added the option to display the placeholder button on both the sidebar and popout.

Fixed issue when there's no detected next combatant

Fixed issue with autoscrolling not detecting the top properly.

Added API for creating placeholders, so you can now use a Macro to create a placeholder.

Fixed issue with Warlock pact spell slots not prevented from being changed

Fixed issue where multiple spell slot changes would ignore any above the first change.

Fixed issue where spells were no longer able to be cast.

Added the option to prevent spell changes *and* send a notification

Fixed issue where auto defeated wasn't being set properly for player characters.

Fixed issue where the delete placeholder dialog would delete the currently viewed combatant rather than the actual placeholder.

Fixed issue where showing the combatant sheet was showing any time a change was made rather than when the combatant's turn starts.

Added MATT integration to create a placeholder using a trigger.

# version 11.09

Fixed the Round messages in SW5e

Fixed finding next turn for a token that has no actor

Fixed issue with showing your turn and next turn messages multiple times when combat is updated

Fixed issue with selecting combatants on turn for players

Added the option to include handlebar information in turn notification messages.

Fixed issue with playing Actor sound at start of the turn not respecting the volume properly.

Integrated with Monk's Sound Enhancements to allow changing the Sound Effect volume to affect Actor sound played at the start of turn.

Added the option to not change to the chat tab when combat starts

Cleared up the functionality when checking to see if the combatant should be shown in the tracker

Added the option to show the current character sheet on a combatants turn.

Added tooltips to effects shown in the combat tracker

Fixed issues with preventing combat spells in DnD 5e.

# version 11.08

Fixed issue with players not being able to role initiative.

Added an alert when a combat is created

# version 11.07

Fixed issue where changing the font size for turn notifications to a very large number was wrapping text when it shouldn't be.

Fixed issue where GM changing to the next turn wasn't saving the players targets.

Fixed issue with removing a shadow when the shadow has already been removed.

Fixed issue with the reroll initiative setting was preventing the combat tracker from updating.

Updated the hide enemy function to include rolling initiative privately for creatures that should be hidden.

Fixed issue with defining the visible property of the Combatant.

Fixed issues with removing placeholder combatant when no combatant exists.

Fixed issue with trying to set re-roll initiative specific to a combat instead of using the global setting.

Fixed issue with getting the context menu for combatants.

Added the option to turn off remembering the last position fo the combat tracker

Fixed issue where targets between turns weren't resetting, but adding upon.

# version 11.04

Added the option to set the font size for the large print turn notification.

Fixed initial initiative for placeholder combatants if the previous and next combatants are 1 initiative away from each other

Added the option to remove placeholder combatants after a certain number of turns.

Added the option to record the last position and height of the combat tracker, so the next tiem it's opened it will open exactly where you want it.

Added the option to reroll initiative at the start of every round.

Updated the hide enemies until their turn, to allow GMs to hide and show the enemy if they want to reveal it before it's their turn.

Updated the combat CR function in Pathfinder 2e to use it's own methods to calculate it properly.

Fixed issue with pathfinder 2e where it wasn't registering when a combat starts, and therefore not opening the pop out.

Fixed issue with setting a combatant's token to invisible when dead, if the combatant doesn't have a token.

# version 11.03

Fixing issues with Combat Carrosel Tracker.

Fixing issues with showing shadows for every movement.

Fixed issues with the right click menu for Combatants.

# version 11.02

Added the option to right click and set a combatant to the current combatant.

Added the option to set your own up next and your turn message.

Fixed issue when a combatant doesn't link to an actor.

Fixed issues with start turn icon not showing properly, and causing issues with other modules.

Moving the start icon to the grid layer rather than the tile layer.

Added the option to add placeholder combatants.

Added the option to popout the combat tracker when a combat is created.

Popout the combat tracker on a reload if there's an active combat and it's set to popout.

Fixed issues with combatant disposition.

# version 11.01

Added support for v11

Fixed round message in sw5e

Fixed issue with combat bars not appearing and not resetting the height of the token configuration dialog.

Fixed issue when a shadow doesn't exist and you change turns.

Fixed issue with challenge ratings having an unknown challenge due to either no monsters or no players.

# version 10.2

Fixed code that got lost when migrating from Little Details.  Hiding enemies on the combat tracker until combat starts, and allowing players to right click to target a token on the combat tracker, and allowing the combat tracker to be resized.

# version 10.1

Initial Release, split from Monk's Little Details