import { Typography } from '@mui/material';
import React from 'react';
import IntegrationCode from './IntegrationCode';

export default function ScriptAndInstructions() {
    return (
        <>
            <IntegrationCode />

            <Typography sx={{ pt: 4 }}>Need help adding the integration?</Typography>
            <Typography sx={{ pb: 4 }}>Check out our handy guides for Wordpress, Shopify, React, and more.</Typography>
        </>
    );
}
