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
import AccordionSummary from "@mui/material/AccordionSummary";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from "@mui/material/AccordionDetails";
import LoginIcon from '@mui/icons-material/Login';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TheatersIcon from '@mui/icons-material/Theaters';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import TvIcon from '@mui/icons-material/Tv';
import Stack from "@mui/material/Stack";
import getCountryISO2 from "country-iso-3-to-2";
import AndroidIcon from '@mui/icons-material/Android';
import LanguageIcon from '@mui/icons-material/Language';
import freeBSDLogo from 'super-tiny-icons/images/svg/freebsd.svg';
import linuxLogo from 'super-tiny-icons/images/svg/linux.svg';
import macOsLogo from 'super-tiny-icons/images/svg/macos.svg';
import ubuntuLogo from 'super-tiny-icons/images/svg/ubuntu.svg';
import windowsLogo from 'super-tiny-icons/images/svg/windows.svg';
import appleLogo from 'super-tiny-icons/images/svg/apple.svg';
import chromeLogo from 'super-tiny-icons/images/svg/chrome.svg';
import edgeLogo from 'super-tiny-icons/images/svg/edge.svg';
import firefoxLogo from 'super-tiny-icons/images/svg/firefox.svg';
import googleLogo from 'super-tiny-icons/images/svg/google.svg';
import operaLogo from 'super-tiny-icons/images/svg/opera.svg';
import safariLogo from 'super-tiny-icons/images/svg/safari.svg';
import samsungInternetLogo from 'super-tiny-icons/images/svg/samsung_internet.svg';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Tooltip from "@mui/material/Tooltip";
import {Inertia} from "@inertiajs/inertia";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';


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

    const [domains, setDomains] = useState([]);
    const [range, setRange] = useQueryString("range", '24h');

    const [sessions, setSessions] = useState([]);


    useEffect(() => {
        //make an API request for range/domain

        axios.get(`/api/events/sessions/${domain}?range=${range}`)
            .then(function (response) {
                setDomains(response.data.domains);
                setSessions(response.data.sessions);
            })
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

                    {sessions.length === 0 && (

                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ width: 1, height: "50vh" }}
                        >
                            <Typography variant={'h4'} sx={{textAlign: 'center'}}>
                                No sessions in this time range!
                            </Typography>
                        </Stack>

                    )}

                    { sessions.map(session =>
                        <Accordion sx={{borderColor: '#eee', borderWidth: '2px', borderStyle: 'solid'}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
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
                                        <>

                                                {pageView.referrer && (index === 0 || pageView.referrer !== session[index-1].location_href) &&
                                                    <Stack direction="row" alignItems="center" gap={1} mt={2} color={'#8b8b8b'}>
                                                        <LoginIcon/>
                                                        <Typography sx={{wordWrap: 'break-word', maxWidth: '400px'}} variant={'subtitle1'} >{pageView.referrer}</Typography>
                                                    </Stack>
                                                }

                                            <Stack direction="row" alignItems="center" gap={1} ml={3} mt={1}>
                                                <SouthEastIcon />
                                                <Typography sx={{fontWeight: 'bold'}}>{(new Date(pageView.created_at)).toLocaleString()} </Typography>
                                                <Typography variant={'body1'}> {pageView.location_href}</Typography>
                                                <Typography variant={'subtitle2'} color={'#ccc'}> (time on page: {pageView.time_on_page_seconds!=0 ? pageView.time_on_page_seconds : 'less than 5'}s)</Typography>
                                            </Stack>

                                        </>
                                        )
                                }
                            </AccordionDetails>
                        </Accordion>
                    ) }
                </Grid>
            </Grid>
        </>
    );
}

function osToIcon(os) {

    if(os === null) {
        return <Tooltip title="Unknown OS"><LanguageIcon/></Tooltip>;
    }

    if (os.includes('Android')) {
        return <Tooltip title="Android"><AndroidIcon/></Tooltip>;
    }

    if (os.includes('Chrome')) {
        return <Tooltip title="Chrome OS"><img src={chromeLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    if (os.includes('FreeBSD')) {
        return <Tooltip title="FreeBSD"><img src={freeBSDLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    if (os.includes('Linux')) {
        return <Tooltip title="Linux"><img src={linuxLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    if (os.includes('OS X')) {
        return <Tooltip title="OS X"><img src={macOsLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    if (os.includes('Ubuntu')) {
        return <Tooltip title="Ubuntu"><img src={ubuntuLogo} width={'25px'} style={{borderRadius: '10px'}} /></Tooltip>;
    }

    if (os.includes('Windows')) {
        return <Tooltip title="Windows"><img src={windowsLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    if (os.includes('iOS')) {
        return <Tooltip title="iOS"><img src={appleLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    return <Tooltip title="Unknown OS"><LanguageIcon/></Tooltip>;

}

function countryToIcon(countryCode) {
    if (!countryCode) {
        return <Tooltip title={"Unknown country"}>🏳</Tooltip>;
    }

    let twoLetterCountryCode = getCountryISO2(countryCode);

    if (!twoLetterCountryCode) {
        return <Tooltip title={"Unknown country"}>🏳</Tooltip>;
    }

    const codePoints = twoLetterCountryCode
        .toUpperCase()
        .split('')
        .map(char =>  127397 + char.charCodeAt());
    return <Tooltip title={countryCode}>{String.fromCodePoint(...codePoints)}</Tooltip>;
}

function languageCodeToName(languageCode) {
    const languageNames = new Intl.DisplayNames(['en'], {
        type: 'language'
    });

    return languageNames.of(languageCode);
}

function deviceToIcon(device) {

    if(device === null) {
        return <Tooltip title="Unknown Device"><DeviceUnknownIcon/></Tooltip>;
    }

    if (device.includes('bot')) {
        return <Tooltip title="Bot"><SmartToyIcon/></Tooltip>;
    }

    if (device.includes('desktop')) {
        return <Tooltip title="Desktop"><DesktopMacIcon /></Tooltip>;
    }

    if (device.includes('gaming')) {
        return <Tooltip title="Gaming Device"><SportsEsportsIcon /></Tooltip>;
    }

    if (device.includes('media')) {
        return <Tooltip title="Media Device"><TheatersIcon /></Tooltip>;
    }

    if (device.includes('mobile')) {
        return <Tooltip title="Mobile Device"><SmartphoneIcon /></Tooltip>;
    }

    if (device.includes('tablet')) {
        return <Tooltip title="Tablet Device"><TabletMacIcon /></Tooltip>;
    }

    if (device.includes('television')) {
        return <Tooltip title="Television"><TvIcon /></Tooltip>;
    }

    return <Tooltip title="Unknown Device"><DeviceUnknownIcon/></Tooltip>;
}

function browserToIcon(browser) {

    if (browser === null) {
        return <Tooltip title="Unknown Browser"><TravelExploreIcon/></Tooltip>
    }

    if (browser.includes('Chrome')) {
        return <Tooltip title="Chrome"><img src={chromeLogo} width={'25px'} style={{borderRadius: '10px'}} /></Tooltip>;
    }

    if (browser.includes('Edge') || browser.includes('Internet Explorer')) {
        return <Tooltip title="Edge"><img src={edgeLogo} width={'25px'} style={{borderRadius: '10px'}} /></Tooltip>;
    }

    if (browser.includes('Firefox') || browser.includes('Mozilla')) {
        return <Tooltip title="Mozilla Firefox"><img src={firefoxLogo} width={'25px'} style={{borderRadius: '10px'}} /></Tooltip>;
    }

    if (browser.includes('Google')) {
        return <Tooltip title="Google"><img src={googleLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    if (browser.includes('Opera')) {
        return <Tooltip title="Opera"><img src={operaLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    if (browser.includes('Safari')) {
        return <Tooltip title="Safari"><img src={safariLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    if (browser.includes('Samsung')) {
        return <Tooltip title="Samsung Browser"><img src={samsungInternetLogo} width={'25px'} style={{borderRadius: '10px'}} /></Tooltip>;
    }

    return <Tooltip title="Unknown Browser"><TravelExploreIcon/></Tooltip>
}
