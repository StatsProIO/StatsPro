import {Button, List, ListItem, ListItemButton, Paper, Toolbar, Typography} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DnsIcon from '@mui/icons-material/Dns';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PaymentsIcon from '@mui/icons-material/Payments';
import {Inertia} from '@inertiajs/inertia'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Chip from "@mui/material/Chip";
import AdsClickIcon from '@mui/icons-material/AdsClick';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SpeedIcon from '@mui/icons-material/Speed';


export default function DrawerContents() {
    var items = [
        {
            text: "Dashboard",
            url: '/dashboard',
            icon: <DashboardIcon sx={{ color: '#fff' }} />
        }, {
            text: 'Audience',
            url: '/audience',
            icon: <EmojiPeopleIcon sx={{ color: '#fff' }} />,
        }, {
            text: 'Behavior',
            url: '/behavior',
            icon: <AdsClickIcon sx={{ color: '#fff' }} />,
            comingSoon: true
        }, {
            text: 'Acquisition',
            url: '/acquisition',
            icon: <ExitToAppIcon sx={{ color: '#fff' }} />,
            comingSoon: true
        }, {
            text: 'Performance',
            url: '/performance',
            icon: <SpeedIcon sx={{ color: '#fff' }} />,
            comingSoon: true
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
                                <ListItemText primary={item.text} /> {item.comingSoon && <Chip label="Soon" color="warning" size="small" />}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Paper sx={{ p: 3, m: 2, backgroundColor: '#364967', color: '#fff' }}>
                    <Typography variant="h5"><b>⚡️ Need help?</b></Typography>

                    <Typography variant='body1' >We're always available help you out.</Typography>
                    <Box textAlign='center'>
                        <Button onClick={() => Inertia.get('/contact')} variant="contained" sx={{ my: 2, }}>Contact Us</Button>
                    </Box>

                </Paper>
            </Box>
        </>
    );
}
