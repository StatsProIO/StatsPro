import {Box, Grid, Paper, Typography} from '@mui/material';
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
import HorizontalBarChart from "@/Components/HorizontalBarChart";
import {TopSourcesChart} from "@/Components/TopSourcesChart";
import NoData from "@/Components/common/NoData";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    BarElement,
    ArcElement
);

export default function AcquisitionCharts({ domain }) {

    const [domains, setDomains] = useState([]);
    const [range, setRange] = useQueryString("range", '24h');

    const [topSources, setTopSources] = useState([]);
    const [topUTMSources, setTopUTMSources] = useState([]);
    const [topEntryPages, setTopEntryPages] = useState([]);

    useEffect(() => {
        //make an API request for range/domain

        axios.get(`/api/events/acquisition/${domain}?range=${range}`)
            .then(function (response) {
                setDomains(response.data.domains);

                setTopSources(response.data.topSources);
                setTopUTMSources(response.data.topUTMSources);
                setTopEntryPages(response.data.topEntryPages);

            })
            .catch(function (error) {
                axios.post(`/api/error`, {component: 'AcquisitionCharts', message: error});
            });
    }, [range, domain]);

    return (
        <>
            <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item lg={8} md={6} xs={12}>
                    <Typography variant="h4"><b>Acquisition</b></Typography>
                    <Typography variant="h6" color="text.secondary">Here you will see information about how your users enter your site</Typography>
                </Grid>
                <Filters currentUrlPath={'acquisition'} domain={domain} domains={domains} setDomains={setDomains} range={range} setRange={setRange}/>
            </Grid>

            <Grid container rowSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }} columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }} sx={{ mt: { xs: 0, sm: 0, md: 0 } }}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">Top Referral Sources</Typography>
                        <Box>
                            {topSources.length === 0 ? <NoData/> :
                                <TopSourcesChart inputData={topSources}/>
                            }
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">Top UTM Sources</Typography>
                        <Box>
                            {topUTMSources.length === 0 ? <NoData/> :
                                <HorizontalBarChart valueTitle="Views" data={topUTMSources}
                                                    totalValue={topUTMSources.map((utmSource) => utmSource.count).reduce(function (a, b) {
                                                        return a + b
                                                    }, 0)} colorMin="#52bdf7" colorMax="#1f75ff"/>
                            }
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">Top Entry Pages</Typography>
                        {topEntryPages.length === 0 ? <NoData/> :
                            <HorizontalBarChart valueTitle="Views" data={topEntryPages}
                                                totalValue={topEntryPages.map((entryPage) => entryPage.count).reduce(function (a, b) {
                                                    return a + b
                                                }, 0)} colorMin="#52bdf7" colorMax="#1f75ff"/>
                        }
                    </Paper>
                </Grid>
            </Grid>

        </>
    );
}
