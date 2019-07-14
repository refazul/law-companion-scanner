export function string_lowercase(string) {
    if (typeof string === 'string') {
        return string.toLowerCase();
    }
    return string;
}
export function string_nonempty_is(string) {
    if (typeof string === 'string' && string.length > 0) {
        return true;
    }
    return false;
}
export function string_contains(string, needle) {
    // If number, convert it to string
    if (typeof string === 'number') {
        string += '';
    }
    // Check if string before checking indexOf
    if (typeof string === 'string' && string.indexOf(needle) > -1) {
        return true;
    }
    return false;
}

export function string_purge(string) {
    if (string_nonempty_is(string)) {
        return string.replace(/<br\s*\/?>/gi, ' ').trim().replace(/[\r\n ]+/g, " ");
    }
    return '';
}

export function string_number_get(string) {
    return string_purge(string).replace(/^\D+/g, '');
}