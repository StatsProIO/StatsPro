import { Button, List, ListItem, ListItemButton, Paper, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DnsIcon from '@mui/icons-material/Dns';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Inertia } from '@inertiajs/inertia'


export default function DrawerContents() {
    var items = [
        {
            text: "Dashboard",
            url: '/dashboard',
            icon: <DashboardIcon sx={{ color: '#fff' }} />
        }, {
            text: "Manage Domains",
            url: '/manage-domains',
            icon: <DnsIcon sx={{ color: '#fff' }} />
        }, {
            text: "Profile",
            url: '/profile',
            icon: <AccountCircleIcon sx={{ color: '#fff' }} />
        }, {
            text: "Subscriptions",
            url: '/subscriptions',
            icon: <PaymentsIcon sx={{ color: '#fff' }} />
        }, {
            text: "Settings",
            url: '/settings',
            icon: <SettingsOutlinedIcon sx={{ color: '#fff' }} />
        }, {
            text: "Help",
            url: '/help',
            icon: <HelpOutlinedIcon sx={{ color: '#fff' }} />
        }];

    function handleClick(url) {
        return () => {
            Inertia.visit(url);
        }
    }

    return (
        <>
            <Toolbar />
            <Box sx={{ overflow: 'auto', }}>
                <List disablePadding sx={{
                    // selected and (selected + hover) states
                    '&& .Mui-selected, && .Mui-selected:hover': {
                        bgcolor: 'rgb(42,98,254)',
                        background: 'linear-gradient(270deg, rgba(0,156,255,1) 0%, rgba(13,95,254,1) 100%);'
                    },
                    // hover states
                    '& .MuiListItemButton-root:hover': {
                        bgcolor: '#dedede',
                        background: 'linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(235,235,235,1) 76%, rgba(209,209,209,1) 100%)',
                        '&, & .MuiListItemIcon-root': {
                            color: 'text.secondary',
                        },
                    },
                }}>
                    {items.map((item) => (
                        <ListItem key={item.text} disablePadding onClick={handleClick(item.url)}>
                            <ListItemButton selected={window.location.pathname === item.url}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Paper sx={{ p: 3, m: 2, backgroundColor: '#364967', color: '#fff' }}>
                    <Typography variant="h5"><b>⚡️ Need help?</b></Typography>

                    <Typography variant='body1' >We're always available help you out.</Typography>
                    <Box textAlign='center'>
                        <Button variant="contained" sx={{ my: 2, }}>Contact Us</Button>
                    </Box>

                </Paper>
            </Box>
        </>
    );
}
