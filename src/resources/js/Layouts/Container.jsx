import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container as MuiContainer, createTheme } from '@mui/material';
import NavBar from '@/components/NavBar';
import { ThemeProvider } from '@emotion/react';


export default function Container({ children }) {

    const theme = createTheme({
        typography: {
            fontFamily: [
                'IBM Plex Sans'
            ].join(','),
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    colorPrimary: {
                        backgroundColor: "red"
                    }
                }
            }
        }
    });



    return (
        <>
            <CssBaseline />
            <NavBar />
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </>
    );
}
