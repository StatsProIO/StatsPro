import {Grid, Paper, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {DashboardInfoCard} from '@/Components/DashboardInfoCard';
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
import {TimeTrendChart} from "@/Components/TimeTrendChart";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    BarElement,
    ArcElement
);

export default function BehaviorCharts({ domain }) {

    const [domains, setDomains] = useState([]);
    const [range, setRange] = useQueryString("range", '24h');

    const [bounceRate, setBounceRate] = useState([]);
    const [timeOnPage, setTimeOnPage] = useState([]);
    const [timeTrends, setTimeTrends] = useState([]);

    const [busiestDayOfWeek, setBusiestDayOfWeek] = useState('None');
    const [busiestHourOfDay, setBusiestHourOfDay] = useState('');


    useEffect(() => {
        //make an API request for range/domain

        axios.get(`/api/events/behavior/${domain}?range=${range}`)
            .then(function (response) {
                setDomains(response.data.domains);

                setBounceRate(response.data.bounceRate);
                setTimeOnPage(response.data.timeOnPage);
                setBusiestDayOfWeek(response.data.busiestDayOfWeek);
                setBusiestHourOfDay(response.data.busiestHourOfDay);
                setTimeTrends(response.data.timeTrends);

            })
            .catch(function (error) {
                axios.post(`/api/error`, {component: 'BehaviorCharts', message: error});
            });
    }, [range, domain]);

    return (
        <>
            <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item lg={8} md={6} xs={12}>
                    <Typography variant="h4"><b>Behavior</b></Typography>
                    <Typography variant="h6" color="text.secondary">Here you will see information about your users actions</Typography>
                </Grid>
                <Filters domain={domain} domains={domains} setDomains={setDomains} range={range} setRange={setRange}/>
            </Grid>

            <Grid container rowSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }} columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }} sx={{ mt: { xs: 0, sm: 0, md: 0 } }}>
                <Grid item xs={6} lg={6} >
                    <DashboardInfoCard title='Busiest Day of the Week' value={busiestDayOfWeek} />
                </Grid>
                <Grid item xs={6} lg={6}>
                    <DashboardInfoCard title='Busiest Hour of the Day' value={busiestHourOfDay} />
                </Grid>
            </Grid>

            <Grid container rowSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }} columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }} sx={{ mt: { xs: 0, sm: 0, md: 0 } }}>
                <Grid item xs={12} lg={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">Bounce Rate</Typography>
                        <LineChart inputData={bounceRate} label={'Bounce Rate'} />
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">Average Time On Page</Typography>
                        <LineChart inputData={timeOnPage} label={'Time (seconds)'} />
                    </Paper>
                </Grid>

                <Grid item xs={12} lg={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">Time Trends</Typography>
                        <TimeTrendChart inputData={timeTrends} />
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
