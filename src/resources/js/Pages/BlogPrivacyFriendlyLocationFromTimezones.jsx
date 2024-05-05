import React, {useEffect} from 'react';
import {Typography, Alert} from '@mui/material';
import BlogLayout from "@/Layouts/BlogLayout";
import Box from "@mui/material/Box";


export default function BlogPrivacyFriendlyLocationFromTimezones() {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://gist.github.com/StatsProIO/b0b7dc30fbc2fc7c0043c17898728cd0.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <BlogLayout title={'Timezone to Location: A privacy-friendly way to get a users country and general region'} date={'April 08, 2024'} category={'Technical'}>
            <img src='/images/timezone-to-location.png' width='100%'/>

            <Typography sx={{py: 1}} variant={'body1'}>A little while back, I came across a StackOverflow post that claimed that you could determine a user's location simply by using the browser-provided timestamp. The idea is that the timestamp contains timezone information that is enough to tell you the country and a big city that's near by. At the time, I didn't have a good use case for such a feature but now I do so I'd like to see how accurate this is and how it compares to more traditional geo-locating techniques.</Typography>

            <Typography sx={{pt: 4}} variant={'h3'}>Background</Typography>
            <Typography sx={{py: 1}} variant={'body1'}>First lets do some quick research to see if this is even viable.</Typography>
            <Typography sx={{py: 1}} variant={'body1'}>One thing to note, timezones are different from UTC offsets. Timezones are geographical regions where people are legally required to observe a standard time. For example, "America/New_York" and "Europe/Paris". There are approximately 418 timezones across the world. Some of these are for historical reasons. For example, for a period of 5 years between 1968 to 1973, Michigan did not observe Daylight Savings Time so there is a America/Detroit timezone. But now Michigan follows DST and so it is now following America/New_York but we still keep the America/Detroit timezone around in case we need to reference datetimes in Detroit between that 5 year period.</Typography>
            <Typography sx={{py: 1}} variant={'body1'}>On the otherhand, a UTC offset is the amount of time that a timezone is offset from UTC. These are usually in 1 hour increments but some places have half-hour or even 15 minute offsets. For example, "UTC-1", "UTC+7", "UTC-9:30". There are about 36 unique UTC offsets utilized across different timezones. These offsets slice the world longitudinally in mostly-equal slices.</Typography>

            <Typography sx={{py: 1}} variant={'body1'}>Here's a map of timezones across the world from Wikimedia.</Typography>

            <img src={"/images/timezone-map.png"} style={{width: '100%'}}/>

            <Typography variant={'subtitle2'}><a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">Source</a></Typography>

            <Typography sx={{py: 1}} variant={'body1'}>Notice that even tiny countries have their own defined timezone. This is looking pretty promising!</Typography>

            <Typography sx={{py: 1}} variant={'body1'}>Timezone to Location is particularly appealing because StatsPro.IO is an analytics tool built with a privacy-first mindset. Knowing users approximate location is a critical part of being able to understand your users. So, a timestamp being able to provide a general idea of where a particular visitor is from without violating their privacy is a really great middle ground to provide to our users.</Typography>

            <Typography sx={{pt: 4}} variant={'h3'}>Experiment</Typography>
            <Typography sx={{py: 1}} variant={'body1'}>To perform experiments, we need a control -- something to tell us how well our experiment performs. One of the most commonly accepted ways of determining a user's location is to take the user's IP address and compare it with a GeoIP database. This database is a list of known IP addresses and the location for each. This is pieced together by companies who get information from ISPs and by tracing the internet and is widely used because it doesn't require any explicit permissions from the user (unlike the browser's Geolocation API) but it is a significant privacy violation as it can provide a fairly accurate location without the users consent. Additionally, GDPR can consider IP address to be personally identifiable information when it's paired with other information, such as addresses. So ideally, we'd like to avoid using the IP address when possible.</Typography>
            <Typography sx={{py: 1}} variant={'body1'}>To determine if Timezone to Location is viable, I implemented a Proof of Concept to collect users timezones and IP addresses on a semi-popular side project of mine. I collected 355 datapoints over 5 days. </Typography>

            <Typography sx={{py: 1}} variant={'body1'}>Here's what I ran in the user's browser collect timezone information</Typography>

            <Box sx={{backgroundColor: '#1d2c56', fontFamily: 'monospace', p: 3, my: 2, color: '#ffffff', borderRadius: '5px'}}>
                Intl.DateTimeFormat().resolvedOptions().timeZone
            </Box>

            <Typography sx={{py: 1}} variant={'body1'}>Now that we have timezones, we need to convert them into countries and cities. We can't simply split on the / character because some timezones don't actually specify the name of the country. Luckily, the iana (Internet Assigned Numbers Association) <a href={"https://www.iana.org/time-zones"}>publishes a list of timezones</a> with 2-character country code that each timezone is used in.</Typography>

            <Typography sx={{py: 1}} variant={'body1'}>Here's a sample of the iana data</Typography>
            <Box sx={{backgroundColor: '#1d2c56', fontFamily: 'monospace', p: 3, my: 2, color: '#ffffff', borderRadius: '5px'}}>
                #code	coordinates	TZ			comments <br/>
                AD	+4230+00131	Europe/Andorra<br/>
                AE	+2518+05518	Asia/Dubai<br/>
                AF	+3431+06912	Asia/Kabul<br/>
                AG	+1703-06148	America/Antigua<br/>
                AI	+1812-06304	America/Anguilla<br/>
                AL	+4120+01950	Europe/Tirane<br/>
                AM	+4011+04430	Asia/Yerevan<br/>
                AO	-0848+01314	Africa/Luanda
            </Box>
            <Typography sx={{py: 1}} variant={'subtitle1'}>You'll notice that this data also includes coordinates for each of the timezones. This will make it easy for us to compare our results to our control.</Typography>

            <Typography sx={{py: 1}} variant={'body1'}>PHP makes this easy for us, here's a one-liner to get the name and latitude and longitude.</Typography>

            <Box sx={{backgroundColor: '#1d2c56', fontFamily: 'monospace', p: 3, my: 2, color: '#ffffff', borderRadius: '5px'}}>
                $location = (new DateTimeZone("Europe/Prague"))->getLocation();<br/>
                echo $location['country_code']; //CZ<br/>
                echo $location['latitude']; //50.08333<br/>
                echo $location['longitude']; //14.43333
            </Box>

            <Typography sx={{py: 1}} variant={'body1'}>Since the iana data doesn't provide the city, we'll use the second part of the timezone string as the city:</Typography>
            <Box sx={{backgroundColor: '#1d2c56', fontFamily: 'monospace', p: 3, my: 2, color: '#ffffff', borderRadius: '5px'}}>
                str_replace("_", " ", explode("/", 'Europe/Prague')[1]); //Prague
            </Box>

            <Typography sx={{py: 1}} variant={'body1'}>Now for the control: IP to location, I ran each of the IP addresses through the MaxMind GeoIP2 database, a free database that is commonly used get let latitude/longitude of IP addresses.</Typography>

            <Box sx={{backgroundColor: '#1d2c56', fontFamily: 'monospace', p: 3, my: 2, color: '#ffffff', borderRadius: '5px'}}>
                $dbReader = new Reader('/var/www/GeoLite2-City.mmdb');<br/>
                $record = $dbReader->city($ip);<br/>
                $record->country->isoCode<br/>
                $record->location->latitude<br/>
                $record->location->longitude
            </Box>

            <Typography sx={{py: 1}} variant={'body1'}>Now to compare the 2 sources, we'll check if the country matches, if the city matches, and compare distance between the latitude/longitude pairs.</Typography>

            <Typography sx={{pt: 4}} variant={'h3'}>Results</Typography>

            <Typography sx={{py: 1}} variant={'body1'}>In the map below  you can see the results visually. Lines are drawn between the control lat/long (IP to Location) to our experiment lat/long. You can see the US has 3 main timezones so users who fall within those all point to either Los Angeles, Chicago, or New York.</Typography>

            <iframe
                className="render-viewer "
                src="https://viewscreen.githubusercontent.com/view/geojson?bypass_fastly=true&amp;color_mode=auto&amp;commit=e3c9e34370a995e30324221ca9fb845d53a4b929&amp;docs_host=https%3A%2F%2Fdocs.github.com&amp;enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f676973742f537461747350726f494f2f62306237646333306662633266633763303034336331373839383732386364302f7261772f653363396533343337306139393565333033323432323163613966623834356435336134623932392f74696d657a6f6e652d746f2d69702e67656f6a736f6e&amp;logged_in=false&amp;nwo=StatsProIO%2Fb0b7dc30fbc2fc7c0043c17898728cd0&amp;path=timezone-to-ip.geojson&amp;repository_id=129721734&amp;repository_type=Gist#026d288b-8767-4bdf-a4c8-1e01a35dd08b"
                sandbox="allow-scripts allow-same-origin allow-top-navigation"
                title="File display"
                name="026d288b-8767-4bdf-a4c8-1e01a35dd08b"
                style={{width: '100%', height: '450px'}}
            >
                Viewer requires iframe.
            </iframe>

            <Typography sx={{py: 1}} variant={'body1'}>The visualization shows that most lat/longs are pretty close to their IP to Location lat/long but there are outliers which are in entirely different continents.</Typography>

            <Typography variant={'h6'}>Users Analyzed: 355</Typography>
            <Typography variant={'h6'}>Unique Countries Analyzed: 35</Typography>
            <Typography variant={'h6'}>Correct country identification: 95.7%</Typography>
            <Typography variant={'h6'}>Correct city identification: 14.5%</Typography>
            <Typography variant={'h6'}>Average distance to control: 532 miles</Typography>

            <Typography sx={{py: 1}} variant={'body1'}>From the results, its clear that Timezone to Location is very accurate at identifying a user's country but not very accurate at identifying their city. So, if you have a use case that requires a users country and not their city (like we at StatsPro do), consider using Timezone to Location as a privacy-friendly alternative to IP to Location.</Typography>


            <Box sx={{backgroundColor: '#d8e8ff', fontFamily: 'monospace', p: 3, my: 4, borderRadius: '5px'}}>
                <Typography sx={{pt: 1}} variant={'h3'}>tl;dr</Typography>
                <Typography sx={{py: 1}} variant={'body1'}>
                    <ul>
                        <li>IP to Location is a commonly used method of determining a user's location using a users IP address.</li>
                        <li>Timezone to Location is a way of approximating a user's location based on their timezone. This doesn't use a user's IP address and is more privacy friendly.</li>
                        <li>In my testing, Timezone to Location is very accurate at determining the country of a user: 95% accurate compared to IP to location.</li>
                        <li>Timezone to Location is not very accurate at identifying the city: 14.5% accurate compared to IP to Location.</li>
                        <li>Depending on your use case, Timezone to Location could be a good privacy-respecting alternative to IP to Location (we're using it on StatsPro.io!)</li>
                    </ul>
                </Typography>
            </Box>

        </BlogLayout>
    );
}
