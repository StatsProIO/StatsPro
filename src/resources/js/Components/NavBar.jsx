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
import {asset} from "@/helpers/asset";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PaymentIcon from '@mui/icons-material/Payment';
import LoginIcon from '@mui/icons-material/Login';

const links = [
    {
        label: 'Documentation',
        color: "primary",
        variant: "text",
        onClick: function () {
            location.href = 'https://docs.statspro.io/';
        },
        icon: <LibraryBooksIcon fontSize="small" />
    },
    {
        label: 'Blog',
        color: "primary",
        variant: "text",
        onClick: function () {
            Inertia.get('/blog')
        },
        icon: <NewspaperIcon fontSize="small" />
    },
    {
        label: 'Pricing',
        color: "primary",
        variant: "text",
        onClick: function () {
            Inertia.get('/#pricing')
        },
        icon: <PaymentIcon fontSize="small" />
    },
    {
        label: 'Login',
        color: "primary",
        variant: "outlined",
        onClick: function () {
            Inertia.get('/login')
        },
        icon: <LoginIcon fontSize="small" />
    },
];

const pages = [

    {
        label: 'Get Started',
        variant: "contained",
        color: "secondary",
        onClick: function () {
            Inertia.get('/register')
        }
    }];

const NavBar = ({ toggleIsDrawerOpen, showDrawer, auth }) => {
    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [linksMenuAnchorEl, setLinksMenuAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const linksMenuOpen = Boolean(linksMenuAnchorEl);
    const handleAvartarMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAvatarMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLinksMenuOpen = (event) => {
        setLinksMenuAnchorEl(event.currentTarget)
    };

    const handleLinksMenuClose = () => {
        setLinksMenuAnchorEl(null);
    };

    const handleClickDashboard = () => {
        Inertia.get('/dashboard')
    };

    const handleClickLogout = () => {
        Inertia.post('/logout')
    };

    return (
        <AppBar position="fixed" sx={{ bgcolor: "#243044", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Container sx={{px: 1}}>
                <Toolbar disableGutters>
                    <Avatar variant={"rounded"} src={asset("/images/logo.webp")} style={{ width: isSmallScreen ? 40 : 50, height: 'auto' }} sx={{ mr: 1}} />
                    <Typography
                        variant={isSmallScreen ?  "subtitle1":  'h6'}
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            fontSize: {xs: '1rem', sm: '1.25rem'},
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        StatsPro
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

                        {(auth === undefined || auth.user === null) && isMediumScreen &&
                        <Box sx={{ flexGrow: 0 }}>

                            <IconButton
                                onClick={handleLinksMenuOpen}
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2, my: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Menu
                                id="basic-menu"
                                anchorEl={linksMenuAnchorEl}
                                open={linksMenuOpen}
                                onClose={handleLinksMenuClose}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                            >
                                {
                                    links.map((link) => <MenuItem onClick={link.onClick} key={link.label}>

                                        <ListItemIcon>
                                            {link.icon}
                                        </ListItemIcon>
                                        <ListItemText>{link.label}</ListItemText>

                                    </MenuItem>)
                                }
                            </Menu>
                        </Box>}


                        {(auth === undefined || auth.user === null) && !isMediumScreen && links.map((link) => (
                            <Button
                                key={link.label}
                                sx={{ mx: {xs: 0, sm: .25, md: .5}, my: 2, px: {xs: 0, sm: .5, md: 1}, py: 1, color: 'white', display: 'block', fontWeight: 'bold', fontSize: {xs: '0.7rem', sm: '0.9rem'} }}
                                onClick={link.onClick}
                                size={'small'}
                                variant={link.variant}
                            >
                                {link.label}
                            </Button>
                        ))
                        }
                        {(auth === undefined || auth.user === null) && pages.map((page) => (
                            <Button
                                key={page.label}
                                sx={{ mx: .5, my: 2, px: {xs: 1.5}, py: 1, color: 'white', display: 'block', fontWeight: 'bold', fontSize: {xs: '0.7rem', sm: '0.9rem'} }}
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
