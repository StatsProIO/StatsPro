import React from 'react';
import GenericURLShortener from "@/Components/GenericURLShortener";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";


export default function LinkedInURLShortener() {

    const faqBox = (
        <Box style={{borderColor: '#dddddd', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px', backgroundColor: 'white'}} p={6} m={6}>

            <Typography variant="h5" align={'center'}>What is the LinkedIn Link Shortener?</Typography>

            <Typography variant="body1">A LinkedIn link shortener is a tool specifically designed to shorten URLs that lead to LinkedIn pages. This tool takes long, complex LinkedIn URLs and condense them into shorter, more manageable links.</Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>Why use the LinkedIn Link Shortener?</Typography>
            <Typography variant="body1">
                <ul>
                    <li>Space-saving: Shortened URLs take up less space, allowing you to convey your message more effectively, especially within the character limits of LinkedIn posts and messages.</li>
                    <li>Improved aesthetics: Shortened URLs are visually cleaner and more appealing than long, unwieldy URLs, contributing to a more professional appearance.</li>
                    <li>Ease of sharing: Shortened URLs are easier to copy, paste, and share, both within LinkedIn and on other platforms.</li>
                    <li>Analytics: While LinkedIn's URL shortener doesn't offer detailed analytics, it does provide basic click tracking for the URLs shared on the platform. Users can see how many clicks their shared links have received, providing some insight into engagement.</li>
                </ul>
                Using a link shortener for LinkedIn links can help optimize your marketing efforts, improve user experience, and provide valuable insights into your audience's behavior.
            </Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>How can I see metrics such as opens, clicks, devices, and locations of users?</Typography>
            <Typography variant="body1">
                Seeing these metrics is super easy! Simply create an account and then click on the Short Links tab to see metrics for your short links.
            </Typography>
        </Box>
    );

    return (
        <GenericURLShortener serviceTitle={'LinkedIn'} icon={'https://www.linkedin.com/'} faqBox={faqBox}/>
    );
}
