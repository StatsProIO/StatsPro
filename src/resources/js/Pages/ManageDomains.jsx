import { Button, Grid, Typography, Box } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';
import Authenticated from '@/Layouts/Authenticated';
import SettingsIcon from '@mui/icons-material/Settings';
import * as React from "react";

export default function ManageDomains(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >

            {/* <Head title="Dashboard" /> */}

            <Grid container>
                <Grid item lg={10}>
                    <Typography variant="h4"><b>Manage Domains</b></Typography>
                </Grid>
                <Grid item lg={2}>
                    <Button variant="contained" onClick={() => { Inertia.visit('/add-domain'); }} fullWidth>+ Add Domain</Button>
                </Grid>
            </Grid>

            {props.domains.length === 0 && (
                <Grid container justifyContent='center'>
                    <Grid item lg={6}>
                        <Typography variant="h5" sx={{ py: 1 }} textAlign='center' color="text.secondary">No domains added yet!</Typography>
                    </Grid>
                </Grid>
            )}

            <Grid container spacing={2}>
                {props.domains.map((domain) => {
                    return (
                        <Grid item md={4}>
                            <Box sx={{ p: 2 }} style={{ backgroundColor: '#fff' }}>
                                <Grid container spacing={2}>
                                    <Grid item md={10}>
                                        <Typography key={domain.id}>{domain.domain_name}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>

        </Authenticated>
    );
}
