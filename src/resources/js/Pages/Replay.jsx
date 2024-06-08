import Authenticated from '@/Layouts/Authenticated';
import {useEffect, useState} from 'react';
import {Head} from "@inertiajs/inertia-react";
import Box from "@mui/material/Box";

import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useWindowDimensions from "@/helpers/useWindowDimensions";

export default function Replay(props) {
    const [rrWebPlayer, setrrWebPlayer] = useState(null);
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        axios.get(`/api/replay/${props.domainName}/${props.visitorId}`)
            .then(function (response) {
                const playerContainer = document.getElementById('replayer-root');
                setrrWebPlayer(new rrwebPlayer({
                    target: playerContainer, // customizable root element
                    props: {
                        events: response.data,
                    },
                }));

                setTimeout(function () {
                    resize();
                }, 1000)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
       resize();
    }, [width, rrWebPlayer]);

    function resize() {
        document
            .querySelector(".rr-player")
            ?.setAttribute("style", "width:75vw; height:45vw;");
        document
            .querySelector(".rr-player__frame")
            ?.setAttribute("style", "width:75vw;height:45vw;");
        document
            .querySelector(".replayer-wrapper")
            ?.setAttribute(
                "style",
                `transform: scale(${(width * 0.8) / 1920}) translate(-50%,-50%);`
            );
    }

    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}
            domain={props.domain}
        >
             <Head title="Replay" />

            <Typography variant={'h4'}><b>Session Replay</b></Typography>
            <Grid container>
                <Grid item sx={{maxWidth: '100%'}}>
                    <Box component={'div'} id={'replayer-root'} ></Box>
                </Grid>
            </Grid>


        </Authenticated>
    );
}
