var scriptEl = document.currentScript;

var parsedScriptUrl = (new URL(document.currentScript.src))
var endpoint = parsedScriptUrl.protocol + "//" + parsedScriptUrl.hostname + "/api/collect";
var timeOnPageEndpoint = parsedScriptUrl.protocol + "//" + parsedScriptUrl.hostname + "/api/event/time-on-page";
var errorEndpoint = parsedScriptUrl.protocol + "//" + parsedScriptUrl.hostname + "/api/error";

var payload = {}
payload.event_name = 'pageview'
payload.location_href = location.href
payload.location_host = window.location.host
payload.location_pathname = window.location.pathname
payload.domain = scriptEl.getAttribute('data-domain')
payload.referrer = document.referrer || null
payload.inner_width = window.innerWidth
payload.lang = window.navigator.language || ''
payload.client_time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
payload.client_time = new Date().toISOString();

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

sendRequest(endpoint, payload, scheduleReoccringRequests);
