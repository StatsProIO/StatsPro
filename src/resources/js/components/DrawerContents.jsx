import { Divider, List, ListItem, ListItemButton, Paper, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Button from './Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function DrawerContents() {
    return (
        <>
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
        </>
    );
}
