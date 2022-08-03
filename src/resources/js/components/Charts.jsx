import { Box, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { FormControl, Grid, InputLabel, Menu, MenuItem, Select } from '@mui/material';
import { TopSourcesChart } from '@/components/TopSourcesChart';
import { PageviewsMiniChart } from '@/components/PageviewsMiniChart';
import { DashboardInfoCard } from '@/components/DashboardInfoCard';
import { TopPages } from '@/components/TopPages';
import { PageviewsChart } from '@/components/PageviewsChart';
import { DevicesChart } from '@/components/DevicesChart';
import { LocationChart } from '@/components/LocationChart';
import useQueryString from '@/customHooks/useQueryString';
import {
    ArcElement,
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    BarElement
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    BarElement,
    ArcElement
);

export default function Charts({ domain, setDomain }) {

    const [domains, setDomains] = useState([]);
    const [range, setRange] = useQueryString("range", '24h');

    const [timeBuckets, setTimeBuckets] = useState([]);
    const [pageviews, setPageviews] = useState([]);
    const [topSources, setTopSources] = useState([]);
    const [topPages, setTopPages] = useState([]);
    const [devices, setDevices] = useState([]);
    const [locations, setLocations] = useState([]);
    const [realtime, setRealtime] = useState([]);


    useEffect(() => {
        //make an API request for range/domain

        axios.get(`/api/events?range=${range}&domain=${domain}`)
            .then(function (response) {

                console.log("domains", response.data.domains);
                // handle success
                setDomains(response.data.domains);
                setTimeBuckets(response.data.time_buckets);
                setPageviews(response.data.pageviews);
                setTopSources(response.data.top_sources);
                setTopPages(response.data.top_pages);
                setDevices(response.data.devices);
                setLocations(response.data.locations);
                setRealtime(response.data.realtime);
            })
            .catch(function (error) {
                // TODO: handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [range, domain])

    return (
        <>
            <Grid container>
                <Grid item lg={8}>
                    <Typography variant="h4"><b>Dashboard</b></Typography>
                    <Typography variant="h6">Welcome back!</Typography>
                </Grid>
                <Grid item lg={2} sx={{ px: 2 }}>

                    <FormControl fullWidth variant="filled">
                        <InputLabel id="domain-label">Domain</InputLabel>
                        <Select
                            value={domain}
                            labelId="domain-label"
                            label="Domain"
                            onChange={(event) => { setDomain(event.target.value) }}
                        >
                            {domains.map((domain) => { return (<MenuItem value={domain} key={domain}>{domain}</MenuItem>); })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item lg={2}>

                    <FormControl fullWidth variant="filled">
                        <InputLabel id="time-range-label">Time Range</InputLabel>
                        <Select
                            labelId="time-range-label"
                            value={range}
                            label="Time Range"
                            onChange={(event) => { setRange(event.target.value) }}
                        >
                            <MenuItem value='24h'>Last 24 hours</MenuItem>
                            <MenuItem value='7d'>Last 7 days</MenuItem>
                            <MenuItem value='30d'>Last 30 days</MenuItem>
                            <MenuItem value='month-to-date'>Month to Date </MenuItem>
                            <MenuItem value='last-month'>Last Month</MenuItem>
                            <MenuItem value='year-to-date'>Year to Date</MenuItem>
                            <MenuItem value='12m'>Last 12 Months</MenuItem>
                            <MenuItem value='all-time'>All Time</MenuItem>
                        </Select>
                    </FormControl>

                </Grid>
            </Grid>






            <Grid container>
                <Grid item lg={3}>
                    <DashboardInfoCard title='Unique Visitors' value='1,493' subtitleValue='+13%' subtitleText=' since last week' />
                </Grid>
                <Grid item lg={3}>
                    <DashboardInfoCard title='Pageviews' value='492' subtitleValue='-2%' subtitleText=' since last week' />
                </Grid>
                <Grid item lg={3}>
                    <DashboardInfoCard title='Bounce Rate' value='45%' subtitleValue='-2%' subtitleText=' since last week' />
                </Grid>
                <Grid item lg={3}>
                    <DashboardInfoCard title='Visit Duration' value='2m 45s' subtitleValue='-2%' subtitleText=' since last week' />
                </Grid>
            </Grid>

            <Grid container>
                <Grid item lg={8}>
                    <Paper sx={{ p: 3, m: 2 }}>
                        <Typography variant="h6">Pageviews</Typography>
                        <PageviewsChart inputData={pageviews} />
                    </Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper className="blueShadow" sx={{ p: 3, m: 2, backgroundColor: 'rgb(42,98,254)', color: '#fff' }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <Typography variant="h6">Real Time</Typography>
                            <div class="small-white-pulse"></div>
                        </Stack>

                        <Typography variant="body1"><b>Active users in last 5 minutes</b></Typography>
                        <Typography variant="h3" sx={{ py: 2, }}>{realtime.length}</Typography>

                        <Typography variant="body1"><b>Live feed</b></Typography>
                        {realtime.map(realtimeItem => { return <Typography variant="body1">{realtimeItem.location_href}</Typography> })}
                        <PageviewsMiniChart />
                    </Paper>
                </Grid>
            </Grid>


            <Grid container>
                <Grid item lg={6}>
                    <Paper sx={{ p: 3, m: 2 }}>
                        <Typography variant="h6">Top Souces</Typography>
                        <TopSourcesChart inputData={topSources} timeBuckets={timeBuckets} />
                    </Paper>
                </Grid>
                <Grid item lg={6}>
                    <Paper sx={{ p: 3, m: 2 }}>
                        <Typography variant="h6">Top Pages</Typography>
                        <TopPages inputData={topPages} />
                    </Paper>
                </Grid>
                <Grid item lg={5}>
                    <Paper sx={{ p: 3, m: 2 }}>
                        <Typography variant="h6">Devices</Typography>
                        <Box sx={{ px: 10 }}>
                            <DevicesChart inputData={devices} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item lg={7}>
                    <Paper sx={{ p: 3, m: 2 }}>
                        <Typography variant="h6">Locations</Typography>
                        <LocationChart inputData={locations} />
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
