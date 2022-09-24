import React from 'react';
import {Typography} from '@mui/material';
import General from "@/Layouts/General";
import DocsLayout from "@/Layouts/DocsLayout";


export default function DocsAbout() {
    return (
        <DocsLayout title={'About'}>
            <Typography variant={'h4'} sx={{py: 1}}>What is Marble Metrics?</Typography>
            <Typography sx={{py: 1}}>Marble Metrics is an open-source, privacy-friendly analytics platform. Marble Metrics provides functionality similar to Google Analytics while being compliant with GDPR, CCPA, and PECR.</Typography>
            <Typography sx={{py: 1}}>Marble Metrics is able to provide the important metrics that you're used to seeing in other analytics platforms without requiring a cookie consent.</Typography>
            <Typography sx={{py: 1}}>Marble Metrics can be self-hosted on your own servers or hosted by the Marble Metrics team in the cloud.</Typography>

            <Typography variant={'h4'} sx={{py: 1}}>Cloud Hosting Fully In Europe</Typography>
            <Typography sx={{py: 1}}>In 2020, the European Court of Justice voided the EU-US Privacy Shield. Under the United State's CLOUD Act and US Foreign Intelligence Surveillance Act, US intelligence agencies could access private data of European citizens that was stored on US servers.</Typography>
            <Typography sx={{py: 1}}>Between 2022 and 2022, a number of decisions are made by various European courts (including Austria, France, and Italy) which bans Google Analytics use. </Typography>
            <Typography sx={{py: 1}}>This is why the cloud hosted version of Marble Metrics only has servers in Europe which are owned by a European company. There are other privacy-friendly analytics companies that claim to keep your data in the EU but route your customer data through US servers. Marble Metrics does not operate this way, all traffic flows directly to our EU servers and stays in the EU. </Typography>

            <Typography variant={'h4'} sx={{py: 1}}>No Cookies & No Fingerprinting</Typography>
            <Typography sx={{py: 1}}>GDPR specifically prohibits tracking users using cookies without explict consent. Some websites try to solve this by asking the user to accept cookies. In order to ensure that you are not required to display a cookie consent banner, Marble Metrics does not use any cookies to track users. </Typography>
            <Typography sx={{py: 1}}>Marble Metrics goes beyond industry-standard protections for user privacy. Other privacy-friendly analytics platforms will hash IP addresses or other user information in a process called "fingerprinting". This fingerprinting is illegal under PECR (the UK’s privacy directive). </Typography>

            <Typography variant={'h4'} sx={{py: 1}}>Lightweight Script</Typography>
            <Typography sx={{py: 1}}>Typical analytics trackers will slow down your website and increase frustration from your users. Marble Metrics is different, Marble Metrics has an ultra-lightweight script that intelligently makes requests. Even your users that might be on slower cellular connections will not have their experience negatively affected.</Typography>

            <Typography variant={'h4'} sx={{py: 1}}>Free Plan For Hobbyists</Typography>
            <Typography sx={{py: 1}}>Whether you're just starting to explore Marble Metrics or you have a small personal project that you'd like to add analytics on, we know that you're going to love Marble Metrics and that's why we'll let you use the Free tier for as long as you want. We offer paid plans for users who have bigger/more sites. The fees we collect from paying customers help us offset the cost of offering the Free tier.</Typography>

        </DocsLayout>
    );
}
