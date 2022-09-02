import { Inertia } from '@inertiajs/inertia';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';



export function SubscriptionOption({ title, price, productId, description, maxEvents, maximumSites, isRecommended, stripePriceId, showSubscribeButton, isCurrentSubscription, isFree }) {

    const [isLoading, setIsLoading] = useState(false);

    function subscribeToPrice() {
        setIsLoading(true);
        Inertia.visit('/subscription-checkout?price=' + stripePriceId);
    }

    return <>
        <Paper elevation={1} sx={{ m: 2, borderStyle: 'solid', borderColor: '#f1f1f1', borderWidth: '3px'}}>

            <Box sx={{ backgroundColor: "#f1f1f1", borderRadius: '5px', p: 3 }}>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="h6">{title}</Typography>
                    {isCurrentSubscription && ( <Stack direction="row" style={{ background: '#59ce9f', borderRadius: '5px', color: 'white', padding: '5px', alignItems: 'center' }}> <CheckIcon sx={{ color: "#ffffff" }} /><Typography variant="body2" > Current Plan</Typography> </Stack>)}
                    {isRecommended && <Stack direction="row" style={{ background: '#2a62fe', borderRadius: '5px', color: 'white', padding: '5px', alignItems: 'center'}}><EmojiEventsIcon sx={{color: "#ffffff"}} /><Typography variant="body2" >Most Popular</Typography></Stack>}
                </Stack>

                {isFree && <Typography variant="h4"><b>Free</b></Typography>}
                {!isFree && <Typography variant="h4"><b>{price}/month</b></Typography>}
                <Typography variant="body1" sx={{ pt: 3, pb: 2 }} color='text.secondary'>{description}</Typography>
            </Box>

            <Box sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" gap={1}>
                    <CheckIcon sx={{ color: "#59ce9f" }} />
                    <Typography variant="body1" sx={{ py: 1 }}>{maxEvents} max events per month per site</Typography>
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

                {!isFree && !isCurrentSubscription && showSubscribeButton &&
                    <LoadingButton variant="contained" size="large" sx={{my: 2}} fullWidth style={{fontSize: '1.1em'}}
                               fontWeight="bold" loading={isLoading} onClick={() => subscribeToPrice()}><b>Subscribe</b></LoadingButton>
                }
            </Box>
        </Paper>
    </>

}
