var scriptEl = document.currentScript;

var parsedScriptUrl = (new URL(document.currentScript.src))
var endpoint = parsedScriptUrl.protocol + "//" + parsedScriptUrl.hostname + "/api/collect";
var timeOnPageEndpoint = parsedScriptUrl.protocol + "//" + parsedScriptUrl.hostname + "/api/event/time-on-page";



//TODO: respect navigator.doNotTrack? 

var payload = {}
payload.event_name = 'pageview'
payload.location_href = location.href
payload.location_host = window.location.host
payload.location_pathname = window.location.pathname
payload.domain = scriptEl.getAttribute('data-domain')
payload.referrer = document.referrer || null
payload.inner_width = window.innerWidth
payload.lang = window.navigator.language || ''

//TODO: use this to map to a country: https://codepen.io/diego-fortes/pen/YzEPxYw
payload.client_time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
payload.client_time = new Date().toISOString();


var dimensionAttributes = scriptEl.getAttributeNames().filter(function (name) {
    return name.substring(0, 6) === 'event-'
})

var props = payload.p || {}

dimensionAttributes.forEach(function (attribute) {
    var propKey = attribute.replace('event-', '')
    var propValue = scriptEl.getAttribute(attribute)
    props[propKey] = props[propKey] || propValue
})

payload.p = props

payload.h = 1


//TODO: broadcast to some external source
// options && options.callback && options.callback()



function sendRequest(url, body, next) {
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.send(JSON.stringify(body));

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 400) {
                console.log("Done");

                let json = null;
                try {
                    json = JSON.parse(request.responseText);
                } catch (e) {
                    throw new Error('Failed to parse response from server', e);
                }

                if (typeof next === 'function') {
                    return next(json)
                }
            }
            //TODO: broadcast to some external source
            // options && options.callback && options.callback()
        }
    }
}



function scheduleReoccringRequests(initialRequestJsonResponse) {

    const eventId = initialRequestJsonResponse.id;

    const interval = setInterval(() => {
        if (isInBackground() === true) {
            return
        }

        sendRequest(timeOnPageEndpoint, { id: eventId });
    }, 15000);

    if (typeof next === 'function') {
        return next(recordId)
    }

}

const isInBackground = function () {
    return document.visibilityState === 'hidden'
}


sendRequest(endpoint, payload, scheduleReoccringRequests);

//TODO: retry on errors and report the number of tries it took
