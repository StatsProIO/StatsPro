import React, {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {Box, createTheme, Toolbar} from '@mui/material';
import NavBar from '@/Components/NavBar';
import {ThemeProvider} from '@emotion/react';
import Drawers from '@/Components/Drawers';


export default function Container({ children, showDrawer, showNavLinks, auth, domain }) {

    const theme = createTheme({

        palette: {
            type: 'light',
            primary: {
                main: 'rgb(42,98,254)',
            },
            secondary: {
                main: '#7d6cfb',
            },
            success: {
                main: '#27ae60'
            }
        },
        typography: {
            fontFamily: ['Inter', 'Helvetica'].join(','),
            fontSize: 16,
            button: {
                fontFamily: ['Inter', 'Helvetica'].join(','),
            }
        },
        shape: {
            borderRadius: 8,
        },
        overrides: {
            MuiAppBar: {
                colorInherit: {
                    color: '#fff',
                },
            },
        },
        props: {
            MuiAppBar: {
                color: 'inherit',
            },
            MuiButtonBase: {
                disableRipple: true,
            },
        },
        shadows: ["rgb(50 50 93 / 2%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px", ...Array(25).fill('none')],

    });

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    function toggleIsDrawerOpen() {
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <NavBar toggleIsDrawerOpen={toggleIsDrawerOpen} showDrawer={showDrawer} showNavLinks={showNavLinks} auth={auth} />
                <Toolbar />
                {
                    showDrawer ?
                        <Box sx={{ display: 'flex' }}> <Drawers isDrawerOpen={isDrawerOpen} domain={domain} /> {children} </Box> :
                        children
                }
            </ThemeProvider>

        </>
    );
}
