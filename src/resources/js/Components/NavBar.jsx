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
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



import {Inertia} from '@inertiajs/inertia'
import {Menu, MenuItem} from '@mui/material';

const pages = [
    {
        label: 'Login',
        url: '/login',
        variant: "",
        color: "primary",
        onClick: function () {
            Inertia.get('/login')
        }
    },
    {
        label: 'Register',
        url: '/register',
        variant: "contained",
        color: "secondary",
        onClick: function () {
            Inertia.get('/register')
        }
    }];

const NavBar = ({ toggleIsDrawerOpen, showDrawer, auth }) => {
    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
            <Container sx={{px: 1}}>
                <Toolbar disableGutters>
                    <Avatar variant={"rounded"} src="/images/logo.svg" style={{ width: isSmallScreen ? 40 : 50, height: 'auto' }} sx={{ mr: 1}} />
                    <Typography
                        variant={isSmallScreen ?  "subtitle1":  'h6'}
                        noWrap
                        component="a"
                        href="/"
                        sx={{
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
                                sx={{ my: 2, p: 1, display: 'block', fontSize: {xs: '0.6rem', sm: '0.8125rem'} }}
                                onClick={page.onClick}
                                size={'small'}

                                variant={page.variant}
                            >
                                {page.label}
                            </Button>
                        ))
                        }

                    </Box>

                    {!(auth === undefined || auth.user === null) && <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Your Dashboard">
                            <IconButton onClick={handleAvartarMenuClick} sx={{ p: 0 }}>
                                <Avatar alt={auth.email} />
                                <Typography color={"white"} sx={{mx: 1, display: {xs: 'none', sm: 'block'}}}>{auth.user.email}</Typography>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleAvatarMenuClose}
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
