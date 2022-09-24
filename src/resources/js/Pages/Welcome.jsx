import {Box, Grid, Stack, Typography} from '@mui/material';

import Authenticated from '@/Layouts/Authenticated';
import AddDomainForm from '@/Components/AddDomainForm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import React from "react";
import {Head} from "@inertiajs/inertia-react";

export default function Welcome(props) {

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            showDrawer={false}
        >
            <Head title="Welcome" />

            <Grid container justifyContent={'center'}>
                <Grid item xl={5} lg={5} md={5} sm={7} xs={12}> {/*Left side of the form*/}

                    <Grid container justifyContent="center">
                        <Grid item xs={12} justifyContent={'center'}>
                            <Box style={{ backgroundColor: '#fff' }} sx={{ p: 4 }} >
                                <Typography variant="h3"  textAlign='center'><b>Welcome!</b></Typography>
                                <Typography variant="h6" sx={{pb: 2, color: '#b7b7b7' }} textAlign='center'>One last question!</Typography>

                                <Typography variant="h5" ><b>Your Domain</b></Typography>
                                <AddDomainForm />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xl={2} lg={3} md={4} sm={4} xs={12} sx={{backgroundColor: '#ececec', p: 4, justifyContent: 'center'}}> {/*Right side of the form*/}
                    <Stack direction="row" alignItems="center" gap={1}>
                        <CheckCircleIcon />
                        <Typography variant="body1" sx={{ py: 2, fontWeight: 'bold' }} textAlign='center'>Register</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <RadioButtonCheckedIcon color={ 'primary'} />
                        <Typography variant="body1" sx={{ py: 2, color: 'primary.main', fontWeight: 'bold' }} textAlign='center'>Add Domain</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <RadioButtonUncheckedIcon />
                        <Typography variant="body1" sx={{ py: 2, fontWeight: 'bold' }} textAlign='center'>Add Script</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <RadioButtonUncheckedIcon />
                        <Typography variant="body1" sx={{ py: 2, fontWeight: 'bold' }} textAlign='center'>Verify Results</Typography>
                    </Stack>
                </Grid>
            </Grid>

        </Authenticated>
    );
}
