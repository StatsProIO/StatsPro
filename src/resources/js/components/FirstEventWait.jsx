import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import IntegrationCode from './IntegrationCode';
import { Inertia } from '@inertiajs/inertia'
import ScriptAndInstructions from './ScriptAndInstructions';


export default function FirstEventWait() {


    var interval;

    useEffect(() => {
        interval = setInterval(() => {
            //TODO: call refresh

            axios.get(`/api/event-status`)
                .then(function (response) {

                    console.log("status", response.data);

                    if (response.data === "SUCCESS") {
                        //TODO: redirect to the dashboard with a message
                        Inertia.visit('/dashboard');
                    }
                })
                .catch(function (error) {
                    // TODO: handle error
                    console.log(error);
                });
        }, 3000)

        return () => { clearInterval(interval); }
    }, [])



    return (
        <>


            <Grid container justifyContent="center">
                <Grid item md={5}>
                    <Box style={{ backgroundColor: '#fff' }} sx={{ p: 4 }}>

                        <Grid container justifyContent="center">
                            <Grid item>
                                <div class="blob"></div>
                            </Grid>
                        </Grid>

                        <Typography variant="h5" align="center" sx={{ mt: 2 }} style={{ fontWeight: 'bold' }}>Waiting for your first pageview event</Typography>
                        <Typography variant="body1" align="center">Your data will show up here once you add the script and load your website at least 1 time.</Typography>


                        <Box sx={{ mt: 7 }}>
                            <Typography variant="body1" align="center">Here's the code snippet again</Typography>
                            <ScriptAndInstructions />
                        </Box>
                    </Box>
                </Grid>
            </Grid>

        </>
    );
}
