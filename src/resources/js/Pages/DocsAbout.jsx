import React from 'react';
import {Paper, Typography} from '@mui/material';
import DocsLayout from "@/Layouts/DocsLayout";


export default function DocsAbout() {
    return (
        <DocsLayout title={'About'}>
            <Paper elevation={0} sx={{ p: 2 }}>
                <Typography variant={'h4'} sx={{py: 1}}>What is StatsPro?</Typography>
                <Typography sx={{py: 1}}>StatsPro is an open-source, privacy-friendly analytics platform. You can think of StatsPro as a more powerful version of Google Analytics that's also privacy-friendly and complies with GDPR, CCPA, and PECR.</Typography>
                <Typography sx={{pt: 1}}>With StatsPro, you can see</Typography>
                <ul>
                    <li><Typography sx={{pb: 1}}>Realtime visitors metrics</Typography></li>
                    <li><Typography sx={{pb: 1}}>Pageview counts</Typography></li>
                    <li><Typography sx={{pb: 1}}>Session counts</Typography></li>
                    <li><Typography sx={{pb: 1}}>Bounce rate</Typography></li>
                    <li><Typography sx={{pb: 1}}>Visit duration - time on page</Typography></li>
                    <li><Typography sx={{pb: 1}}>Sources - where users are coming from</Typography></li>
                    <li><Typography sx={{pb: 1}}>UTM tags</Typography></li>
                    <li><Typography sx={{pb: 1}}>Devices - if the device is a desktop/laptop/mobile, it's operating system, and browser</Typography></li>
                    <li><Typography sx={{pb: 1}}>Locations - where your users are from</Typography></li>
                    <li><Typography sx={{pb: 1}}>Languages - what language your users use</Typography></li>
                    <li><Typography sx={{pb: 1}}>Time trends - popular day and times of day for your website</Typography></li>
                    <li><Typography sx={{pb: 1}}>Sessions - follow the pages your visitors went through</Typography></li>
                    <li><Typography sx={{pb: 1}}>Performance - page speed time for your users</Typography></li>
                </ul>
                <Typography sx={{py: 1}}>StatsPro is able to provide the important metrics that you're used to seeing in other analytics platforms without requiring a cookie consent.</Typography>
                <Typography sx={{py: 1}}>StatsPro can be self-hosted on your own servers or hosted by the StatsPro team in the cloud.</Typography>

                <Typography variant={'h4'} sx={{py: 1}}>Cloud Hosting Fully In Europe</Typography>
                <Typography sx={{py: 1}}>In 2020, the European Court of Justice voided the EU-US Privacy Shield. Under the United States' CLOUD Act and US Foreign Intelligence Surveillance Act, US intelligence agencies could access private data of European citizens that was stored on US servers.</Typography>
                <Typography sx={{py: 1}}>Between 2022 and 2022, a number of decisions are made by various European courts (including Austria, France, and Italy) which bans Google Analytics use. </Typography>
                <Typography sx={{py: 1}}>This is why the cloud hosted version of StatsPro only has servers in Europe which are owned by a European company. There are other privacy-friendly analytics companies that claim to keep your data in the EU but route your customer data through US servers. StatsPro does not operate this way, all traffic flows directly to our EU servers and stays in the EU. </Typography>

                <Typography variant={'h4'} sx={{py: 1}}>No Cookies</Typography>
                <Typography sx={{py: 1}}>GDPR specifically prohibits tracking users using cookies without explicit consent. Some websites try to solve this by asking the user to accept cookies. In order to ensure that you are not required to display a cookie consent banner, StatsPro does not use any cookies to track users. </Typography>
                <Typography sx={{py: 1}}>StatsPro creates a privacy-friendly hash which securely obfuscates user's IP addresses or other browser information. Users cannot be uniquely identified using this hash. This ensures that you can still see user data without violating privacy.</Typography>

                <Typography variant={'h4'} sx={{py: 1}}>Lightweight Script</Typography>
                <Typography sx={{py: 1}}>Typical analytics trackers will slow down your website and increase frustration from your users. StatsPro is different, StatsPro has an ultra-lightweight script that intelligently makes requests. Even your users that might be on slower cellular connections will not have their experience negatively affected.</Typography>

                <Typography variant={'h4'} sx={{py: 1}}>Free Plan For Hobbyists</Typography>
                <Typography sx={{py: 1}}>Whether you're just starting to explore StatsPro or you have a small personal project that you'd like to add analytics on, we know that you're going to love StatsPro and that's why we'll let you use the Free tier for as long as you want. We offer paid plans for users who have bigger/more sites. The fees we collect from paying customers help us offset the cost of offering the Free tier.</Typography>
            </Paper>

        </DocsLayout>
    );
}
