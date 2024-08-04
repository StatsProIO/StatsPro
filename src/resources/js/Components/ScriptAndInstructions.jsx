import {Box, Button, Link} from '@mui/material';
import React from 'react';
import IntegrationCode from './IntegrationCode';
import {Inertia} from "@inertiajs/inertia";
import Typography from "@mui/material/Typography";

export default function ScriptAndInstructions({domain}) {
    return (
        <>
            <IntegrationCode domain={domain}/>
            <Typography variant="subtitle1" sx={{py: 1}}>Copy the code above and add it to your website inside of the {`<head>`} tag. Then continue to the next step.</Typography>

            <Box sx={{my: 3}}>
                <Button variant="text"  onClick={() => { Inertia.visit('https://docs.statspro.io/getting-started/adding-a-domain?utm_source=script-and-instructions'); }} fullWidth size='small'>Need help adding the script?</Button>
                <Button variant="text" sx={{mt: 1}}  onClick={() => { Inertia.visit('/contact?utm_source=script-and-instructions'); }} fullWidth size='small'>Need More Help? Contact us!</Button>
            </Box>
        </>
    );
}
