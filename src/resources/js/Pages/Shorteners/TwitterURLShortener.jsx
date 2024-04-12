import React from 'react';
import GenericURLShortener from "@/Components/GenericURLShortener";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";


export default function TwitterURLShortener() {

    const faqBox = (
        <Box style={{borderColor: '#dddddd', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px', backgroundColor: 'white'}} p={6} m={6}>

            <Typography variant="h5" align={'center'}>What is the Twitter Link Shortener?</Typography>

            <Typography variant="body1">This Twitter link shortener is a tool specifically designed to shorten URLs that lead to Twitter pages or are used on Twitter. This tool takes long, complex Twitter URLs and condense them into shorter, more manageable links.</Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>Why use the Twitter Link Shortener?</Typography>
            <Typography variant="body1">
                <ul>
                    <li>Space-saving: Shortened links take up less space, which can be especially useful for platforms with character limits like Twitter or SMS.</li>
                    <li>Improved aesthetics: Long, unwieldy URLs can look messy and unprofessional. Shortened links provide a cleaner appearance, which may increase click-through rates.</li>
                    <li>Trackability: This link shorteners offers analytics features that allow you to track metrics such as the number of clicks, geographic location of users, and devices used to access the link. This data can be valuable for understanding your audience and optimizing your marketing efforts.</li>
                    <li>Customization: This link shorteners allows you to customize the shortened link with a relevant keyword or branding, which can enhance brand recognition and make the link more memorable.</li>
                    <li>Affiliate marketing: If you're a Twitter affiliate, using a link shortener can help cloak your affiliate links, making them look more natural and increasing the likelihood of clicks. Additionally, some link shorteners offer features specifically tailored for affiliate marketers, such as link rotation or A/B testing.</li>
                    <li>Prevention of link manipulation: Shortened links can help prevent users from manipulating or tampering with the URL parameters, which could potentially lead to security risks or unauthorized access to sensitive information.</li>
                </ul>
                Using a link shortener for Twitter links can help optimize your marketing efforts, improve user experience, and provide valuable insights into your audience's behavior.
            </Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>How can I see metrics such as opens, clicks, devices, and locations of users?</Typography>
            <Typography variant="body1">
                Seeing these metrics is super easy! Simply create an account and then click on the Short Links tab to see metrics for your short links.
            </Typography>
        </Box>
    );

    return (
        <GenericURLShortener serviceTitle={'Twitter'} icon={'https://twitter.com/'} faqBox={faqBox}/>
    );
}
