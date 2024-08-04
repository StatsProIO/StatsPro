import {Paper} from '@mui/material';
import React, {useState} from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function IntegrationCode({domain}) {

    const [successfullyCopied, setSuccessfullyCopied] = useState(false);

    const integrationCode = `<script data-domain="${domain}" src="${import.meta.env.VITE_APP_URL}/js/broadcaster.js" async></script>` +
        `<script>window.sp_events = window.sp_events || []; function sp_track(){window.sp_events.push(arguments)}</script>`;

    function copyToClipboard() {
        navigator.clipboard.writeText(integrationCode);
        setSuccessfullyCopied(true);
    }

    return (
        <>
            <Paper sx={{ backgroundColor: '#eee', p: 2, fontFamily: 'Courier New', fontWeight: 'bold', overflowWrap: 'break-word' }}>
                {integrationCode}
            </Paper>

            <Box display="flex" justifyContent="flex-end">
                {successfullyCopied && (
                    <Button variant="contained" size={'small'} color='success' onClick={copyToClipboard} sx={{my: 1, color: 'white'}}>Copied!</Button>
                )}

                {!successfullyCopied && (
                    <Button variant="contained" size={'small'} color='primary' onClick={copyToClipboard} sx={{my: 1}}>Copy to clipboard</Button>
                )}
            </Box>

        </>
    );
}
