import React, {useEffect} from 'react';
import {Alert, AlertTitle, Grid, TextField} from '@mui/material';
import General from "@/Layouts/General";
import {useForm, usePage} from "@inertiajs/inertia-react";
import ValidationErrors from "@/Components/ValidationErrors";
import {LoadingButton} from "@mui/lab";
import SendIcon from '@mui/icons-material/Send';


export default function Contact() {

    const { flash } = usePage().props

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        message: ''
    });

    useEffect(() => {
        return () => {
            reset('message', 'email');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('contact'), {onSuccess: () => {
                reset('message', 'email');
        }});
    };

    return (
        <>
            <General title={'Contact'}>
                <ValidationErrors errors={errors} />
                <Grid container>
                    <Grid item lg={12} md={12} xs={12}>
                        {flash.message && (
                            <Alert severity="success">
                                <AlertTitle>Success!</AlertTitle>
                                {flash.message}
                            </Alert>
                        )}
                    </Grid>
                </Grid>

                <form onSubmit={submit}>
                    <TextField
                        fullWidth
                        required

                        label="Email"
                        variant="outlined"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={onHandleChange}
                        sx={{mt: 2}}
                    />

                    <TextField
                        multiline
                        required
                        minRows={8}
                        fullWidth
                        label="Message"
                        variant="outlined"
                        type="text"
                        name="message"
                        value={data.message}
                        onChange={onHandleChange}
                        sx={{mt: 2}}
                    />
                    <LoadingButton loading={processing} fullWidth variant="contained" type="submit" size="large" sx={{ my: 2 }} startIcon={<SendIcon />}>Send Message</LoadingButton>
                </form>
            </General>

        </>
    );
}
