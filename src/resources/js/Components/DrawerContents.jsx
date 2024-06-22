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
import ViewListIcon from '@mui/icons-material/ViewList';


export default function DrawerContents({domain}) {
    var items = [
        {
            text: "Dashboard",
            url: '/dashboard',
            appendDomain: true,
            icon: <DashboardIcon />
        }, {
            text: 'Audience',
            url: '/audience',
            appendDomain: true,
            icon: <EmojiPeopleIcon/>,
        }, {
            text: 'Behavior',
            url: '/behavior',
            appendDomain: true,
            icon: <AdsClickIcon/>,
        }, {
            text: 'Acquisition',
            url: '/acquisition',
            appendDomain: true,
            icon: <ExitToAppIcon/>,
        }, {
            text: 'Sessions',
            url: '/sessions',
            appendDomain: true,
            icon: <ViewListIcon/>,
        }, {
            text: 'Performance',
            url: '/performance',
            appendDomain: true,
            icon: <SpeedIcon/>
        }, {
            text: "Manage Domains",
            url: '/manage-domains',
            icon: <DnsIcon />
        }, {
            text: "Profile",
            url: '/profile',
            icon: <AccountCircleIcon />
        }, {
            text: "Subscriptions",
            url: '/subscriptions',
            icon: <PaymentsIcon />
        }];

    function handleClick(url, appendDomain) {
        return () => {
            Inertia.visit(url + '/' + ((appendDomain && domain) ? domain : ''));
        }
    }

    return (
        <>
            <Toolbar />
            <Box sx={{ overflow: 'auto'}} >
                <Box sx={{backgroundColor: '#fff', my: 1, mx: 1, borderRadius: '10px'}}>
                    <List disablePadding sx={{
                        // selected and (selected + hover) states
                        '&& .Mui-selected, && .Mui-selected:hover': {
                            bgcolor: '#ccc',
                            background: '#ccc',
                            color: '#2a62fe'
                        },

                        // hover states
                        '& .MuiListItemButton-root:hover': {
                            bgcolor: '#ddd',
                        },
                    }}>
                        {items.map((item) => (
                            <ListItem key={item.text} disablePadding onClick={handleClick(item.url, item.appendDomain)}>
                                <ListItemButton selected={window.location.pathname.startsWith(item.url)} sx={{borderRadius: '10px', mx: 1, my: .5, py: .5}}>
                                    <ListItemIcon sx={{color: window.location.pathname.startsWith(item.url) ? '#2a62fe': ''}}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} primaryTypographyProps={{variant: 'body1' }}  /> {item.comingSoon && <Chip label="Soon" color="warning" size="small" />}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Paper sx={{ p: 2, mx: .5, my: 3, backgroundColor: '#fff', color: '#595960', borderWidth: '1px', borderStyle: 'solid', borderColor: '#146ff2' }}>
                    <Typography variant="h6">⚡️ Need help?</Typography>

                    <Typography variant='body1' align={'center'} >We're available help!</Typography>
                    <Box textAlign='center'>
                        <Button onClick={() => Inertia.get('/contact')} variant="contained" sx={{ my: 2, }}>Contact Us</Button>
                    </Box>

                </Paper>
            </Box>
        </>
    );
}
