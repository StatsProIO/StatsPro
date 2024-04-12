import React from 'react';
import GenericURLShortener from "@/Components/GenericURLShortener";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";


export default function MainURLShortener() {

    const faqBox = (
        <Box style={{borderColor: '#dddddd', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px', backgroundColor: 'white'}} p={6} m={6}>

            <Typography variant="h5" align={'center'}>What is a Link Shortener?</Typography>

            <Typography variant="body1">A link shortener is a tool that takes a long URL (Uniform Resource Locator, aka link, aka hyperlink) and generates a shorter, more manageable version of it. The shortened link redirects users to the original, longer URL when clicked.</Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>Why use this Link Shortener?</Typography>
            <Typography variant="body1">
                <ul>
                    <li>Space-saving: Long URLs can be cumbersome and take up a lot of space, especially in contexts with character limits, such as social media posts, text messages, or printed materials. Shortened links help conserve space and make content more concise.</li>
                    <li>Improved aesthetics: Shortened links are cleaner and more visually appealing compared to long URLs, which can contain random strings of characters and numbers.</li>
                    <li>Ease of sharing: Shortened links are easier to share, copy, and remember, making them more convenient for users to distribute across various platforms and communication channels.</li>
                    <li>Tracking: Some link shorteners offer analytics and tracking features, allowing users to monitor the performance of their shortened links. This includes metrics such as the number of clicks, geographic location of users, and devices used to access the link.</li>
                </ul>
                Using a link shortener can help optimize your marketing efforts, improve user experience, and provide valuable insights into your audience's behavior.
            </Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>How can I see metrics such as opens, clicks, devices, and locations of users?</Typography>
            <Typography variant="body1">
                Seeing these metrics is super easy! Simply create an account and then click on the Short Links tab to see metrics for your short links.
            </Typography>
        </Box>
    );

    return (
        <GenericURLShortener serviceTitle={''} icon={'https://statspro.io/'} faqBox={faqBox}/>
    );
}
