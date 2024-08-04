import React from 'react';
import {Box, Grid, Paper, TextField, Typography} from '@mui/material';
import Guest from '@/Layouts/Guest';
import ValidationErrors from '@/Components/ValidationErrors';
import {Head, useForm} from '@inertiajs/inertia-react';
import {LoadingButton} from "@mui/lab";
import SuccessBanner from "@/Components/SuccessBanner";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors, wasSuccessful } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (

        <Guest>
            <Head title="Login" />

            <ValidationErrors errors={errors} />

            <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <Grid item md={5}>
                    <Paper sx={{ p: 2, my: 1, mx: 2 }} elevation={0}>
                        <Box style={{ backgroundColor: '#fff' }} sx={{ p: 4 }}>

                            {wasSuccessful && <SuccessBanner message="Email sent! Check your email inbox for next steps."/>}

                            <Typography sx={{ py: 2 }} variant="h5"><b>Forgot Password</b></Typography>

                            <Typography sx={{ py: 2 }} variant="body1">Forgot your password? No problem. Just let us know your email address and we will email you a password
                                reset link that will allow you to choose a new one.</Typography>

                            <form onSubmit={submit}>

                                <TextField
                                    label="Email"
                                    variant="standard"
                                    type="text"
                                    name="email"
                                    value={data.email}
                                    autoComplete="email"
                                    fullWidth
                                    size="large"
                                    onChange={onHandleChange}
                                    sx={{ mt: 4 }}
                                    required
                                />

                                <LoadingButton
                                    loading={processing}
                                    fullWidth
                                    size='large'
                                    variant="contained"
                                    type='submit'
                                    sx={{ my: 3 }}
                                >
                                    Email Password Reset Link
                                </LoadingButton>

                            </form>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Guest>
    );
}
