
export function select_selected_value_get(select_dom) {
    if (select_dom && select_dom.selectedIndex) {
        return select_dom[select_dom.selectedIndex].value;
    }
}

export function send_message_to_background(message, callback) {
    chrome.runtime.sendMessage(message, function (response_ext) {
        if (typeof callback === 'function') {
            callback(response_ext);
        }
    });
}
export function open_link_delayed(url, delay) {
    setTimeout(function () {
        send_message_to_background({ greeting: 'create_new_tab', url: url });
    }, delay);
}
export function open_links(anchor_tags_selector, n) {
    n = n || 10;
    var links = document.querySelectorAll(anchor_tags_selector + ':not([data-processed="yes"]');
    for (var i = 0; i < n; i++) {
        var url = links[i].getAttribute('href');
        links[i].setAttribute('data-processed', 'yes');
        open_link_delayed(location.origin + url, i * 5000);
    }
}