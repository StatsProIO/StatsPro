import React from 'react';
import GenericURLShortener from "@/Components/GenericURLShortener";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";


export default function GoogleURLShortener() {

    const faqBox = (
        <Box style={{borderColor: '#dddddd', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px', backgroundColor: 'white'}} p={6} m={6}>

            <Typography variant="h5" align={'center'}>What is the Google Link Shortener?</Typography>

            <Typography variant="body1">A Google link shortener is a tool specifically designed to shorten URLs that lead to Google pages. This tool takes long, complex Google URLs and condense them into shorter, more manageable links.</Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>Why use the Google Link Shortener?</Typography>
            <Typography variant="body1">
                <ul>
                    <li>Space-saving: Long URLs can take up a significant amount of space, especially on platforms with character limits like Twitter or in messaging apps. Shortening these URLs makes them more concise and easier to share.</li>
                    <li>Improved aesthetics: Shortened links are often cleaner and more visually appealing than long URLs, which can look cluttered and unprofessional. This can enhance the overall appearance of your content and make it more engaging for your audience.</li>
                    <li>Tracking and analytics: Some link shorteners offer tracking and analytics features, allowing you to monitor the performance of your links. This includes metrics such as the number of clicks, geographic location of users, and devices used to access the link. This data can be valuable for understanding your audience and optimizing your marketing efforts.</li>
                    <li>Affiliate marketing: If you're promoting products or services as an affiliate, using a link shortener can help cloak your affiliate links, making them appear more natural and increasing the likelihood of clicks. Additionally, some link shorteners offer features specifically tailored for affiliate marketers, such as link rotation or A/B testing.</li>
                    <li>Customization: This link shortener allows you to customize the shortened link with a relevant keyword or branding, which can enhance brand recognition and make the link more memorable for your audience.</li>
                </ul>
                Using a link shortener for Google links can help optimize your marketing efforts, improve user experience, and provide valuable insights into your audience's behavior.
            </Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>How can I see metrics such as opens, clicks, devices, and locations of users?</Typography>
            <Typography variant="body1">
                Seeing these metrics is super easy! Simply create an account and then click on the Short Links tab to see metrics for your short links.
            </Typography>
        </Box>
    );

    return (
        <GenericURLShortener serviceTitle={'Google'} icon={'https://www.google.com/'} faqBox={faqBox}/>
    );
}
