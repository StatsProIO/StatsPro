import React from 'react';
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
import { Grid, Menu, MenuItem, Paper, Typography } from '@mui/material';
import Button from '@/components/Button';

export default function Dashboard(props) {
    const drawerWidth = 240;


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >

            {/* <Head title="Dashboard" /> */}

            <Box sx={{ display: 'flex' }}>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            {['Dashboard', 'Manage Sites'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
                                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Paper sx={{ p: 3, m: 2 }}>
                            <Typography variant="h5">Need help?</Typography>

                            <Typography variant='body1' >We're always available help you out.</Typography>
                            <Button>Contact Us</Button>
                        </Paper>
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />


                    <Grid container>
                        <Grid item lg={6}>
                            <Typography variant="h3">Dashboard</Typography>
                        </Grid>
                        <Grid item lg={6}></Grid>
                    </Grid>
                    <Typography variant="h6">Welcome back, dude!</Typography>

                    <hr />

                    <Button
                        id="site-selector-menu-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Site 1
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Site 1</MenuItem>
                        <MenuItem onClick={handleClose}>Site 2</MenuItem>
                        <MenuItem onClick={handleClose}>Site 3</MenuItem>
                    </Menu>

                    <Button
                        id="date-selector-menu-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Today
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Last 7 days</MenuItem>
                        <MenuItem onClick={handleClose}>Last 30 days</MenuItem>
                        <MenuItem onClick={handleClose}>Last years</MenuItem>
                    </Menu>

                    <Grid container>
                        <Grid container lg={6} >
                            <Grid item lg={6}>
                                <Paper sx={{ p: 3, m: 2 }}>
                                    <Typography variant="h6">Unique Visitors</Typography>
                                    <Typography variant="h4" sx={{ py: 2 }}>1,249</Typography>
                                    <Typography variant="body1">+13 since last week</Typography>
                                </Paper>
                            </Grid>
                            <Grid item lg={6}>
                                <Paper sx={{ p: 3, m: 2 }}>
                                    <Typography variant="h6">Pageviews</Typography>
                                    <Typography variant="h4" sx={{ py: 2 }}>492</Typography>
                                    <Typography variant="body1">-2% since last week</Typography>
                                </Paper>
                            </Grid>
                            <Grid item lg={6}>
                                <Paper sx={{ p: 3, m: 2 }}>
                                    <Typography variant="h6">Bounce Rate</Typography>
                                    <Typography variant="h4" sx={{ py: 2 }}>45%</Typography>
                                    <Typography variant="body1">-2% since last week</Typography>
                                </Paper>
                            </Grid>
                            <Grid item lg={6}>
                                <Paper sx={{ p: 3, m: 2 }}>
                                    <Typography variant="h6">Visit Duration</Typography>
                                    <Typography variant="h4" sx={{ py: 2 }}>2m 45s</Typography>
                                    <Typography variant="body1">-2% since last week</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid item lg={6}>
                            <Paper sx={{ p: 3, m: 2 }}>
                                Pageviews
                            </Paper>
                        </Grid>
                    </Grid>


                    <Grid container>
                        <Grid item lg={6}>
                            <Paper sx={{ p: 3, m: 2 }}>
                                <Typography variant="h6">Souces</Typography>
                            </Paper>
                        </Grid>
                        <Grid item lg={6}>
                            <Paper sx={{ p: 3, m: 2 }}>
                                <Typography variant="h6">Top Pages</Typography>
                            </Paper>
                        </Grid>
                        <Grid item lg={6}>
                            <Paper sx={{ p: 3, m: 2 }}>
                                <Typography variant="h6">Devices</Typography>
                            </Paper>
                        </Grid>
                        <Grid item lg={6}>
                            <Paper sx={{ p: 3, m: 2 }}>
                                <Typography variant="h6">Locations</Typography>
                            </Paper>
                        </Grid>
                    </Grid>


                </Box>
            </Box>


        </Authenticated >
    );
}
