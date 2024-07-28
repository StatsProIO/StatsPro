import './bootstrap';
import '../css/app.css';

import React from 'react';
import {render} from 'react-dom';
import {createInertiaApp} from '@inertiajs/inertia-react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';


createInertiaApp({
    title: (title) => `${title} - StatsPro`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        return render(<App {...props} />, el);
    },
});
