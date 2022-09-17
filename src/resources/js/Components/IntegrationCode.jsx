import { Paper } from '@mui/material';
import React from 'react';

export default function IntegrationCode() {
    return (
        <>
            <Paper sx={{ backgroundColor: '#eee', py: 2 }}>
                &lt;script data-domain="roastmygame.com" src="{import.meta.env.VITE_APP_URL}/js/broadcaster.js" async&gt; &lt;/script&gt;
            </Paper>
        </>
    );
}
