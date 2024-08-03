import React, {useEffect, useRef, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {Box, createTheme, Toolbar} from '@mui/material';
import NavBar from '@/Components/NavBar';
import {ThemeProvider} from '@emotion/react';
import Drawers from '@/Components/Drawers';
import * as rrweb from "rrweb";
import {Head} from "@inertiajs/inertia-react";
import { gzipSync, strToU8 } from 'fflate'


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

    const events = useRef([]);

    // this function will send events to the backend and reset the events array
    function save() {
        if(events.current.length === 0) {
            return;
        }
        const body = gzipSync(strToU8(JSON.stringify( events.current)), { mtime: 0 });
        events.current = [];
        fetch('/api/replay/statspro.io', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        });
    }

    useEffect(() => {
        if (!window.location.pathname.includes('replay')) {
            rrweb.record({
                emit(event) {
                    //console.log("pushing an event");
                    events.current.push(event)
                },
            })
        };

        // save events every 3 seconds
        const intervalId = setInterval(save, 3 * 1000);
        return () => clearInterval(intervalId);

    }, []);

    return (
        <>
            <CssBaseline />
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css"/>
            </Head>

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
