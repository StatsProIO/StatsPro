import React from 'react';
import GenericURLShortener from "@/Components/GenericURLShortener";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";


export default function ChatGPTURLShortener() {

    const faqBox = (
        <Box style={{borderColor: '#dddddd', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px', backgroundColor: 'white'}} p={6} m={6}>

            <Typography variant="h5" align={'center'}>What is the ChatGPT Link Shortener?</Typography>

            <Typography variant="body1">A ChatGPT link shortener is a tool specifically designed to shorten URLs that lead to ChatGPT pages. This tool takes long, complex ChatGPT URLs and condense them into shorter, more manageable links.</Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>Why use the ChatGPT Link Shortener?</Typography>
            <Typography variant="body1">
                <ul>
                    <li>Space-saving: ChatGPT-generated URLs can sometimes be long, especially if they include session IDs or tracking parameters. Shortening these links can save space, making them easier to share on platforms with character limits like Twitter or messaging apps.</li>
                    <li>Improved readability: Long URLs can look cluttered and may be difficult to read, especially in printed materials or when shared verbally. Shortened links provide a cleaner appearance, making them more visually appealing and easier to remember.</li>
                    <li>Ease of sharing: Shortened links are easier to share, especially in situations where you need to manually enter or type out the URL. This can be particularly useful for sharing ChatGPT-generated content in emails, text messages, or social media posts.</li>
                    <li>Analytics and tracking: This link shorteners offers analytics features that allow you to track metrics such as the number of clicks, geographic location of users, and devices used to access the link. This data can be valuable for understanding your audience and measuring the effectiveness of your ChatGPT interactions.</li>
                    <li>Branding: This link shorteners allows you to customize the shortened link with your own branding or relevant keywords. This can help increase brand recognition and make the link more memorable for your audience.</li>
                </ul>
                Using a link shortener for ChatGPT-generated content can help streamline the sharing process, improve readability, and provide valuable insights into how your audience engages with the content.
            </Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>How can I see metrics such as opens, clicks, devices, and locations of users?</Typography>
            <Typography variant="body1">
                Seeing these metrics is super easy! Simply create an account and then click on the Short Links tab to see metrics for your short links.
            </Typography>
        </Box>
    );

    return (
        <GenericURLShortener serviceTitle={'ChatGPT'} icon={'https://chat.openai.com/'} faqBox={faqBox}/>
    );
}
