var scriptEl = document.currentScript;

var parsedScriptUrl = (new URL(document.currentScript.src))
var endpoint = parsedScriptUrl.protocol + "//" + parsedScriptUrl.hostname + "/api/collect";


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


var request = new XMLHttpRequest();
request.open('POST', endpoint, true);
request.setRequestHeader('Content-Type', 'application/json');

request.send(JSON.stringify(payload));

request.onreadystatechange = function () {
    if (request.readyState === 4) {
        console.log("Done");
        //TODO: broadcast to some external source
        // options && options.callback && options.callback()
    }
}
