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

import { Button } from '@mui/material';

import { FormControl, Grid, InputLabel, Menu, MenuItem, Paper, Select, Typography } from '@mui/material';
import Charts from '@/components/Charts';
import FirstEventWait from '@/components/FirstEventWait';
import useQueryString from '@/customHooks/useQueryString';


export default function Dashboard(props) {
    const drawerWidth = 240;

    const [eventStatus, setEventStatus] = useState(false);
    const [domain, setDomain] = useQueryString("domain", '');

    useEffect(() => {

        //if the domain is not set in the query params, find the first domain and set the query params
        if (domain === '') {
            console.log("Domain is empty, setting to " + props.firstDomain);
            setDomain(props.firstDomain)
        } else {
            axios.get(`/api/event-status/${domain}`)
                .then(function (response) {
                    setEventStatus(response.data);
                })
                .catch(function (error) {
                    // TODO: handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }
    }, [domain]);

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
                            {['Profile', 'Settings', 'Help'].map((text, index) => (
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
                            <Typography variant="h5">⚡️ Need help?</Typography>

                            <Typography variant='body1' >We're always available help you out.</Typography>
                            <Box textAlign='center'>
                                <Button variant="contained" sx={{ my: 2, }}>Contact Us</Button>
                            </Box>

                        </Paper>
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />


                    {eventStatus === 'NO_DATA' && <FirstEventWait />}
                    {eventStatus === 'SUCCESS' && <Charts domain={domain} setDomain={setDomain} />}

                    {/* TODO: the case if there are no domains */}


                </Box>
            </Box>


        </Authenticated >
    );
}
