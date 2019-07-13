// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    if (tab.url.indexOf('supremecourt.gov.bd') > -1) {
        chrome.tabs.sendMessage(tab.id, {
            greeting: "browser_action_clicked"
        }, null, function(response) {
            chrome.browserAction.setBadgeText({text: 'Z'});
            console.log(response);
        });
    }
});
console.log("Background");