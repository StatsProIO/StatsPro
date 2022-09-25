import {Grid, Typography} from '@mui/material';
import React from 'react';
import {SubscriptionOption} from './SubscriptionOption';
import {subscriptionPlans} from "@/helpers/subscriptions";

export function SubscriptionOptions({authUser, currentProductSubscription, showLabels}) {
    return <>
        <Grid container>
            {subscriptionPlans.map(subscriptionPlan => (
                <Grid item lg={3} md={6} sm={12} key={subscriptionPlan.priceId}>
                    <SubscriptionOption authUser={authUser} showLabels={showLabels} stripePriceId={subscriptionPlan.priceId} title={subscriptionPlan.name} price={subscriptionPlan.price} description={subscriptionPlan.description} maxEvents={subscriptionPlan.maxEvents} maximumSites={subscriptionPlan.maximumSites} isRecommended={subscriptionPlan.isRecommended} showSubscribeButton={currentProductSubscription.priceId === 'free'} isCurrentSubscription={currentProductSubscription.priceId === subscriptionPlan.priceId} isFree={subscriptionPlan.isFree} />
                </Grid>
            ))}
        </Grid>
        <Typography variant="body2">Higher plans available upon request.</Typography>
    </>
}
