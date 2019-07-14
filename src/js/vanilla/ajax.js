function ajax_post_data_process(post_data) {
    var post_data_array = [];
    for (var i in post_data) {
        post_data_array.push(i + '=' + encodeURIComponent(post_data[i]))
    }
    return post_data_array.join('&');
}

export function ajax_post(url, post_data, callback_s, callback_f) {
    var httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send(ajax_post_data_process(post_data));

    function alertContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200 || httpRequest.status === 201) {
                if (typeof callback_s === 'function') {
                    callback_s(httpRequest.responseText);
                }
            } else {
                console.log('There was a problem with the request.');
                if (typeof callback_f === 'function') {
                    callback_f(false);
                }
            }
        }
    }
}