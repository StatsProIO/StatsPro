import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import { Inertia } from '@inertiajs/inertia'
import { Menu, MenuItem } from '@mui/material';

const pages = [
    {
        label: 'Login',
        url: '/login',
        variant: "outlined",
        color: "primary",
        onClick: function () {
            Inertia.get('/login')
        }
    },
    {
        label: 'Register',
        url: '/register',
        variant: "contained",
        color: "primary",
        onClick: function () {
            Inertia.get('/registr')
        }
    }];

const NavBar = ({ toggleIsDrawerOpen, showDrawer, auth }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleAvartarMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAvatarMenuClose = () => {
        setAnchorEl(null);
    };

    const handleClickDashboard = () => {
        Inertia.get('/dashboard')
    }

    const handleClickLogout = () => {
        Inertia.post('/logout')
    }

    return (
        <AppBar position="fixed" sx={{ bgcolor: "#243044", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Avatar variant={"rounded"} src="/images/logo.png" style={{ width: 35, height: 20, }} sx={{ mx: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,

                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Marble Metrics
                    </Typography>

                    {showDrawer && <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={toggleIsDrawerOpen}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>}

                    <Box sx={{ flexGrow: 1, display: 'flex' }} justifyContent="right">
                        {(auth === undefined || auth.user === null) && pages.map((page) => (
                            <Button
                                key={page.label}
                                sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}
                                variant={page.variant}
                                color={page.color}
                                onClick={page.onClick}
                            >
                                {page.label}
                            </Button>
                        ))
                        }
                    </Box>

                    {!(auth === undefined || auth.user === null) && <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Your Dashboard">
                            <IconButton onClick={handleAvartarMenuClick} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleAvatarMenuClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClickDashboard}>Dashboard</MenuItem>
                            <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
