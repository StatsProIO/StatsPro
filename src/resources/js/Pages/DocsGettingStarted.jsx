import React from 'react';
import {Typography} from '@mui/material';
import General from "@/Layouts/General";
import DocsLayout from "@/Layouts/DocsLayout";


export default function DocsGettingStarted() {
    return (
        <DocsLayout title={'Getting Started'}>
            <Typography variant={'h4'} sx={{py: 1}}>1. Create an account</Typography>
            <Typography sx={{py: 1}}>Visit the <a href={'/register'}>Register</a> page to create an account with email and password or login with Google for a faster experience.</Typography>

            <Typography variant={'h4'} sx={{py: 1}}>2. Add a domain</Typography>
            <Typography sx={{py: 1}}>Once your registered, you'll be asked to add your first website domain. Enter in the URL to the website that you'd like to add your tracking to.</Typography>
            <Typography sx={{py: 1}}>For example, if you'd like to track pageviews on test.com, enter in test.com in the box and click "Add Domain".</Typography>
            <img width='70%' src='/images/getting-started-step-2.webp'/>

            <Typography variant={'h4'} sx={{py: 1}}>3. Add the tracking script to your website</Typography>
            <Typography sx={{py: 1}}>This next step will depend on your hosting setup. Take the unique code that's shown to you and copy it into your website portal. Depending on your setup, this could be Wordpress, Shopify, Blogger, Jekyll, or something similar. Basically, the idea is that you'll need ths script to load when someone visits your site.</Typography>
            <img width='70%' src='/images/getting-started-step-3.webp'/>

            <Typography variant={'h4'} sx={{py: 1}}>4. Visit your website</Typography>
            <Typography sx={{py: 1}}>Click on "Start Collecting Data". Now, visit your website like a normal user would. This will trigger a pageview event to be sent to Marble Metrics and make it easy to verify everything is setup correctly.</Typography>

            <Typography variant={'h4'} sx={{py: 1}}>5. Wait for a successful pageview</Typography>
            <Typography sx={{py: 1}}>Now Marble Metrics will be waiting to see a successful pageview event from the script that you installed on your site. It should only take a few moments for the event to show up. If you are stuck on this screen, it could mean that something was incorrectly setup when installing the script. Double check to make sure you've installed it in the right place.</Typography>

            <img width='60%' src='/images/getting-started-step-5.webp'></img>

        </DocsLayout>
    );
}
