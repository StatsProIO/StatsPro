var scriptEl = document.currentScript;

var parsedScriptUrl = (new URL(document.currentScript.src))
var endpoint = parsedScriptUrl.protocol + "//" + parsedScriptUrl.hostname + "/api/collect";
var timeOnPageEndpoint = parsedScriptUrl.protocol + "//" + parsedScriptUrl.hostname + "/api/event/time-on-page";
var errorEndpoint = parsedScriptUrl.protocol + "//" + parsedScriptUrl.hostname + "/api/error";

/**
 * Fetch, retrying on any failures
 * On any response (100-599), returns the response
 * On exceptions, retries
 */
const fetchPlus = (url, body, options = {}, retries) => {
    let req = new Request(url, {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(body)
    });

    return fetch(req, options)
        .then((response) => {
            //TODO: in the future, retry based on status code errors?
            return response;
        })
        .catch((error) => {
            if (retries > 0) {
                return fetchPlus(url, body, options, retries - 1)
            } else {
                throw error;
            }
        });
}

function buildPageviewPayload() {
    var payload = {};
    payload.event_name = 'pageview';
    payload.location_href = location.href;
    payload.location_host = window.location.host;
    payload.location_pathname = window.location.pathname;
    payload.domain = scriptEl.getAttribute('data-domain');
    payload.referrer = document.referrer || null;
    payload.inner_width = window.innerWidth;
    payload.lang = window.navigator.language || '';
    payload.client_time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    payload.client_time = new Date().toISOString();
    payload.query_params = queryParams();
    payload.page_load_time = Math.max(window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart, 0);
    return payload;
}

function buildCustomEventsPayloads(sp_events) {
    var payloads = [];
    for (var i = 0; i < sp_events.length; i++) {
        var payload = {};
        payload.event_name = 'custom-event';
        payload.custom_event_name = sp_events[i][0] || 'none';
        payload.location_href = location.href;
        payload.location_host = window.location.host;
        payload.location_pathname = window.location.pathname;
        payload.domain = scriptEl.getAttribute('data-domain');
        payload.referrer = document.referrer || null;
        payload.inner_width = window.innerWidth;
        payload.lang = window.navigator.language || '';
        payload.client_time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        payload.client_time = new Date().toISOString();
        payload.query_params = queryParams();
        payloads.push(payload);
    }
    return payloads;
}

function queryParams() {
    var pair;
    var data = {}
    var pairs = window.location.search.substring(window.location.search.indexOf("?") + 1).split("&")
    for (var i = 0; i < pairs.length; i++) {
        pair = pairs[i].split("=");
        if (-1 < ["keyword", "q", "ref", "utm_campaign", "utm_content", "utm_medium", "utm_source", "utm_term"].indexOf(decodeURIComponent(pair[0]))) {
            data[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
    }
    return data;
}

function sendRequest(url, body, next) {
    fetchPlus(url, body, {}, 5)
        .then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else if (response.status === 403) {
                return null; //end the chain, don't schedule any further requests
            } else {
                return response.text().then(text => { throw new Error("Non-successful status code: " + response.status + " " + text) })
            }
        })
        .then(function (responseJson) {
            if (responseJson && typeof next === 'function') {
                next(responseJson)
            }
        }).catch(function (err) {
            recordError({ message: 'Broadcaster request failed: ' + err.toString(), url, body });
        });
}

function scheduleReoccringRequests(initialRequestJsonResponse) {
    const eventId = initialRequestJsonResponse.id;
    const interval = setInterval(() => {
        if (isInBackground() === true) {
            return;
        }
        sendRequest(timeOnPageEndpoint, { id: eventId });
    }, 15000);
}

const isInBackground = function () {
    return document.visibilityState === 'hidden'
}

function recordError(error) {
    var errorRequest = new XMLHttpRequest();
    errorRequest.open('POST', errorEndpoint, true);
    errorRequest.setRequestHeader('Content-Type', 'application/json');
    errorRequest.send(JSON.stringify(error));
}

function initialize() {
    if (typeof sp_events !== "object") {
        sp_events = []
    }

    // send our first pageview and any custom events that have been gathered
    const pageviewPayload = buildPageviewPayload();
    const customEventsPayload = buildCustomEventsPayloads(window.sp_events);
    const initialPayload = [pageviewPayload].concat(customEventsPayload);

    sendRequest(endpoint, initialPayload, scheduleReoccringRequests);

    // setup javascript page handlers
    var pS = window.history.pushState;
    window.history.pushState = function () {
        pS.apply(this, arguments);
        sendRequest(endpoint, buildPageviewPayload(), null);
    };

    window.addEventListener('popstate', function (event) {
        sendRequest(endpoint, buildPageviewPayload(), null);
    });

    // replace the sp_events array with an object that sends requests
    window.sp_events = {
        push: function () { sendRequest(endpoint, buildCustomEventsPayloads(arguments)) }
    }
}

initialize();
