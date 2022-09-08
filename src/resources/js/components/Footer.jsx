import * as React from 'react';

import { Grid, Paper, Toolbar, Typography, Link, Stack } from '@mui/material';

import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";

const Footer = () => {
    return (
        <Box className="gray-background" sx={{py: 6}}>
            <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={4} md={3}>
                    <Stack spacing={3} justifyContent="center">
                        <Link href="/" underline="hover" color="inherit" align={"center"}>Home</Link>
                        <Link href="/contact" underline="hover" color="inherit" align={"center"}>Contact</Link>
                    </Stack>

                </Grid>
                <Grid item xs={4} md={3}>
                    <Stack spacing={3}>
                        <Link href="/docs" underline="hover" color="inherit" align={"center"}>Docs</Link>
                        <Link href="/blog" underline="hover" color="inherit" align={"center"}>Blog</Link>
                    </Stack>
                </Grid>
                <Grid item xs={4} md={3}>
                    <Stack spacing={3}>
                        <Link href="/about" underline="hover" color="inherit" align={"center"}>About</Link>
                        <Link href="/terms-and-privacy" underline="hover" color="inherit" align={"center"}>Terms & Privacy</Link>
                    </Stack>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" alignItems="center" textAlign="center" sx={{pt: 6}}>
                <Grid align="center">
                    <Avatar variant={"rounded"} src="/images/logo.png" style={{ width: 35, height: 20, }} />
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
