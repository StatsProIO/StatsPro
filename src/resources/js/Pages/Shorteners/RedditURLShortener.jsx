import React from 'react';
import GenericURLShortener from "@/Components/GenericURLShortener";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";


export default function RedditURLShortener() {

    const faqBox = (
        <Box style={{borderColor: '#dddddd', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px', backgroundColor: 'white'}} p={6} m={6}>

            <Typography variant="h5" align={'center'}>What is the Reddit Link Shortener?</Typography>

            <Typography variant="body1">An Reddit link shortener is a tool specifically designed to shorten URLs that lead to Reddit pages. This tool takes long, complex Reddit URLs and condense them into shorter, more manageable links.</Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>Why use the Reddit Link Shortener?</Typography>
            <Typography variant="body1">
                <ul>
                    <li>Space-saving: Long URLs can take up a lot of space especially in Reddit posts or comments, especially since Reddit has a character limit for each submission. URL shortening helps conserve space and allows users to share links more efficiently.</li>
                    <li>Improved aesthetics: Shortened URLs are cleaner and visually more appealing compared to long, unwieldy URLs. They make Reddit posts and comments look neater and easier to read.</li>
                    <li>Ease of sharing: Shortened URLs are easier to copy, paste, and share, both within Reddit and on other platforms.</li>
                    <li>Redirection: Reddit's shortened URLs redirect users to the original, longer URLs when clicked, ensuring that the content is accessible without any loss of information.</li>
                </ul>
                Using a link shortener for Reddit links can help optimize your marketing efforts, improve user experience, and provide valuable insights into your audience's behavior.
            </Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>How can I see metrics such as opens, clicks, devices, and locations of users?</Typography>
            <Typography variant="body1">
                Seeing these metrics is super easy! Simply create an account and then click on the Short Links tab to see metrics for your short links.
            </Typography>
        </Box>
    );

    return (
        <GenericURLShortener serviceTitle={'Reddit'} icon={'https://reddit.com'} faqBox={faqBox}/>
    );
}
