import {Alert, Grid, Typography} from '@mui/material';
import React from 'react';

export default function ValidationErrors({ errors }) {
    return (
        Object.keys(errors).length > 0 && (

            <Grid container justifyContent="center">
                <Grid item md={5}>

                    <Alert severity="error" sx={{ m: 2 }}>

                        <Typography><b>Whoops! Something went wrong.</b></Typography>
                        <ul>
                            {Object.keys(errors).map(function (key, index) {
                                return <li key={index}>{errors[key]}</li>;
                            })}
                        </ul>
                    </Alert>
                </Grid>
            </Grid>

        )
    );
}
