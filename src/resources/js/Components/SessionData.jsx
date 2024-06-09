import {Grid, Typography} from '@mui/material';
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
import AccordionSummary from "@mui/material/AccordionSummary";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from "@mui/material/AccordionDetails";
import LoginIcon from '@mui/icons-material/Login';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import Stack from "@mui/material/Stack";
import {Inertia} from "@inertiajs/inertia";
import Button from "@mui/material/Button";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Loading from "@/Components/common/Loading";
import Box from "@mui/material/Box";
import {
    browserToIcon,
    countryToIcon,
    deviceToIcon,
    languageCodeToName,
    osToIcon
} from "@/Components/common/SessionUtils";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    BarElement,
    ArcElement
);

export default function SessionData({ domain }) {

    const [loading, setLoading] = useState(false);
    const [domains, setDomains] = useState([]);
    const [range, setRange] = useQueryString("range", '24h');

    const [sessions, setSessions] = useState([]);


    useEffect(() => {
        setLoading(true);
        axios.get(`/api/events/sessions/${domain}?range=${range}`)
            .then(function (response) {
                setDomains(response.data.domains);
                setSessions(response.data.sessions);
            })
            .finally(() => setLoading(false))
            .catch(function (error) {
                axios.post(`/api/error`, {component: 'Sessions', message: error});
            });
    }, [range, domain]);

    return (
        <>
            <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item lg={8} md={6} xs={12}>
                    <Typography variant="h4"><b>Sessions</b></Typography>
                    <Typography variant="h6" color="text.secondary">Here you will see individuals sessions for visitors on your site</Typography>
                </Grid>
                <Filters currentUrlPath={'sessions'} domain={domain} domains={domains} setDomains={setDomains} range={range} setRange={setRange}/>
            </Grid>

            <Grid container mt={3}>
                <Grid item xs={12} lg={12}>

                    <Loading loading={loading}>

                        { sessions.map(session =>
                            <Accordion sx={{borderColor: '#eee', borderWidth: '2px', borderStyle: 'solid'}} key={session[0].visitor_id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    sx={{backgroundColor: '#f5f5f5'}}
                                >
                                    <Stack direction="row" alignItems="center" gap={2}>
                                        <Typography variant={'subtitle1'}>{(new Date(session[0].created_at)).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</Typography>
                                        <Typography variant={'subtitle1'}>{session.length} actions </Typography>
                                        <Typography variant={'subtitle1'} sx={{fontSize: '30px'}}>{countryToIcon(session[0].country)}</Typography>
                                        {osToIcon(session[0].os)}
                                        {deviceToIcon(session[0].device)}
                                        {browserToIcon(session[0].browser)}
                                        <Typography variant={'subtitle1'}>{languageCodeToName(session[0].language)}</Typography>
                                    </Stack>

                                </AccordionSummary>
                                <AccordionDetails>
                                    {domain === 'statspro.io' &&
                                    (<Button variant={'contained'} size='large' onClick={() => Inertia.get('/replay/statspro.io/' + session[0].visitor_id)}
                                            endIcon={<PlayCircleIcon/>}>Replay this Session</Button>)
                                    }
                                        {
                                        session.map((pageView, index) =>
                                            <Box key={pageView.id}>

                                                    {pageView.referrer && (index === 0 || pageView.referrer !== session[index-1].location_href) &&
                                                        <Stack direction="row" alignItems="center" gap={1} mt={2} color={'#8b8b8b'}>
                                                            <LoginIcon/>
                                                            <Typography sx={{wordWrap: 'break-word', maxWidth: '400px'}} variant={'subtitle1'} >{pageView.referrer}</Typography>
                                                        </Stack>
                                                    }

                                                <Grid container spacing={1} sx={{alignItems: 'center'}}>
                                                    <Grid item xs={12} md={'auto'} lg={2}>
                                                        <Stack direction="row" alignItems="center">
                                                            <SouthEastIcon />
                                                            <Typography sx={{fontWeight: 'bold'}}>{(new Date(pageView.created_at)).toLocaleString()} </Typography>
                                                        </Stack>
                                                    </Grid>
                                                    <Grid item xs={12} md={8} lg={8} xl={8} zeroMinWidth sx={{maxWidth: {xs: '90vw', md: '50vw', lg: '70vw'}}}>
                                                        <Typography sx={{wordWrap: 'break-word', overflowWrap: 'break-word', }} variant={'body1'}> {pageView.location_href}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={12} lg={2}>
                                                        <Typography variant={'subtitle2'} color={'#ccc'}> (time on page: {pageView.time_on_page_seconds!=0 ? pageView.time_on_page_seconds : 'less than 15'}s)</Typography>
                                                    </Grid>
                                                </Grid>

                                            </Box>
                                            )
                                    }
                                </AccordionDetails>
                            </Accordion>
                        ) }
                    </Loading>
                </Grid>
            </Grid>
        </>
    );
}
