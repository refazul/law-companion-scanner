import {
    string_lowercase,
    string_nonempty_is,
    string_contains
} from './string';

export function dom_search_by_text(searchText, tag_name) {
    tag_name = tag_name || 'div';

    var tags = document.getElementsByTagName(tag_name);
    var found = false;

    for (var i = 0; i < tags.length; i++) {
        if (tags[i].textContent == searchText) {
            found = tags[i];
            break;
        }
    }
    return found;
}
export function dom_search_by_text_all(searchText, tag_name) {
    tag_name = tag_name || 'div';

    var tags = document.getElementsByTagName(tag_name);
    var found = [];

    for (var i = 0; i < tags.length; i++) {
        if (string_contains(tags[i].textContent, searchText)) {
            found.push(tags[i]);
        }
    }
    return found;
}
export function dom_nth_sibling(node, n) {
    n = n || 0;
    if (node) {
        var nextSibling = node.nextSibling;
        var j = 0;
        while (nextSibling) {
            if (nextSibling.nodeType == 1) {
                if (j == n) {
                    return nextSibling;
                }
                j++;
            }
            nextSibling = nextSibling.nextSibling;
        }
    }
}
export function dom_nth_child(node, n) {
    n = n || 0;
    if (node) {
        const childNodes = node.childNodes;
        for (var i = 0, j = 0; i < childNodes.length; i++) {
            if (childNodes[i].nodeType == 1) {
                if (j == n) {
                    return childNodes[i];
                }
                j++;
            }
        }
    }
}
export function dom_textContent_get(node) {
    if (node) {
        return node.textContent;
    }
    return '';
}