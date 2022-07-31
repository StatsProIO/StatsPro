import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import Container from './Container';
import { Box, Drawer, Toolbar } from '@mui/material';
import DrawerContents from '@/components/DrawerContents';

export default function Authenticated({ auth, header, children }) {
    const drawerWidth = 240;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Container>
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                        {/* TODO */}
                        {/* {auth.user.name} */}
                        {/* {auth.user.email} */}

                        {/* <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                                    Log Out
                                                </ResponsiveNavLink> */}

                    </span>
                </Dropdown.Trigger>


            </Dropdown>

            <Box sx={{ display: 'flex' }} >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <DrawerContents />
                </Drawer>

                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#243044', color: '#fff' },
                    }}
                    open
                >
                    <DrawerContents />
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <main>
                        {children}
                    </main>
                </Box>
            </Box>

        </Container>
    );
}
