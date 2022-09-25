import * as React from 'react';

import {Grid, Link, Stack, Typography} from '@mui/material';

import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";

const Footer = () => {
    return (
        <Box className="gray-background" sx={{py: 6}}>
            <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={4} md={3}>
                    <Stack spacing={1} justifyContent="center">
                        <Typography color={'gray'} variant={"h6"} fontWeight={"bold"} align={"center"}>General</Typography>
                        <Link href="/" underline="hover" color="inherit" align={"center"}>Home</Link>
                        <Link href="/contact" underline="hover" color="inherit" align={"center"}>Contact</Link>
                    </Stack>

                </Grid>
                <Grid item xs={4} md={3}>
                    <Stack spacing={1}>
                        <Typography color={'gray'} variant={"h6"} fontWeight={"bold"} align={"center"}>Resources</Typography>
                        <Link href="/docs" underline="hover" color="inherit" align={"center"}>Docs</Link>

                        <Link href="/docs/about" underline="hover" color="inherit" align={"center"}>About</Link>
                        <Link href="/terms" underline="hover" color="inherit" align={"center"}>Terms</Link>
                        <Link href="/privacy-policy" underline="hover" color="inherit" align={"center"}>Privacy Policy</Link>
                    </Stack>
                </Grid>
                <Grid item xs={4} md={3}>
                    <Stack spacing={1}>
                        <Typography color={'gray'} variant={"h6"} fontWeight={"bold"} align={"center"}>Community</Typography>
                        <Link href="https://github.com/MarbleMetrics/MarbleMetrics" target={'_blank'} underline="hover" color="inherit" align={"center"}>Github</Link>
                        <Link href="https://twitter.com/MarbleMetrics" target={'_blank'} underline="hover" color="inherit" align={"center"}>Twitter</Link>
                    </Stack>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" alignItems="center" textAlign="center" sx={{pt: 6}}>
                <Grid align="center">
                    <Avatar variant={"rounded"} src="/images/logo.svg" style={{ width: 100, height: 'auto', }} />
                    <Typography variant="h6" noWrap component="a" href="/"
                        sx={{
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                         Marble Metrics
                    </Typography>
                </Grid>
            </Grid>

            <Typography variant="body1" textAlign="center" sx={{pb: 5}}>© 2022</Typography>


        </Box>
    );
};
export default Footer;
