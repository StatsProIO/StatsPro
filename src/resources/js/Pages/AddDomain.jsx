import { Grid, Typography, Box, Toolbar } from '@mui/material';

import Authenticated from '@/Layouts/Authenticated';
import AddDomainForm from '@/Components/AddDomainForm';

export default function ManageDomains(props) {

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            {/* <Head title="Dashboard" /> */}


            <Grid container>
                <Grid item lg={8}>
                    <Typography variant="h4" sx={{ py: 1 }}>Add Domain</Typography>
                </Grid>
            </Grid>
            <AddDomainForm />

        </Authenticated>
    );
}
