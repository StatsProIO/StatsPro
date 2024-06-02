import _ from 'lodash';
window._ = _;

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const parsedScriptUrl = (new URL(window.location.href));
const errorEndpoint = parsedScriptUrl.protocol + "//" + parsedScriptUrl.hostname + "/api/error";

function sendStuffToServer(...args){
    var errorRequest = new XMLHttpRequest();
    errorRequest.open('POST', errorEndpoint, true);
    errorRequest.setRequestHeader('Content-Type', 'application/json');
    errorRequest.send(JSON.stringify(args));
}

// define a new console
var newConsole=(function(oldCons){
    return {
        ...oldCons,
        log: function(text){
            oldCons.log(text);
            sendStuffToServer(text);
        },
        info: function (text) {
            oldCons.info(text);
            sendStuffToServer(text);
        },
        warn: function (text) {
            oldCons.warn(text);
            sendStuffToServer(text);
        },
        error: function (text) {
            oldCons.error(text);
            sendStuffToServer(text);
        }
    };
}(window.console));


window.console = newConsole;
window.onerror = sendStuffToServer;
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     wsHost: import.meta.env.VITE_PUSHER_HOST ?? `ws-${import.meta.env.VITE_PUSHER_CLUSTER}.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });
