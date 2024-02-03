var scriptEl = document.currentScript;

var parsedScriptUrl = (new URL(document.currentScript.src))
var endpoint = parsedScriptUrl.protocol + "//" + parsedScriptUrl.hostname + "/api/collect";
var timeOnPageEndpoint = parsedScriptUrl.protocol + "//" + parsedScriptUrl.hostname + "/api/event/time-on-page";
var errorEndpoint = parsedScriptUrl.protocol + "//" + parsedScriptUrl.hostname + "/api/error";

function buildPayload() {
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
    return payload;
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

    let req = new Request(url, {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(body)
    });

    fetch(req)
        .then(function(response){
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response)
            } else if(response.status === 403) {
                return null; //end the chain, don't schedule any further requests
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        })
        .then(function(response){
            return response.json()
        })
        .then(function(responseJson) {
            if (typeof next === 'function') {
                next(responseJson)
            }
        }).catch(function(err) {
            recordError({ message: 'Broadcaster request failed: ' + err.toString(), url, body } );
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

sendRequest(endpoint, buildPayload(), scheduleReoccringRequests);

var pS = window.history.pushState;
window.history.pushState = function() {
    pS.apply(this, arguments);
    sendRequest(endpoint, buildPayload(), null);
    console.log("push state called");
};

window.addEventListener('popstate', function(event) {
    sendRequest(endpoint, buildPayload(), null);
    console.log('popstate fired!');
});


var rS = window.history.replaceState;
window.history.replaceState = function() {
    sendRequest(endpoint, buildPayload(), null);
    rS.apply(this, arguments);
    console.log("replace state called");
};
