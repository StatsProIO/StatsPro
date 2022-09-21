import React from 'react';
import {Typography} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {Inertia} from "@inertiajs/inertia";

export default function ConvincingBanner() {
    return (
        <Grid container justifyContent={"center"} >
            <Grid item xs={12} sx={{backgroundColor: '#334a71'}}>
                <Grid container justifyContent={"center"} sx={{py: 3}}>
                    <Grid item lg={6} md={11} xs={12} sx={{color: '#fff', px: 1}}>
                        <Typography variant={'h4'} fontWeight={'bold'}>The most EU-friendly analytics system.</Typography>
                        <Typography variant={'h6'}>Start for free today, no credit card required.</Typography>

                        <Button onClick={() => Inertia.get('/register')} variant="contained" size="large" style={{fontSize: '1.1em'}} endIcon={<ArrowForwardIosIcon />}
                                sx={{px: 2, py: 1, my: 2}} fontWeight="bold"><b>Get Started For Free</b></Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
