console.log('Content');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    if (request.greeting == "browser_action_clicked") {
        do_something(request, sender, sendResponse);
    }
});

function do_something(request, sender, sendResponse) {
    sendResponse({status: 'ok'})
}