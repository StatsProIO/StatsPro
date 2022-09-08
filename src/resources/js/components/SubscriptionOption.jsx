import { Inertia } from '@inertiajs/inertia';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



export function SubscriptionOption({ authUser, showLabels, title, price, productId, description, maxEvents, maximumSites, isRecommended, stripePriceId, showSubscribeButton, isCurrentSubscription, isFree }) {

    const [isLoading, setIsLoading] = useState(false);

    function subscribeToPrice() {
        setIsLoading(true);
        Inertia.visit('/subscription-checkout?price=' + stripePriceId);
    }

    function goToSubscriptions() {
        setIsLoading(true);
        Inertia.visit('/subscriptions');
    }

    console.log(authUser === true);
    console.log(!authUser === true);

    return <>
        <Paper elevation={1} sx={{ m: 2}} style={{boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
            <Box sx={{ borderRadius: '5px', p: 3 }}>
                <Stack direction="row" alignItems="center"  justifyContent="center" gap={1}>
                    <Typography variant="h6" style={{textAlign: 'center', color: '#2a62fe'}}>{title}</Typography>
                    {isCurrentSubscription && showLabels && ( <Stack direction="row" style={{ background: '#59ce9f', borderRadius: '5px', color: 'white', padding: '5px', alignItems: 'center' }}> <CheckIcon sx={{ color: "#ffffff" }} /><Typography variant="body2" > Current Plan</Typography> </Stack>)}
                    {isRecommended && showLabels && <Stack direction="row" style={{ background: '#2a62fe', borderRadius: '5px', color: 'white', padding: '5px', alignItems: 'center'}}><EmojiEventsIcon sx={{color: "#ffffff"}} /><Typography variant="body2" >Most Popular</Typography></Stack>}
                </Stack>

                {isFree && <Typography variant="h4"><b>Free</b></Typography>}
                {!isFree && <Typography variant="h4"><b>{price}/month</b></Typography>}
                <Typography variant="body1" sx={{ pt: 3, pb: 2 }} color='text.secondary'>{description}</Typography>
            </Box>

            <Box sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" gap={1}>
                    <CheckIcon sx={{ color: "#59ce9f" }} />
                    <Typography variant="body1" sx={{ py: 1 }}>{maxEvents}  events per month per site</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" gap={1}>
                    <CheckIcon sx={{ color: "#59ce9f" }} />
                    <Typography variant="body1" sx={{ py: 1 }}>{maximumSites} max sites</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" gap={1}>
                    <CheckIcon sx={{ color: "#59ce9f" }} />
                    <Typography variant="body1" sx={{ py: 1 }}>99.99% uptime</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" gap={1}>
                    <CheckIcon sx={{ color: "#59ce9f" }} />
                    <Typography variant="body1" sx={{ py: 1 }}>24/7 support</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" gap={1}>
                    <CheckIcon sx={{ color: "#59ce9f" }} />
                    <Typography variant="body1" sx={{ py: 1 }}>100% Data Ownership</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" gap={1}>
                    <CheckIcon sx={{ color: "#59ce9f" }} />
                    <Typography variant="body1" sx={{ py: 1 }}>EU Data Hosting</Typography>
                </Stack>

                {/*If user is logged in show subscribe buttons*/}
                {(!isFree && !isCurrentSubscription && showSubscribeButton && authUser ) &&
                    <LoadingButton variant="contained" size="large" sx={{my: 2}} fullWidth style={{fontSize: '1.1em'}} endIcon={<ArrowForwardIosIcon/>}
                               fontWeight="bold" loading={isLoading} onClick={() => subscribeToPrice()}><b>Subscribe</b></LoadingButton>
                }

                {/*If user is not logged in, direct them to subscriptions*/}
                {!authUser &&
                <LoadingButton variant="contained" size="large" sx={{my: 2}} fullWidth style={{fontSize: '1.1em'}} endIcon={<ArrowForwardIosIcon/>}
                               fontWeight="bold" loading={isLoading} onClick={() => goToSubscriptions()}><b>Get Started</b></LoadingButton>
                }
            </Box>
        </Paper>
    </>

}
