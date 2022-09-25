import React, {useEffect} from 'react';

import Checkbox from '@mui/material/Checkbox';
import Guest from '@/Layouts/Guest';
import ValidationErrors from '@/Components/ValidationErrors';
import {Head, Link, useForm} from '@inertiajs/inertia-react';
import {Box, FormControlLabel, Grid, Paper, TextField, Typography} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginWithGoogle from "@/Components/LoginWithGoogle";


export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <Guest>
            <Head title="Login" />

            {status && <Alert severity="success">{status}</Alert>}

            <ValidationErrors errors={errors} />

            <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <Grid item md={5}>
                    <Paper sx={{ p: 2, my: 1, mx: 2 }} elevation={0}>
                        <Box style={{ backgroundColor: '#fff' }} sx={{ p: 4 }}>
                            <Typography sx={{ py: 2 }} variant="h5"><b>Login</b></Typography>

                            <LoginWithGoogle/>

                            <form onSubmit={submit}>

                                <TextField
                                    label="Email"
                                    variant="standard"
                                    type="text"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    fullWidth
                                    size="large"
                                    onChange={onHandleChange}
                                />

                                <TextField
                                    label="Password"
                                    variant="standard"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    fullWidth
                                    size="large"
                                    onChange={onHandleChange}
                                    sx={{ mt: 4 }}
                                />


                                <FormControlLabel sx={{ mt: 2 }} control={<Checkbox value={data.remember} onChange={onHandleChange} />} label="Remember" />


                                <LoadingButton
                                    loading={processing}
                                    fullWidth
                                    size='large'
                                    variant="contained"
                                    type='submit'
                                    sx={{ my: 3 }}
                                >
                                    Log in
                                </LoadingButton>

                            </form>

                            {canResetPassword && (
                                <Typography variant="subtitle2" pt={3} textAlign="right">
                                    <Link href={route('password.request')}>
                                        Forgot your password?
                                    </Link>
                                </Typography>
                            )}

                        </Box>
                    </Paper>
                </Grid>
            </Grid>

        </Guest >
    );
}
