import React from 'react';
import Guest from '@/Layouts/Guest';
import {Grid, Typography} from '@mui/material';
import ConvincingBanner from "@/Components/ConvincingBanner";
import DocsList from "@/Components/DocsList";
import {Head} from "@inertiajs/inertia-react";

export default function DocsLayout({auth, title, children}) {
    return (
        <Guest auth={auth}>
            <Head title={title} />
            <Grid container spacing={2} justifyContent={"center"} sx={{ py: 5, px: 1 }}>
                <Grid item lg={2} md={3} sm={4} xs={12} order={{xs: 2, sm: 1}}>
                    <DocsList/>
                </Grid>
                <Grid item lg={6} md={9} sm={8} xs={12} order={{xs: 1, sm: 2}}>
                    <Typography variant="h3"><b>{title}</b></Typography>
                    {children}
                </Grid>
            </Grid>
            <ConvincingBanner/>
        </Guest>
    );
}
