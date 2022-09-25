import {Box, Grid, Typography} from '@mui/material';

import Authenticated from '@/Layouts/Authenticated';
import AddDomainForm from '@/Components/AddDomainForm';
import React from "react";
import {Head} from "@inertiajs/inertia-react";
import ValidationErrors from "@/Components/ValidationErrors";

export default function ManageDomains(props) {

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
             <Head title="Add Domains" />

            <ValidationErrors errors={props?.flash?.message ? [props?.flash?.message] : []} />
            <Grid container justifyContent={'center'}>
                <Grid item xl={5} lg={5} md={5} sm={7} xs={12}>

                    <Grid container justifyContent="center">
                        <Grid item xs={12} justifyContent={'center'}>
                            <Box style={{ backgroundColor: '#fff' }} sx={{ p: 4 }} >

                                <Typography variant="h4"><b>Add Domain</b></Typography>
                                <AddDomainForm />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Authenticated>
    );
}
