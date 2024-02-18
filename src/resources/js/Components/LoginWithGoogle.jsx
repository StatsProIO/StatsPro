import React from 'react';
import {Link} from "@inertiajs/inertia-react";
import {Box, Paper, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";

export default function LoginWithGoogle() {
    return (
        <>
            <Link underline="none" href="/auth/google/redirect" style={{textDecoration: "none"}} sx={{py: 2}}>
                <Paper style={{backgroundColor: '#4285f4', color: '#fff'}} sx={{p: 1}} elevation={0}>
                    <Stack direction="row" spacing={1} alignItems="center"
                           justify="center">
                        <Avatar
                            sx={{ bgcolor: 'white', p: 1 }}
                            src="/images/google_logo.svg"
                        />
                        <Typography variant="body1">Login With Google</Typography>
                    </Stack>
                </Paper>
            </Link>

            <Box sx={{py: 3}} textAlign={"center"}>
                <Typography variant="body1" color={"text.secondary"}>or</Typography>
            </Box>
        </>
    );
}
