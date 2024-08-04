import Authenticated from '@/Layouts/Authenticated';
import React, {useEffect, useState} from 'react';
import {Head} from "@inertiajs/inertia-react";
import Box from "@mui/material/Box";

import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useWindowDimensions from "@/helpers/useWindowDimensions";
import Loading from "@/Components/common/Loading";
import {Paper} from "@mui/material";
import Stack from "@mui/material/Stack";
import {
    browserToIcon,
    countryToIcon,
    deviceToIcon,
    languageCodeToName,
    osToIcon
} from "@/Components/common/SessionUtils";
import 'rrweb/dist/rrweb.min.css';

export default function Replay(props) {
    const [loading, setLoading] = useState(false);
    const [rrWebPlayer, setrrWebPlayer] = useState(null);
    const { height, width } = useWindowDimensions();
    const [latestSessionEvent, setSessionLatestEvent] = useState(null);
    const [lastPlayerEvent, setPlayerEvent] = useState({});
    const [firstPlayerTime, setFirstPlayerTime] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/replay/${props.domainName}/${props.visitorId}`)
            .then(function (response) {
                setLoading(false);
                const playerContainer = document.getElementById('replayer-root');
                setFirstPlayerTime(response.data[0].timestamp);
                const rrWebPlayer = new rrwebPlayer({
                    target: playerContainer, // customizable root element
                    props: {
                        events: response.data,
                    },
                });

                setrrWebPlayer(rrWebPlayer);
                rrWebPlayer.addEventListener('event-cast', (event) => resize(event, false));
            })
            .finally(() => setLoading(false))
            .catch(function (error) {
                axios.post(`/api/error`, {component: 'Replay', message: error});
            });

        axios.get(`/api/events/latest/${props.domainName}/${props.visitorId}`)
            .then(function (response) {
                setSessionLatestEvent(response.data.event)
            })
            .catch(function (error) {
                axios.post(`/api/error`, {component: 'Replay Latest Event', message: error});
            });

    }, []);



    useEffect(() => {
        resize(lastPlayerEvent, true);
    }, [width]);

    function resize(event, skipSettingLastEvent) {
        // console.log("hello", {event});
        if(event && (event.type === 4 || event.type === 3) && event.data.width && event.data.height) {

            if(!skipSettingLastEvent) {
                setPlayerEvent(event);
            }
            // console.log("resizing");

            let ratioVideo = event.data.width/event.data.height;
            let ratioPage = window.innerWidth/window.innerHeight;

            // console.log("ratios", {ratioVideo, ratioPage});
            if(ratioVideo > ratioPage) { //aspect ratio of the video is > than the page
                ratioVideo = event.data.height/event.data.width;

                let widthVw = 100;
                let heightVw = Math.floor(ratioVideo * 100);

                //make container size smaller by 25%
                widthVw -= (widthVw * .25);
                heightVw -= (heightVw * .25);

                //set the container based on vw units
                document
                    .querySelector(".rr-player")
                    ?.setAttribute("style", "width:" + widthVw + "vw; height:" + heightVw + "vw;");
                document
                    .querySelector(".rr-player__frame")
                    ?.setAttribute("style", "width:" + widthVw + "vw; height:" + heightVw + "vw;");
            } else {
                let widthVh = Math.floor(ratioVideo * 100);
                let heightVh = 100;

                //make it smaller by 25%
                widthVh -= (widthVh * .25);
                heightVh -= (heightVh * .25);

                document
                    .querySelector(".rr-player")
                    ?.setAttribute("style", "width:" + widthVh + "vh; height:" + heightVh + "vh;");
                document
                    .querySelector(".rr-player__frame")
                    ?.setAttribute("style", "width:" + widthVh + "vh; height:" + heightVh + "vh;");
                document
                    .querySelector(".replayer-wrapper")
                    ?.setAttribute(
                        "style",
                        `transform: scale(1) translate(-50%,-50%);`
                    );
            }

            //scale the replayer wrapper based on the size of the container
            const containerWidthPx = document
                .querySelector(".rr-player")
                .offsetWidth;

            const playerWrapperWidthPx = document
                .querySelector(".replayer-wrapper")
                .offsetWidth;
            const transformRatio = containerWidthPx/playerWrapperWidthPx;

            document
                .querySelector(".replayer-wrapper")
                ?.setAttribute(
                    "style",
                    `transform: scale(${transformRatio}) translate(-50%,-50%);`
                );


        }
    }

    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}
            domain={props.domain}
        >
             <Head title="Replay" />

            <Typography variant={'h4'} sx={{mb: 1}}><b>Session Replay</b></Typography>
            <Loading loading={loading}>
                <Grid container justifyContent={'center'}>
                    <Grid item>
                        <Box component={'div'} id={'replayer-root'} ></Box>
                    </Grid>
                </Grid>

                {!firstPlayerTime &&
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width: 1, height: "50vh" }}
                    >
                        <Typography variant={'h4'} sx={{textAlign: 'center'}}>
                            No replay for this session!
                        </Typography>
                    </Stack>
                }

                {latestSessionEvent &&
                    <Grid container justifyContent={'center'} sx={{mt: 13}}>
                        <Grid item>
                            <Paper elevation={0} sx={{p: 2}}>
                                <Stack direction="row" alignItems="center" gap={2}>
                                    <Typography
                                        variant={'subtitle1'}>{(new Date(firstPlayerTime)).toLocaleString([], {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        timeZoneName: 'short'
                                    })}</Typography>
                                    <Typography variant={'subtitle1'}
                                                sx={{fontSize: '30px'}}>{countryToIcon(latestSessionEvent.country)}</Typography>
                                    {osToIcon(latestSessionEvent.os)}
                                    {deviceToIcon(latestSessionEvent.device)}
                                    {browserToIcon(latestSessionEvent.browser)}
                                    <Typography
                                        variant={'subtitle1'}>{languageCodeToName(latestSessionEvent.language)}</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                }
            </Loading>


        </Authenticated>
    );
}
