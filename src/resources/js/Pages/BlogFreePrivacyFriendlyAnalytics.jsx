import React from 'react';
import {Typography} from '@mui/material';
import BlogLayout from "@/Layouts/BlogLayout";


export default function BlogFreePrivacyFriendlyAnalytics() {
    return (
        <BlogLayout title={'Free Privacy Friendly Analytics'}>
            <img src='/images/sample-dashboard.webp' width='100%' style={{paddingTop: '15px', paddingBottom: '15px'}}/>
            <Typography sx={{py: 1}}>

                Most people are aware that websites may collect information about them when they visit. This data is then used for a variety of purposes, e.g. for targeted advertising or simply to improve the user experience on the website. However, many people are unaware that this data collection may also include sensitive information such as IP address or location which can be used to track your online activities or even your physical location. <br/><br/>

                Fortunately, there are ethical ways to keep your user's data private while still being able to capture information about your website visitors for free. One option is to use a privacy-friendly analytics service like Marble Metrics. <br/><br/>

                Marble Metrics is open-source software that you can add to your website and only collects the bare minimum to track core website metrics without invading your user's privacy. Best of all Marble Metrics is free to use for up to 5000 events! This means if you have a small or medium website, you can use Marble Metrics for free for as long as you'd like. All users of Marble Metrics enjoy the same privacy protections. Paid plans are available for larger websites with more traffic. <br/><br/>


                So there you have it: By using a privacy-friendly analytics service, you can help protect your users' privacy and keep their data safe.
            </Typography>

            <Typography variant="h4" sx={{py: 1}}>What are privacy-friendly analytics?</Typography>

            <Typography sx={{py: 1}}>
                When it comes to website analytics, there are many different options, each with its own set of features and pricing structure. Not all are privacy-friendly. In fact some of them can be quite intrusive. <br/><br/>

                So what are privacy-friendly analytics?<br/><br/>

                In short, privacy-friendly analytics are those who respect your privacy. They collect the minimum amount of data necessary to provide you with the information you need and do not share your data with third parties. <br/><br/>

                There are a few different companies that offer privacy-friendly analytics, but our recommendation is Marble Metrics. Marble Metrics is an open-source analytics platform that is built from the ground up to be privacy friendly. It does not collect any personally identifiable information and does not track you across the web. In fact, Marble Metrics is willing to stand by its claim by <a href={'https://github.com/MarbleMetrics/MarbleMetrics'}>open-sourcing all of the code</a> used to run the site. You can take a look to see exactly what data is being collected without even installing the code on your site.<br/><br/>
            </Typography>

            <Typography variant="h4" sx={{py: 1}}>How can it be free?</Typography>

            <Typography sx={{py: 1}}>
                There's no such thing as a free lunch, is there? So how can something be free? Marble Metrics has different tiers of subscription plans. The higher plans require a monthly fee but are only needed if you have many websites with large amounts of traffic. We know that smaller websites usually don't have any income to justify paying for them. That's why we decided to offer a free plan for small and medium websites. The money that's made from the higher plans is used to provide this service for free.<br/><br/>

                In fact if you'd just like to see how Marble Metrics works on your site, just sign up for an account and <a href={"/register"}>get started for free</a>, without a credit card. Check it out and let us know what you think!

            </Typography>
        </BlogLayout>

    );
}
