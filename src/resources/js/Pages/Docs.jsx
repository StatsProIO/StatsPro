import React from 'react';
import {Typography} from '@mui/material';
import DocsLayout from "@/Layouts/DocsLayout";


export default function Docs() {
    return (
        <DocsLayout title={'Docs'}>
            <Typography variant={'h4'} sx={{py: 1}}>Welcome to the Marble Metrics docs!</Typography>
            <Typography sx={{py: 1}}>Here you'll find useful information on why and how to use Marble Metrics.</Typography>
            <Typography sx={{py: 1}}><a href="/contact">Let us know</a> if there's some documentation you'd like to see.</Typography>

        </DocsLayout>
    );
}
