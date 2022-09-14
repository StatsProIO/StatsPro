import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path'


export default defineConfig({
    build: {

        // outDir: 'public/broadcaster/',

        rollupOptions: {
            input: {
                'broadcaster-input': path.resolve(__dirname, 'resources/js/broadcaster/broadcaster.ts'),
            },
        }
    },
    server: {
        host: true,
        port: 3001
    }
});
