import { Button, Grid, Typography, Box } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';
import Authenticated from '@/Layouts/Authenticated';
import SettingsIcon from '@mui/icons-material/Settings';
import * as React from "react";
import {Head} from "@inertiajs/inertia-react";

export default function ManageDomains(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >

            <Head title="Manage Domains" />

            <Grid container>
                <Grid item lg={10}>
                    <Typography variant="h4"><b>Manage Domains</b></Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{mt: 1}}>
                {props.domains.map((domain) => {
                    return (
                        <Grid item md={4} key={domain.id}>
                            <Box sx={{ p: 2 }} style={{ backgroundColor: '#fff' }}>
                                <Grid container spacing={2}>
                                    <Grid item md={10}>
                                        <Typography variant={'h5'} key={domain.id}>{domain.domain_name}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>

            <Grid container>
                <Grid item lg={12} textAlign={'center'}>
                    <Button size={'large'} variant="contained" onClick={() => { Inertia.visit('/add-domain'); }} style={{fontSize: '1.3em'}} sx={{px: 5, py: 2, my: 4}} fontWeight="bold"><b>+ Add Domain</b></Button>
                </Grid>
            </Grid>

        </Authenticated>
    );
}
