import {Grid, Paper, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import useQueryString from '@/customHooks/useQueryString';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    LinearScale,
    LineElement,
    PointElement
} from 'chart.js';
import Filters from "@/Components/Filters";
import {LineChart} from "@/Components/LineChart";
import Loading from "@/Components/common/Loading";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    BarElement,
    ArcElement
);

export default function PerformanceCharts({ domain }) {
    const [loading, setLoading] = useState(false);

    const [domains, setDomains] = useState([]);
    const [range, setRange] = useQueryString("range", '24h');

    const [pageLoadTime, setPageLoadTime] = useState([]);


    useEffect(() => {
        //make an API request for range/domain
        setLoading(true);

        axios.get(`/api/events/performance/${domain}?range=${range}`)
            .then(function (response) {
                setDomains(response.data.domains);

                setPageLoadTime(response.data.pageLoadTime);
            })
            .finally(() => setLoading(false))
            .catch(function (error) {
                axios.post(`/api/error`, {component: 'BehaviorCharts', message: error});
            });
    }, [range, domain]);

    return (
        <>
            <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item lg={8} md={6} xs={12}>
                    <Typography variant="h4"><b>Performance</b></Typography>
                    <Typography variant="h6" color="text.secondary">Here you will see information about how fast your page is showing content to your users</Typography>
                </Grid>
                <Filters currentUrlPath={'performance'} domain={domain} domains={domains} setDomains={setDomains} range={range} setRange={setRange}/>
            </Grid>

            <Loading loading={loading}>
                <Grid container rowSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }} columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }} sx={{ mt: { xs: 0, sm: 0, md: 0 } }}>
                    <Grid item xs={12} lg={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6">Average Page Load Time</Typography>
                            <Typography variant="subtitle1" color="text.secondary">Seconds</Typography>
                            <LineChart inputData={pageLoadTime} label={'Page Load Time'} />
                        </Paper>
                    </Grid>
                </Grid>
            </Loading>
        </>
    );
}
