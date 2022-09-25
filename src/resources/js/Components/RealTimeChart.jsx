import { Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export function RealTimeChart({ domain }) {

  const [realtime, setRealtime] = useState([]);

  const getData = async () => {
    const res = await fetch("/api/events/real-time/" + domain);
    const data = await res.json();

    setRealtime(data);
  };

  useEffect(() => {
    const timer = setInterval(getData, 2000);
    return () => clearInterval(timer);
  }, []);

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
      <Typography variant="h3" sx={{ py: 2, }}>{realtime.length}</Typography>

      {realtime.slice(0, 10).map(realtimeItem => { return <Typography key={realtimeItem.id} className="flashBackground" variant="body1" style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', borderLeft: 'solid', borderWidth: '0px', marginTop: '4px', paddingLeft: '5px' }}>{realtimeItem.path}</Typography> })}
    </Paper>
  </>
}
