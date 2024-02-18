import {Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {TopSourcesChart} from '@/Components/TopSourcesChart';
import {DashboardInfoCard} from '@/Components/DashboardInfoCard';
import {TopPages} from '@/Components/TopPages';
import {PageviewsChart} from '@/Components/PageviewsChart';
import {DevicesChart} from '@/Components/DevicesChart';
import {LocationChart} from '@/Components/LocationChart';
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
import {RealTimeChart} from './RealTimeChart';
import {Inertia} from "@inertiajs/inertia";
import Filters from "@/Components/Filters";
import HorizontalBarChart from "@/Components/HorizontalBarChart";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    BarElement,
    ArcElement
);

export default function AudienceCharts({ domain }) {

    const [domains, setDomains] = useState([]);
    const [range, setRange] = useQueryString("range", '24h');

    const [devices, setDevices] = useState([]);
    const [locations, setLocations] = useState([]);
    const [browsers, setBrowsers] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [oses, setOses] = useState([]);

    useEffect(() => {
        //make an API request for range/domain

        axios.get(`/api/events/audience/${domain}?range=${range}`)
            .then(function (response) {
                setDomains(response.data.domains);

                setDevices(response.data.devices);
                setLocations(response.data.locations);
                setBrowsers(response.data.browsers);
                setLanguages(response.data.languages);
                setOses(response.data.oses);
            })
            .catch(function (error) {
                axios.post(`/api/error`, {component: 'AudienceCharts', message: error});
            });
    }, [range, domain]);

    return (
        <>
            <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item lg={8} md={6} xs={12}>
                    <Typography variant="h4"><b>Audience</b></Typography>
                    <Typography variant="h6" color="text.secondary">Here you will see information about your users</Typography>
                </Grid>
                <Filters domain={domain} domains={domains} setDomains={setDomains} range={range} setRange={setRange}/>
            </Grid>

            <Grid container rowSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }} columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }} sx={{ mt: { xs: 0, sm: 0, md: 0 } }}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">Devices</Typography>
                        <Box>
                            <HorizontalBarChart alueTitle="Views" data={devices} labelKey={'device'} totalValue={devices.map((deviceData) => deviceData.count).reduce(function (a, b) { return a + b }, 0)} colorMin="#52bdf7" colorMax="#1f75ff"/>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">Browsers</Typography>
                        <Box>
                            <HorizontalBarChart alueTitle="Views" data={browsers} labelKey={'browser'} totalValue={browsers.map((browserData) => browserData.count).reduce(function (a, b) { return a + b }, 0)} colorMin="#52bdf7" colorMax="#1f75ff"/>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">Locations</Typography>
                        <HorizontalBarChart alueTitle="Views" data={locations} labelKey={'country'} totalValue={locations.map((locationData) => locationData.count).reduce(function (a, b) { return a + b }, 0)} colorMin="#52bdf7" colorMax="#1f75ff"/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">Languages</Typography>
                        <HorizontalBarChart alueTitle="Views" data={languages} labelKey={'language'} totalValue={languages.map((languageData) => languageData.count).reduce(function (a, b) { return a + b }, 0)} colorMin="#52bdf7" colorMax="#1f75ff"/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">Operating System</Typography>
                        <HorizontalBarChart alueTitle="Views" data={oses} labelKey={'os'} totalValue={oses.map((osData) => osData.count).reduce(function (a, b) { return a + b }, 0)} colorMin="#52bdf7" colorMax="#1f75ff"/>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
