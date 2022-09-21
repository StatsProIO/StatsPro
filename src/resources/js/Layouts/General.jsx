import React from 'react';
import Guest from '@/Layouts/Guest';
import {Grid, Typography} from '@mui/material';
import ConvincingBanner from "@/Components/ConvincingBanner";

export default function General({auth, title, children}) {
    return (
        <Guest auth={auth}>
            <Grid container justifyContent={"center"} sx={{ py: 5, px: 1 }}>
                <Grid item lg={6} md={11}>
                    <Typography variant="h3"><b>{title}</b></Typography>
                    {children}
                </Grid>
            </Grid>
            <ConvincingBanner/>
        </Guest>
    );
}
