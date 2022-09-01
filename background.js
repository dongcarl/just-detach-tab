browser.commands.onCommand.addListener(function(command) {

  function getCurrentWindowTabs() {
    return browser.tabs.query({currentWindow: true});
  }

  function callOnActiveTab(callback) {
    getCurrentWindowTabs().then((tabs) => {
      for (var tab of tabs) {
        if (tab.active) {
          callback(tab, tabs);
        }
      }
    });
  }

  if (command == "detach-tab") {
    function logTabs(windowInfo) {
      for (let tabInfo of windowInfo.tabs) {
        var tabInformation = tabInfo.index;
        if (tabInformation == '0') {
          continue;
        }
        else {
          callOnActiveTab((tab, tabs) => {
            var creating = browser.windows.create({
              tabId: tab.id
            });
          });
          break;
        }
      }
    }
    let getTabs = browser.windows.getCurrent({populate: true});
    getTabs.then(logTabs);
  }
});
