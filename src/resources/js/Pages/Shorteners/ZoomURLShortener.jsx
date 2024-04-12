import React from 'react';
import GenericURLShortener from "@/Components/GenericURLShortener";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";


export default function ZoomURLShortener() {

    const faqBox = (
        <Box style={{borderColor: '#dddddd', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px', backgroundColor: 'white'}} p={6} m={6}>

            <Typography variant="h5" align={'center'}>What is the Zoom Link Shortener?</Typography>

            <Typography variant="body1">This Zoom link shortener is a tool specifically designed to shorten URLs that lead to Zoom meetings or want to be posted in Zoom chat. This tool takes long, complex URLs and condense them into shorter, more manageable links. This makes them easier to share and also makes it so that long urls can be posted in Zoom chat which has a character limit. </Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>Why use the Zoom Link Shortener?</Typography>
            <Typography variant="body1">
                <ul>
                    <li>Ease of Sharing: Zoom meeting URLs can often be long and complex, especially if they include unique meeting IDs and passwords. Shortening these URLs makes them easier to share via email, messaging apps, or on social media platforms.</li>
                    <li>Improved Aesthetics: Long URLs can look cluttered and unprofessional, particularly in written communications or on social media posts. Shortened URLs are cleaner and more visually appealing, enhancing the overall presentation of your message.</li>
                    <li>Space-saving: Platforms like Twitter have character limits for each post, so using a shortened URL can help conserve space for your message content, while still providing a clickable link to the Zoom meeting.</li>
                    <li>Ease of Typing: Shortened URLs are easier to type, especially on mobile devices, where typing long URLs can be cumbersome and prone to errors.</li>
                    <li>Analytics: This link shortener offers tracking and analytics features, allowing you to monitor the performance of your Zoom meeting links. This includes metrics such as the number of clicks, geographic location of users, and devices used to access the link, which can help you gauge the effectiveness of your meeting invitations.</li>
                </ul>
                Using a Zoom link shortener can streamline the process of sharing meeting invitations, improve the user experience, and provide valuable insights into the engagement with your meetings.
            </Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>How can I see metrics such as opens, clicks, devices, and locations of users?</Typography>
            <Typography variant="body1">
                Seeing these metrics is super easy! Simply create an account and then click on the Short Links tab to see metrics for your short links.
            </Typography>
        </Box>
    );

    return (
        <GenericURLShortener serviceTitle={'Zoom'} icon={'https://zoom.us/'} faqBox={faqBox}/>
    );
}
