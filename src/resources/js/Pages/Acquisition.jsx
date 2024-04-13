import FirstEventWait from '@/Components/FirstEventWait';
import Authenticated from '@/Layouts/Authenticated';
import {useEffect, useState} from 'react';
import {Head} from "@inertiajs/inertia-react";
import AcquisitionCharts from "@/Components/AcquisitionCharts";

export default function Acquisition(props) {
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
            domain={props.domain}
        >

             <Head title="Acquisition" />

            {eventStatus === 'NO_DATA' && <FirstEventWait domain={props.domain}/>}
            {eventStatus === 'SUCCESS' && <AcquisitionCharts domain={props.domain} />}

        </Authenticated>
    );
}
