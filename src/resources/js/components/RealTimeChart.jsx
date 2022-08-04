import { Paper, Stack, Typography } from '@mui/material';
import React from 'react';

export function RealTimeChart({ inputData }) {

  return <>
    <Paper className="blueShadow" sx={{ p: 3, backgroundColor: 'rgb(42,98,254)', color: '#fff' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h6">Real Time</Typography>
        <div className="small-white-pulse"></div>
      </Stack>

      <Typography variant="body1" color="rgb(255 255 255 / 60%)">Active users in last 5 minutes</Typography>
      <Typography variant="h3" sx={{ py: 2, }}>{inputData.length}</Typography>

      {inputData.slice(0, 10).map(realtimeItem => { return <Typography key={realtimeItem.path} className="flashBackground" variant="body1" style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', borderLeft: 'solid', borderWidth: '0px', marginTop: '4px', paddingLeft: '5px' }}>{realtimeItem.path}</Typography> })}
    </Paper>
  </>
}
