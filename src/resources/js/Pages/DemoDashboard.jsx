import Charts from '@/Components/Charts';
import {Head} from "@inertiajs/inertia-react";
import Guest from "@/Layouts/Guest";
import {Box} from "@mui/system";
import {Grid} from "@mui/material";
import ConvincingBanner from "@/Components/ConvincingBanner";

export default function Dashboard(props) {

    return (
        <Guest
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Dashboard" />
            <Grid container justifyContent={'center'}>
                <Grid item md={10} lg={9} xl={8}>
                    <Box sx={{mt: 4, px: 2}}>
                        <Charts domain="demo.com" />
                    </Box>
                </Grid>
            </Grid>

            <ConvincingBanner/>

        </Guest>
    );
}
