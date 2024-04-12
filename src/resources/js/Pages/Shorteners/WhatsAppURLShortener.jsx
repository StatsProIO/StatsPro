import React from 'react';
import GenericURLShortener from "@/Components/GenericURLShortener";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";


export default function WhatsAppURLShortener() {

    const faqBox = (
        <Box style={{borderColor: '#dddddd', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px', backgroundColor: 'white'}} p={6} m={6}>

            <Typography variant="h5" align={'center'}>What is the WhatsApp Link Shortener?</Typography>

            <Typography variant="body1">An WhatsApp link shortener is a tool specifically designed to shorten URLs that are sent on WhatsApp. This tool takes long, complex URLs and condense them into shorter, more manageable links. This makes it easier to share on WhatApp.</Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>Why use the WhatsApp Link Shortener?</Typography>
            <Typography variant="body1">
                <ul>
                    <li>Space-saving: Shortened URLs take up less space in the chat interface, allowing users to share links more efficiently, especially since WhatsApp has a character limit for each message.</li>
                    <li>Improved aesthetics: Shortened URLs are visually cleaner and more appealing than long, unwieldy URLs, making the conversation look neater and easier to read.</li>
                    <li>Ease of sharing: Shortened URLs are easier to copy, paste, and share within WhatsApp conversations, making it more convenient for users to exchange links.</li>
                </ul>
                Using a link shortener for WhatsApp links can help optimize your marketing efforts, improve user experience, and provide valuable insights into your audience's behavior.
            </Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>How can I see metrics such as opens, clicks, devices, and locations of users?</Typography>
            <Typography variant="body1">
                Seeing these metrics is super easy! Simply create an account and then click on the Short Links tab to see metrics for your short links.
            </Typography>
        </Box>
    );

    return (
        <GenericURLShortener serviceTitle={'WhatsApp'} icon={'https://www.whatsapp.com/'} faqBox={faqBox}/>
    );
}
