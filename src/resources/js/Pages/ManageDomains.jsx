import React, { useState, useRef, useEffect } from 'react';
import Authenticated from '@/Layouts/Authenticated';

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
import { Grid, Paper, Typography } from '@mui/material';
import { Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import { Inertia } from '@inertiajs/inertia';


export default function ManageDomains(props) {
    const drawerWidth = 240;

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

                    <Grid container>
                        <Grid item lg={10}>
                            <Typography variant="h4" sx={{ py: 1 }}>Manage Domains</Typography>
                        </Grid>
                        <Grid item lg={2}>
                            <Button variant="contained" onClick={() => { Inertia.visit('/add-domain'); }} fullWidth>+ Add Domain</Button>
                        </Grid>
                    </Grid>

                    {props.domains.length === 0 && (
                        <Grid container justifyContent='center'>
                            <Grid item lg={6}>
                                <Typography variant="h5" sx={{ py: 1 }} textAlign='center' color="text.secondary">No domains added yet!</Typography>
                            </Grid>
                        </Grid>
                    )}

                    <Grid container spacing={2}>
                        {props.domains.map((domain) => {
                            return (
                                <Grid item md={4}>
                                    <Box sx={{ p: 2 }} style={{ backgroundColor: '#fff' }}>
                                        <Grid container spacing={2}>
                                            <Grid item md={10}>
                                                <Typography key={domain.id}>{domain.domain_name}</Typography>
                                            </Grid>
                                            <Grid item md={2} >
                                                <Button variant="text" size="large" >
                                                    <SettingsIcon />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            )
                        })}
                    </Grid>

                </Box>
            </Box >


        </Authenticated >
    );
}
