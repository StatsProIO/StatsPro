import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';



export function DashboardInfoCard({ title, value, subtitleValue, subtitleText }) {

    return <>
        <Paper sx={{ p: 2, my: 1, mx: 2 }} elevation={0}>
            <Typography variant="body2">{title}</Typography>
            <Typography variant="h5" sx={{ py: 1 }}>{value}</Typography>
            <Box sx={{ backgroundColor: 'rgba(76, 175, 80, 0.1)', color: 'rgb(76, 175, 80)', fontWeight: 'bold', p: 1, borderRadius: '5px', display: 'inline' }}>
                {subtitleValue}
            </Box>
            <Typography variant="body1" sx={{ display: 'inline' }} color="text.disabled">{subtitleText}</Typography>

        </Paper>
    </>

}
