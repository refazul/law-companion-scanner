import {
    string_contains
} from './string';

export function url_contains(test, url) {
    if (!url) {
        url = window.location.href;
    }
    if (string_contains(url, test)) {
        return true;
    }
    return false;
}
export function url_param_get_by_name(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}