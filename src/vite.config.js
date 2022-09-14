import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: "./",
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
        }),
        react(),

    ],
    server: {
        https: true,
        host: true,
        port: 3000
    }
});
