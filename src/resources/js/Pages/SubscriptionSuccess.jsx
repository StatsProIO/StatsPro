import Authenticated from '@/Layouts/Authenticated';
import { usePage } from '@inertiajs/inertia-react';
import { Alert, AlertTitle, Box, Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Inertia } from '@inertiajs/inertia'



export default function SubscriptionSuccess(props) {

    const { flash } = usePage().props

    var interval;
    const [isRefreshing, setIsRefreshing] = useState(true);

    useEffect(() => {
        interval = setInterval(() => {
            //TODO: call refresh

            axios.get(`/api/subscription-status`)
                .then(function (response) {

                    if (response.data?.isSubscribed === true) {
                        clearInterval(interval);
                        setIsRefreshing(false);
                    }
                })
                .catch(function (error) {
                    // TODO: handle error
                    console.log(error);
                });
        }, 4000)

        return () => { clearInterval(interval); }
    }, [])

    function onClickGoToDashboardButton() {
        Inertia.visit('/dashboard');
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >

            <Grid container justifyContent="center">
                <Grid item lg={6} >
                    <Box style={{ backgroundColor: '#fff' }} sx={{ p: 2, py: 5 }}>

                        {isRefreshing && (<><Grid container justifyContent="center">
                            <Grid item>
                                <CircularProgress />
                            </Grid>
                        </Grid>

                            <Typography variant="h5" align="center" sx={{ mt: 2 }} style={{ fontWeight: 'bold' }}>Payment Accepted</Typography>
                            <Typography variant="body1" align="center">Confirming your payment information</Typography>
                        </>
                        )}

                        {!isRefreshing && (<><Grid container justifyContent="center">
                            <Grid item>
                                <CheckCircleIcon className="large-icon" color="success" />
                            </Grid>
                        </Grid>

                            <Typography variant="h5" align="center" sx={{ mt: 2 }} style={{ fontWeight: 'bold' }}>Payment Confirmed!</Typography>
                            <Typography variant="body1" align="center">You're all set to start using Marble Metrics!</Typography>
                            <Box textAlign='center' sx={{ pt: 3 }}>
                                <Button variant="contained" onClick={onClickGoToDashboardButton}>Go To Dashboard</Button>
                            </Box>
                        </>
                        )}

                    </Box>
                </Grid>
            </Grid>

        </Authenticated>
    );
}
