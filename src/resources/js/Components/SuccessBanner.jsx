import {Alert, Grid, Typography} from '@mui/material';
import React from 'react';

export default function SuccessBanner(props) {
    return (
        <Alert severity="success" >
            {props.message}
        </Alert>
    );
}
