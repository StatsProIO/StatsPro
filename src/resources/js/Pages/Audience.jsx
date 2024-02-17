import FirstEventWait from '@/Components/FirstEventWait';
import Authenticated from '@/Layouts/Authenticated';
import {useEffect, useState} from 'react';
import {Head} from "@inertiajs/inertia-react";
import AudienceCharts from "@/Components/AudienceCharts";

export default function Audience(props) {
    const [eventStatus, setEventStatus] = useState(false);

    useEffect(() => {
        axios.get(`/api/event-status/${props.domain}`)
            .then(function (response) {
                setEventStatus(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [props.domain]);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >

             <Head title="Audience" />

            {eventStatus === 'NO_DATA' && <FirstEventWait domain={props.domain}/>}
            {eventStatus === 'SUCCESS' && <AudienceCharts domain={props.domain} />}

        </Authenticated>
    );
}
