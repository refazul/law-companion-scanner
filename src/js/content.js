import {
    ajax_post,
    dom_textContent_get,
    dom_search_by_text_all,
    string_purge,
    string_contains,
    string_number_get,
    window_close,
    url_param_get_by_name
} from './lib.js';

console.log('Content');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    if (request.greeting == "browser_action_clicked") {
        do_something(request, sender, sendResponse);
    }
});

function do_something(request, sender, sendResponse) {
    scanCause();
    sendResponse({ status: 'ok' })
}

function scanCause() {
    var court_name = court_name_get();
    var court_date = court_date_get();

    var cause_objects = [];
    var active_heading = false;
    var active_sl = false;
    var form = document.querySelector('form[name="form1"]');
    var tr_all = form.querySelectorAll(':scope > table > tbody > tr');
    tr_all.forEach(function (cause, index) {
        var first_td = cause.querySelector(':scope > td');
        

        if (first_td) {
            var second_td = cause.querySelectorAll(':scope > td')[1];
            var third_td = cause.querySelectorAll(':scope > td')[2];

            var first_td_textContent = first_td.textContent.trim();
            if (first_td_textContent == 'Sl') {
                active_heading = tr_all[index - 1].textContent
            }
            if (first_td_textContent > 0) {
                active_sl = first_td_textContent;
            }
            if (first_td_textContent > 0 || (first_td_textContent == '' && second_td && third_td)) {
                var cause_obj = {};
                cause_obj.court_name = court_name;
                cause_obj.court_date = court_date;
                cause_obj.case_sl = active_sl;

                var case_string = string_purge(second_td.innerText);
                cause_obj.case_type = case_string.split(/[0-9]/)[0].trim();
                cause_obj.case_number = case_string.split(cause_obj.case_type)[1].trim();
                cause_obj.case_heading = active_heading;
                cause_obj.case_parties = string_purge(third_td.innerText);
                console.log(cause_obj);
                cause_objects.push(cause_obj);
            }
        }
    });
    var success_count = 0;
    for (var i = 0; i < cause_objects.length; i++) {
        var c = cause_objects[i];
        ajax_post('https://crescentcoder.com/api/v1/causes', c, (res) => {
            success_count++;
            console.log(res);
            if (success_count == cause_objects.length) {
                window_close();
            }
        }, () => {
            console.log(c);
        });
    }
}

function court_name_get() {
    var court_name_raw = string_purge(dom_textContent_get(dom_search_by_text_all('List of', 'font')[0]));
    var building_no = string_number_get(court_name_raw);
    var building_name = 'uncategorized';

    if (string_contains(court_name_raw, 'Annex')) {
        building_name = 'annex';
    } else if (string_contains(court_name_raw, 'Main')) {
        building_name = 'main';
    } else if (string_contains(court_name_raw, 'Blank')) {
        building_name = 'blank';
    } else if (string_contains(court_name_raw, 'Lawazima')) {
        building_name = 'lawazima';
    }

    return building_name + (building_no > 0 ? '-' + building_no : '');
}

function court_date_get() {
    var date_parts = document.getElementById('date1').value.split('/');
    return date_parts[2] + '-' + date_parts[1] + '-' + date_parts[0];
}

