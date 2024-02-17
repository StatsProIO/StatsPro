import {FormControl, Grid, InputLabel, MenuItem, Select} from '@mui/material';
import React from 'react';
import {Inertia} from "@inertiajs/inertia";


export default function Filters({ domain, domains, setDomain, range, setRange }) {

    return (
        <>
            <Grid item lg={2} md={3} xs={6}>
                <FormControl fullWidth variant="filled">
                    <InputLabel id="domain-label">Domain</InputLabel>
                    <Select
                        value={domains.includes(domain) ? domain : ''} /* domain is passed in as a prop from the server, domains is loaded async. Make sure the list contains the one we're selecting before selecting it */
                        labelId="domain-label"
                        label="Domain"
                        onChange={(event) => {
                            Inertia.get('/dashboard/' + event.target.value)
                        }}
                    >
                        { domains.map((domain) => {
                            return (<MenuItem value={domain} key={domain}>{domain}</MenuItem>);
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item lg={2} md={3} xs={6}>

                <FormControl fullWidth variant="filled">
                    <InputLabel id="time-range-label">Time Range</InputLabel>
                    <Select
                        labelId="time-range-label"
                        value={range}
                        label="Time Range"
                        onChange={(event) => { setRange(event.target.value) }}>
                        <MenuItem value='24h'>Last 24 hours</MenuItem>
                        <MenuItem value='7d'>Last 7 days</MenuItem>
                        <MenuItem value='30d'>Last 30 days</MenuItem>
                        <MenuItem value='month-to-date'>Month to Date </MenuItem>
                        <MenuItem value='last-month'>Last Month</MenuItem>
                        <MenuItem value='year-to-date'>Year to Date</MenuItem>
                        <MenuItem value='12m'>Last 12 Months</MenuItem>
                        <MenuItem value='all-time'>All Time</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </>
    );
}
