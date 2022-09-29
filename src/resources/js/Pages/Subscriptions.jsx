import {SubscriptionOptions} from '@/Components/SubscriptionOptions';
import Authenticated from '@/Layouts/Authenticated';
import {Head, usePage} from '@inertiajs/inertia-react';
import {Alert, AlertTitle, Button, Grid, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {Inertia} from '@inertiajs/inertia';
import {subscriptionPlans} from "@/helpers/subscriptions";
import * as React from "react";

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
                axios.post(`/api/error`, {component: 'Subscriptions', message: error});
            });

    });

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >

            <Head title="Subscriptions" />

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
                {props.auth.user.stripe_id != null &&
                    (<Grid item lg={2}>
                        <Button variant="contained" onClick={() => {window.open('/billing-portal', '_blank');}}>Go To Billing Portal</Button>
                    </Grid>)
                }
            </Grid>


            <SubscriptionOptions authUser={props.auth.user} showLabels={true} currentProductSubscription={currentProductSubscription} />

        </Authenticated>
    );
}
