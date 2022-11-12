import React from 'react';
import Guest from '@/Layouts/Guest';
import {Grid, Typography} from '@mui/material';
import ConvincingBanner from "@/Components/ConvincingBanner";
import {Head} from "@inertiajs/inertia-react";

export default function BlogLayout({auth, title, children}) {
    return (
        <Guest auth={auth}>
            <Head title={title} />
            <Grid container spacing={2} justifyContent={"center"} sx={{ py: 5, px: 1 }}>
                <Grid item lg={6} md={9} sm={8} xs={12} order={{xs: 1, sm: 2}}>
                    <Typography variant="p"><a href='/blog'>← Back to Blog</a></Typography>
                    <Typography variant="h3"><b>{title}</b></Typography>
                    {children}
                </Grid>
            </Grid>
            <ConvincingBanner/>
        </Guest>
    );
}
