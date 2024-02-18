import React from 'react';
import {Typography} from '@mui/material';
import DocsLayout from "@/Layouts/DocsLayout";


export default function DocsFrequentlyAskedQuestions() {
    return (
        <DocsLayout title={'Frequently Asked Questions (FAQ)'}>
            <Typography variant={'h4'} sx={{py: 1}}>Is StatsPro GDPR, PECR, CCPA Compliant?</Typography>
            <Typography sx={{py: 1}}>Yes, StatsPro does not collect any personally identifiable information. StatsPro does not fingerprint users. All information that StatsPro collects is anonymous and aggregated. None of the data can be used to identify users.</Typography>

            <Typography variant={'h4'} sx={{py: 1}}>Do I have to include a cookie notice when using StatsPro?</Typography>
            <Typography sx={{py: 1}}>No, StatsPro does not use any cookies to track users so no cookie consent is required.</Typography>

            <Typography variant={'h4'} sx={{py: 1}}>Is StatsPro safe to use?</Typography>
            <Typography sx={{py: 1}}>Yes, StatsPro is a very small and lightweight analytics tool. We only capture essential information from your users with as small of a footprint as possible.</Typography>

            <Typography variant={'h4'} sx={{py: 1}}>Where is StatsPro hosted?</Typography>
            <Typography sx={{py: 1}}>In order to ensure full compliance with the Schrems II ruling, StatsPro servers are located in France and backups are located in France and Germany. We host our service using <a href={'https://www.stackhero.io/'} target="_blank">Stackhero</a>, a European company. Some other "privacy-friendly" analytics services claim to be compliant but still pass your data through servers in the United States. This is not the case with StatsPro. No data is stored or passed through American servers.</Typography>

            <Typography variant={'h4'} sx={{py: 1}}>How can I trust the information here to be accurate?</Typography>
            <Typography sx={{py: 1}}>StatsPro is fully open source. 100% of the code can be seen <a href={'https://github.com/statsProIO/StatsPro/'} target='_blank'>here</a> and verified by you or anyone else. If you're interested in digging in, you can see the code for the Broadcaster <a href={'https://github.com/statsProIO/StatsPro//blob/prod/src/public/js/broadcaster.js'} target="_blank">here</a> and the code for the Event collector <a href={'https://github.com/statsProIO/StatsPro//blob/prod/src/app/Http/Controllers/EventsController.php'} target="_blank">here</a>.</Typography>

            <Typography variant={'h4'} sx={{py: 1}}>Where can I get support for StatsPro?</Typography>
            <Typography sx={{py: 1}}>We are happy to help you with any issues you have with StatsPro. You can contact us directly on the <a href={'/contact'}>Contact page</a>. We'll respond to your message within 24 hours.</Typography>

            <Typography variant={'h4'} sx={{py: 1}}>Can I request a new feature?</Typography>
            <Typography sx={{py: 1}}>Of course! We love hearing suggestions from the community. Submit your idea on the <a href={'/contact'}>Contact page</a></Typography>

            <Typography variant={'h4'} sx={{py: 1}}>Will the StatsPro script slow down my site?</Typography>
            <Typography sx={{py: 1}}>No, we have optimized the script to be as small as possible and its usage will not affect your users.</Typography>

            <Typography variant={'h4'} sx={{py: 1}}>How does StatsPro make money? Will my data be sold?</Typography>
            <Typography sx={{py: 1}}>Your data is never sold and belongs to only you. StatsPro makes money by charging larger sites to use our service. We are not in the business of selling data.</Typography>

            <Typography variant={'h4'} sx={{py: 1}}>Is there a free plan?</Typography>
            <Typography sx={{py: 1}}>Yes, you can use StatsPro for free forever on our Free plan. This plan is best for hobbyists and users with small websites. If you exceed the limits of the free plan, we do ask that you move to a paid plan. This helps support StatsPro and lets us keep the Free plan available to smaller websites.</Typography>

        </DocsLayout>
    );
}
