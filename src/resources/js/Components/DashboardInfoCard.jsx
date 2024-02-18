import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export function DashboardInfoCard({ title, value, subtitleValue, subtitleText }) {

    return <>
        <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="body2">{title}</Typography>
            <Typography variant="h5" sx={{ py: 1 }}>{value}</Typography>
            {subtitleValue && <Box sx={{ backgroundColor: subtitleValue < 0 ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)', color: subtitleValue < 0 ? 'rgb(244, 67, 54)' : 'rgb(76, 175, 80)', fontWeight: 'bold', p: 1, borderRadius: '5px', display: 'inline' }}>
                {Number((subtitleValue).toFixed(1))}%
            </Box>}
            {subtitleText && <Typography variant="body1" sx={{ display: 'inline' }} color="text.disabled"> {subtitleText}</Typography>}

        </Paper>
    </>

}
