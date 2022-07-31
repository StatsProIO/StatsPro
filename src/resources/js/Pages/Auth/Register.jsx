import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <Guest>
            <Head title="Register" />

            <ValidationErrors errors={errors} />

            <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <Grid item md={5}>
                    <Paper sx={{ p: 2, my: 1, mx: 2 }} elevation={0}>
                        <Box style={{ backgroundColor: '#fff' }} sx={{ p: 4 }}>
                            <Typography sx={{ py: 2 }} variant="h5"><b>Register</b></Typography>


                            <form onSubmit={submit}>
                                <TextField
                                    label="Name"
                                    variant="standard"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    autoComplete="name"
                                    autoFocus
                                    fullWidth
                                    size="large"
                                    onChange={onHandleChange}
                                    required
                                />

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
                                    sx={{ mt: 4 }}
                                    required
                                />

                                <TextField
                                    label="Password"
                                    variant="standard"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="new-password"
                                    fullWidth
                                    size="large"
                                    onChange={onHandleChange}
                                    sx={{ mt: 4 }}
                                    required
                                />

                                <TextField
                                    label="Confirm Password"
                                    variant="standard"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    autoComplete="new-password"
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
                                    loadingPosition="start"
                                    variant="contained"
                                    type='submit'
                                    sx={{ my: 3 }}
                                >
                                    Register
                                </LoadingButton>



                                <Typography variant="subtitle2" pt={3} textAlign="right">
                                    <Link href={route('login')}>
                                        Already registered?
                                    </Link>
                                </Typography>

                            </form>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Guest>
    );
}
