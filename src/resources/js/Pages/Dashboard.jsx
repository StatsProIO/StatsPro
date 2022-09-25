import Charts from '@/Components/Charts';
import FirstEventWait from '@/Components/FirstEventWait';
import useQueryString from '@/customHooks/useQueryString';
import Authenticated from '@/Layouts/Authenticated';
import { useEffect, useState } from 'react';

export default function Dashboard(props) {
    const [eventStatus, setEventStatus] = useState(false);
    const [domain, setDomain] = useQueryString("domain", '');

    useEffect(() => {
        axios.get(`/api/event-status/${domain}`)
            .then(function (response) {
                setEventStatus(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [domain]);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >

            {/* <Head title="Dashboard" /> */}

            {eventStatus === 'NO_DATA' && <FirstEventWait domain={domain}/>}
            {eventStatus === 'SUCCESS' && <Charts domain={domain} setDomain={setDomain} />}

            {/* TODO: the case if there are no domains */}

        </Authenticated>
    );
}
