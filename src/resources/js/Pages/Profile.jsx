import {Box, Button, Grid, Typography} from '@mui/material';
import {Inertia} from '@inertiajs/inertia';
import Authenticated from '@/Layouts/Authenticated';
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import {Head} from "@inertiajs/inertia-react";
import {subscriptionPlans} from "@/helpers/subscriptions";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Profile(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >

            <Head title="Profile" />

            <Grid item lg={10}>
                <Typography variant="h4"><b>Profile</b></Typography>
                <Typography variant="h6" color="text.secondary">Everything about you!</Typography>
            </Grid>


            <Grid container justifyContent="center">
                <Grid item md={5} sx={{mt: 2}}>

                    <Box style={{ backgroundColor: '#fff' }} sx={{ p: 4 }} >
                        <Box style={{ justifyContent: "center", display: "flex" }}>
                            <Avatar alt={props.auth.user.email} sx={{ width: 128, height: 128 }}  />
                        </Box>

                        <Typography variant={"h4"} sx={{ pt: 2, display: {xs: 'none', sm: 'block'}}}>{props.auth.user.email}</Typography>
                        <hr/>

                        <Typography variant={"h6"} sx={{py: 1}}>
                            <b>Current Subscription</b> { (subscriptionPlans.find(plan => plan.productId === props.subscription_status.subscription_product_id)).name}
                        </Typography>

                        <Typography variant={"h6"} sx={{py: 1}}>
                            <b>Logged in with</b>
                            {props.auth.user.google_id ?  (' Google') : (' Email & Password')}
                        </Typography>

                        <Typography variant={"h6"} sx={{py: 1}}>
                            <b>Account Created</b> { new Date(props.auth.user.created_at).toLocaleString()}
                        </Typography>

                        <Button variant="contained" onClick={() => Inertia.get('subscriptions')} endIcon={<ArrowForwardIosIcon/>}><b>Manage Your Subscription</b></Button>

                    </Box>
                </Grid>
            </Grid>




        </Authenticated>
    );
}
