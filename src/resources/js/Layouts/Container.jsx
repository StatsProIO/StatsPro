import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container as MuiContainer, createTheme, Toolbar } from '@mui/material';
import NavBar from '@/components/NavBar';
import { ThemeProvider } from '@emotion/react';


export default function Container({ children }) {

    const theme = createTheme({

        palette: {
            type: 'light',
            primary: {
                main: 'rgb(42,98,254)',
            },
            secondary: {
                main: '#7d6cfb',
            },
        },
        typography: {
            fontFamily: 'Inter, sans- serif',
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
        shadows: ["rgb(50 50 93 / 2%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px"]
    });




    return (
        <>
            <CssBaseline />
            <NavBar />
            <Toolbar />
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </>
    );
}
