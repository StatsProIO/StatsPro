import React from 'react';
import Guest from '@/Layouts/Guest';
import {Grid, Typography} from '@mui/material';
import ConvincingBanner from "@/Components/ConvincingBanner";
import {Head} from "@inertiajs/inertia-react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

export default function BlogLayout({auth, title, date, tags, children}) {
    return (
        <Guest auth={auth}>
            <Head title={title} />
            <Grid container spacing={2} justifyContent={"center"} sx={{ py: 5, px: 1 }}>
                <Grid item lg={7} md={10} sm={11} xs={12} order={{xs: 1, sm: 2}}>
                    <Typography variant="p"><a href='/blog'>← Back to Blog</a></Typography>

                    <Paper elevation={0} sx={{ mt: 1,  p: 2 }}>
                        <Typography variant="h3" ><b>{title}</b></Typography>

                        <Grid container alignItems={'center'} spacing={2} sx={{py: 2}}>
                            <Grid item><Avatar alt="Remy Sharp" src="/images/remy.png" /></Grid>
                            <Grid item><Typography variant={'subtitle1'}>Remy Sharp</Typography></Grid>
                            <Grid item><Typography variant={'subtitle1'}>{date}</Typography></Grid>
                            {tags && <Grid item><Typography variant={'subtitle1'}>
                                {tags.map((tag) => <Chip label={tag} variant="outlined" color="primary" sx={{mx: .5}} />)}
                            </Typography>
                            </Grid>}
                        </Grid>

                        {children}
                    </Paper>
                </Grid>
            </Grid>
            <ConvincingBanner/>
        </Guest>
    );
}
