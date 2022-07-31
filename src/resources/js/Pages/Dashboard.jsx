import Charts from '@/components/Charts';
import FirstEventWait from '@/components/FirstEventWait';
import useQueryString from '@/customHooks/useQueryString';
import Authenticated from '@/Layouts/Authenticated';
import { useEffect, useState } from 'react';

export default function Dashboard(props) {
    const [eventStatus, setEventStatus] = useState(false);
    const [domain, setDomain] = useQueryString("domain", '');

    useEffect(() => {

        //if the domain is not set in the query params, find the first domain and set the query params
        if (domain === '') {
            console.log("Domain is empty, setting to " + props.firstDomain);
            setDomain(props.firstDomain)
        } else {
            axios.get(`/api/event-status/${domain}`)
                .then(function (response) {
                    setEventStatus(response.data);
                })
                .catch(function (error) {
                    // TODO: handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }
    }, [domain]);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >

            {/* <Head title="Dashboard" /> */}

            {eventStatus === 'NO_DATA' && <FirstEventWait />}
            {eventStatus === 'SUCCESS' && <Charts domain={domain} setDomain={setDomain} />}

            {/* TODO: the case if there are no domains */}

        </Authenticated>
    );
}
