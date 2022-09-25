import React from 'react';
import {Typography} from '@mui/material';
import General from "@/Layouts/General";
import DocsLayout from "@/Layouts/DocsLayout";


export default function AddingADomain() {
    return (
        <DocsLayout title={'Adding A Domain'}>
            <Typography sx={{py: 1}}>This guide explains how to add a new domain to your account after you've already added your first domain. If you're looking for help getting started with your first domain, please see <a href={'/docs/getting-started'}>Getting Started</a>.</Typography>
            <Typography variant={'h4'} sx={{py: 1}}>1. Go to Manage Domains</Typography>
            <Typography sx={{py: 1}}>On the left sidebar, click on Manage Domains. Or you can also just click on <a href={'/manage-domains'}>this link</a>.</Typography>
            <Typography variant={'h4'} sx={{py: 1}}>2. Click on Add Domain</Typography>
            <Typography variant={'h4'} sx={{py: 1}}>3. Fill in the URL</Typography>
            <Typography sx={{py: 1}}>Enter in the URL to the website that you'd like to add your tracking to.</Typography>
            <Typography sx={{py: 1}}>For example, if you'd like to track pageviews on test.com, enter in test.com in the box and click "Add Domain".</Typography>
            <Typography variant={'h4'} sx={{py: 1}}>4. Add the tracking script to your website</Typography>
            <Typography sx={{py: 1}}>This next step will depend on your hosting setup. Take the unique code that's shown to you and copy it into your website portal. Depending on your setup, this could be Wordpress, Shopify, Blogger, Jekyll, or something similar. Basically, the idea is that you'll need ths script to load when someone visits your site.</Typography>
            <img width='70%' src='/images/getting-started-step-3.webp'/>

            <Typography variant={'h4'} sx={{py: 1}}>4. Visit your website</Typography>
            <Typography sx={{py: 1}}>Click on "Start Collecting Data". Now, visit your website like a normal user would. This will trigger a pageview event to be sent to Marble Metrics and make it easy to verify everything is setup correctly.</Typography>

            <Typography variant={'h4'} sx={{py: 1}}>5. Wait for a successful pageview</Typography>
            <Typography sx={{py: 1}}>Now Marble Metrics will be waiting to see a successful pageview event from the script that you installed on your site. It should only take a few moments for the event to show up. Refresh your dashboard and you should see your data flowing into Marble Metrics. If you don't see any data, it could mean that something was incorrectly setup when installing the script. Double check to make sure you've installed it in the right place.</Typography>
        </DocsLayout>
    );
}
