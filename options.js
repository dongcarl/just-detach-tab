const commandDetach = 'detach-tab';

/**
 * Update the UI: set the value of the shortcut textbox.
 */
async function updateUI() {
  let commands = await browser.commands.getAll();
  for (command of commands) {
    if (command.name === commandDetach) {
      document.querySelector('#shortcut-detach').value = command.shortcut;
    }
  }
}

/**
 * Update the shortcut based on the value in the textbox.
 */
async function applyShortcut() {
  await browser.commands.update({
    name: commandDetach,
    shortcut: document.querySelector('#shortcut-detach').value
  });
}

/**
 * Reset the shortcut and update the textbox.
 */
async function resetShortcut() {
  await browser.commands.reset(commandDetach);
  updateUI();
}

/**
 * Update the UI when the page loads.
 */
document.addEventListener('DOMContentLoaded', updateUI);

/**
 * Handle update and reset button clicks
 */
document.querySelector('#apply').addEventListener('click', applyShortcut)
document.querySelector('#reset').addEventListener('click', resetShortcut)
