import {
    ajax_post,
    dom_textContent_get,
    dom_search_by_text_all,
    string_purge,
    string_contains,
    string_number_get
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
    var i = 1;
    var court_name = court_name_get();
    var court_date = court_date_get();

    var active_heading = false;
    var tr_all = document.querySelectorAll('form[name="form1"] table tr');
    tr_all.forEach(function (cause, index) {
        var first_td = cause.querySelector('td');

        if (first_td) {
            var first_td_textContent = first_td.textContent.trim();
            if (first_td_textContent == 'Sl') {
                active_heading = tr_all[index - 1].textContent
            }
            if (first_td_textContent > 0) {
                var cause_obj = {};
                cause_obj.court_name = court_name;
                cause_obj.court_date = court_date;
                cause_obj.case_sl = first_td_textContent;

                var case_string = string_purge(cause.querySelectorAll('td')[1].innerText);
                cause_obj.case_type = case_string.split(/[0-9]/)[0].trim();
                cause_obj.case_number = case_string.split(cause_obj.case_type)[1].trim();
                cause_obj.case_heading = active_heading;
                cause_obj.case_parties = string_purge(cause.querySelectorAll('td')[2].innerText);
                console.log(cause_obj);
                ajax_post('http://localhost:3000/api/v1/causes', cause_obj, (res) => {
                    console.log(res);
                });
            }
        }
    })
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

