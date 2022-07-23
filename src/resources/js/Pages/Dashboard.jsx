import React, { useState, useRef, useEffect } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { FormControl, Grid, InputLabel, Menu, MenuItem, Paper, Select, Typography } from '@mui/material';
import { Button } from '@mui/material';

import { ArcElement } from 'chart.js';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
} from 'chart.js';

import { BarElement } from 'chart.js';

import { TopSourcesChart } from '@/components/TopSourcesChart';
import { PageviewsMiniChart } from '@/components/PageviewsMiniChart';
import { DashboardInfoCard } from '@/components/DashboardInfoCard';
import { TopPages } from '@/components/TopPages';
import { PageviewsChart } from '@/components/PageviewsChart';
import { DevicesChart } from '@/components/DevicesChart';
import { LocationChart } from '@/components/LocationChart';
import useQueryString from '@/customHooks/useQueryString';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    BarElement,
    ArcElement
);


export default function Dashboard(props) {
    const drawerWidth = 240;


    const [range, setRange] = useQueryString("range", 'today');
    const [domain, setDomain] = useQueryString("domain");


    useEffect(() => {
        //make an API request for range/domain

        axios.get(`/api/events?range=${range}&domain=${domain}`)
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [range, domain])


    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >

            {/* <Head title="Dashboard" /> */}

            <Box sx={{ display: 'flex', backgroundColor: '#f7f9fc' }} >
                <Drawer
                    variant="permanent"
                    sx={{

                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#243044', color: '#fff', },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto', }}>
                        <List>
                            {['Dashboard', 'Manage Sites'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon sx={{ color: '#fff' }} /> : <MailIcon sx={{ color: '#fff' }} />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['Profile', 'Settings'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon sx={{ color: '#fff' }} /> : <MailIcon sx={{ color: '#fff' }} />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Paper sx={{ p: 3, m: 2, backgroundColor: '#364967', color: '#fff' }}>
                            <Typography variant="h5">Need help?</Typography>

                            <Typography variant='body1' >We're always available help you out.</Typography>
                            <Box textAlign='center'>
                                <Button variant="contained" sx={{ my: 2, }}>Contact Us</Button>
                            </Box>

                        </Paper>
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />


                    <Grid container>
                        <Grid item lg={8}>
                            <Typography variant="h4"><b>Dashboard</b></Typography>
                            <Typography variant="h6">Welcome back!</Typography>
                        </Grid>
                        <Grid item lg={2} sx={{ px: 2 }}>

                            <FormControl fullWidth variant="filled">
                                <InputLabel id="demo-simple-select-label">Domain</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={10}
                                    label="Domain"
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
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
                                    <MenuItem value='today'>Today</MenuItem>
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
                                Pageviews
                                <PageviewsChart />
                            </Paper>
                        </Grid>
                        <Grid item lg={4}>
                            <Paper sx={{ p: 3, m: 2, backgroundColor: '#1b73e8', color: '#fff' }}>
                                <Typography variant="h6">Real Time</Typography>
                                <Typography variant="body1">Active users in last 5 minutes</Typography>
                                <Typography variant="h3" sx={{ py: 2, }}>12</Typography>
                                <PageviewsMiniChart />
                            </Paper>
                        </Grid>
                    </Grid>


                    <Grid container>
                        <Grid item lg={6}>
                            <Paper sx={{ p: 3, m: 2 }}>
                                <Typography variant="h6">Top Souces</Typography>
                                <TopSourcesChart />
                            </Paper>
                        </Grid>
                        <Grid item lg={6}>
                            <Paper sx={{ p: 3, m: 2 }}>
                                <Typography variant="h6">Top Pages</Typography>
                                <TopPages />
                            </Paper>
                        </Grid>
                        <Grid item lg={5}>
                            <Paper sx={{ p: 3, m: 2 }}>
                                <Typography variant="h6">Devices</Typography>
                                <Box sx={{ px: 10 }}>
                                    <DevicesChart />
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item lg={7}>
                            <Paper sx={{ p: 3, m: 2 }}>
                                <Typography variant="h6">Locations</Typography>
                                <LocationChart />
                            </Paper>
                        </Grid>
                    </Grid>


                </Box>
            </Box>


        </Authenticated >
    );
}
