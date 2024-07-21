import {Paper} from '@mui/material';
import React from 'react';

export default function IntegrationCode({domain}) {
    return (
        <>
            <Paper sx={{ backgroundColor: '#eee', p: 2, fontFamily: 'Courier New', fontWeight: 'bold', overflowWrap: 'break-word' }}>
                &lt;script data-domain="{domain}" src="{import.meta.env.VITE_APP_URL}/js/broadcaster.js" async&gt;&lt;/script&gt;<br/>
                &lt;script&gt;
                    window.sp_events = window.sp_events || [];
                    function sp_track()&#123;window.sp_events.push(arguments)&#125;
                &lt;/script&gt;
            </Paper>
        </>
    );
}
