import React from 'react';
import {Typography} from '@mui/material';
import BlogLayout from "@/Layouts/BlogLayout";


export default function BlogTopFiveAnalyticsAlternatives() {
    return (
        <BlogLayout title={'Top 5 Privacy-Based Google Analytics Alternatives for 2022'}>
            <img src='/images/alternative.webp' width='100%' style={{paddingTop: '15px', paddingBottom: '15px'}}/>
            <Typography sx={{py: 1}}>
            It's no secret that Google Analytics is the most used web analytics tool out there in the world. But there is increasing pressure to avoid Google Analytics on your website, especially now that multiple European countries have declared Google Analytics as illegal. In this blog post, we take a look at the 5 Best Privacy-Based Google Analytics Alternatives for 2022.
            </Typography>
            <Typography variant="h4" sx={{py: 1}}>1. Marble Metrics</Typography>
            <Typography sx={{py: 1}}>
                If you're looking for an alternative to Google Analytics that puts privacy first, Marble Metrics is definitely worth considering.
                Marble Metrics has all of the features that other privacy-friendly analytics have, plus it's open-source and can be self-hosted. Marble Metrics offers a range of features including detailed visitor logs, real-time analytics, and e-commerce tracking.
                In addition, Marble Metrics is fully GDPR compliant and offers a variety of options for data protection. Additionally, Marble Metrics does not fingerprint users, something that not all privacy-friendly analytics providers are willing to do.
            </Typography>
            <Typography variant="h4" sx={{py: 1}}>2. Fathom Analytics</Typography>
            <Typography sx={{py: 1}}>
                Fathom Analytics is another popular Google Analytics alternative that puts privacy first.
                This platform is used by many websites and offers features such as website speed tracking, conversion tracking and detailed visitor reporting.
                Fathom Analytics is also GDPR - compliant and offers the possibility to anonymize IP addresses. Unfortunately, Fathom uses fingerprinting to track your users (this is illegal according to the UK's privacy directive), and also Fathom isn't open source.
            </Typography>
            <Typography variant="h4" sx={{py: 1}}>3. Simple Analytics</Typography>
            <Typography sx={{py: 1}}>
                Simple Analytics is a relatively new entrant to the web analytics space, but it's already making waves with its Privacy First approach.
                This platform is used by many websites and offers features such as detailed visitor reports, page views and bounce rate tracking.
                Simple Analytics is GDPR compliant and offers the ability to Anonymize IP addresses. Unfortunately, Simple Analytics isn't open source and it cannot be self-hosted.
            </Typography>
            <Typography variant="h4" sx={{py: 1}}>4. Plausible</Typography>
            <Typography sx={{py: 1}}>
                GoSquared is another popular web analytics platform that offers a variety of features such as detailed visitor reporting, real-time analytics, and e-commerce tracking. Plausible is used by many websites worldwide and is GDPR compliant.
                In addition, Plausible offers the possibility to anonymize IP addresses and gives website owners the ability to object to data collection altogether. Unfortunately, Plausible uses fingerprinting to track your users (this is illegal according to the UK's privacy directive) and also collects your user's IP addresses.
            </Typography>
            <Typography variant="h4" sx={{py: 1}}>5. Clicky</Typography>
            <Typography sx={{py: 1}}>
                Clicky is a web analytics platform that has been around for a long time. It is used by many websites and offers features such as detailed visitor reports, real-time analytics, and heat maps.
                Clicky is GDPR compliant and offers the option of IP addresses to anonymize. Additionally, Clicky offers website owners the option to opt-out of data collection altogether. Unfortunately, Clicky's UI is a bit dated and does not have a modern feel that you would expect out of a modern privacy-first analytics system.
            </Typography>

            <Typography sx={{py: 1}}>
                So there you have it, the 5 best alternatives to Google Analytics based of data protection.<br/><br/>
                EU data protection laws are among the most complete and transcendent in the world. They are designed to protect internet users' privacy and give them control over their personal information. If you are a company with domestic or EU customers, that's it important to comply with EU data protection laws. Failure to comply can result in severe penalties, including fines of up to €20 million or 4% of a company's annual worldwide turnover, whichever is greater. If you are looking for a platform that puts privacy first and complies with the law any of the platforms above would be a great option for you.

            </Typography>

        </BlogLayout>

    );
}
