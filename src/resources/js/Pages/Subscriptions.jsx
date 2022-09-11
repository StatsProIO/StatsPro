import { SubscriptionOptions } from '@/Components/SubscriptionOptions';
import useQueryString from '@/customHooks/useQueryString';
import Authenticated from '@/Layouts/Authenticated';
import { usePage } from '@inertiajs/inertia-react';
import {Alert, AlertTitle, Box, Button, Grid, Typography} from '@mui/material';
import { useEffect, useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Inertia } from '@inertiajs/inertia';
import {subscriptionPlans} from "@/helpers/subscriptions";

export default function Subscriptions(props) {

    const { flash } = usePage().props

    const [currentProductSubscription, setCurrentProductSubscription] = useState({});


    useEffect(() => {
        axios.get(`/api/subscription-status`)
            .then(function (response) {

                let foundPlan = subscriptionPlans.find(subscriptionPlan => subscriptionPlan.productId === response.data.subscription_product_id);

                if(foundPlan === undefined) {
                    foundPlan = subscriptionPlans[0];
                }

                setCurrentProductSubscription(foundPlan);

            })
            .catch(function (error) {
                // TODO: handle error
                console.log(error);
            });

    });

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >

            <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item lg={12} md={12} xs={12}>
                    {flash.message && (
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {flash.message}
                        </Alert>
                    )}
                </Grid>
                <Grid item lg={10}>
                    <Typography variant="h4"><b>Subscriptions</b></Typography>
                    <Typography variant="h6" color="text.secondary">No contracts, cancel anytime</Typography>
                </Grid>
                <Grid item lg={2}>
                    <Button variant="contained" onClick={() => { Inertia.visit('/billing-portal'); }}>Go To Billing Portal</Button>
                </Grid>
            </Grid>


            <SubscriptionOptions authUser={props.auth.user} showLabels={true} currentProductSubscription={currentProductSubscription} />

        </Authenticated>
    );
}
