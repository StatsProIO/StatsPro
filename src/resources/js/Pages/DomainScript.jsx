import { Inertia } from '@inertiajs/inertia';
import { Button, Grid, Typography, Box } from '@mui/material';
import ScriptAndInstructions from '@/components/ScriptAndInstructions';
import Authenticated from '@/Layouts/Authenticated';

export default function DomainScript(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >

            {/* <Head title="Dashboard" /> */}

            <Grid container>
                <Grid item lg={8}>
                    <Typography variant="h4" sx={{ py: 1 }}>Add Script</Typography>
                </Grid>
            </Grid>

            <Grid container justifyContent="center">
                <Grid item md={5}>
                    <Box style={{ backgroundColor: '#fff' }} sx={{ p: 4 }}>
                        <Typography sx={{ py: 2 }} variant="h5"><b>Add this script to your website ({props.domain.domain_name})</b></Typography>
                        <ScriptAndInstructions />
                        <Button variant="contained" onClick={() => { Inertia.visit('/dashboard?domain=' + props.domain.domain_name); }} fullWidth size='large'>Start Collecting Data</Button>
                    </Box>
                </Grid>
            </Grid>

        </Authenticated>
    );
}
