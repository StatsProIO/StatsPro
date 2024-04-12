import React from 'react';
import GenericURLShortener from "@/Components/GenericURLShortener";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";


export default function SpotifyURLShortener() {

    const faqBox = (
        <Box style={{borderColor: '#dddddd', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px', backgroundColor: 'white'}} p={6} m={6}>

            <Typography variant="h5" align={'center'}>What is the Spotify Link Shortener?</Typography>

            <Typography variant="body1">The Spotify link shortener is a tool specifically designed to shorten URLs that lead to Spotify pages. This tool takes long, complex Spotify URLs and condense them into shorter, more manageable links. This makes it easy to share links to albums, songs, and playlists.</Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>Why use the Spotify Link Shortener?</Typography>
            <Typography variant="body1">
                <ul>
                    <li>Space-saving: Spotify URLs, especially those for specific tracks, albums, or playlists, can be long and contain multiple parameters. Shortening these URLs can help save space, making them more suitable for platforms with character limits like Twitter or messaging apps.</li>
                    <li>Improved aesthetics: Long URLs can look cluttered and may detract from the overall appearance of a post or message. Shortened URLs are cleaner and more visually appealing, enhancing the presentation of your content.</li>
                    <li>Ease of sharing: Shortened URLs are easier to copy, paste, and share, both within messaging apps and on social media platforms. They reduce the likelihood of URL truncation or breaking across multiple lines, ensuring that the link remains intact and clickable.</li>
                    <li>Tracking: Some URL shorteners offer tracking and analytics features, allowing you to monitor the performance of your Spotify links. This includes metrics such as the number of clicks, geographic location of users, and devices used to access the link. Tracking data can help you understand your audience's behavior and preferences.</li>
                    <li>Branding: Certain URL shorteners allow you to customize the shortened link with your own branding or relevant keywords. This can help increase brand recognition and make the link more memorable for your audience.</li>
                </ul>
                Using a link shortener for Spotify links can help optimize your marketing efforts, improve user experience, and provide valuable insights into your audience's behavior.
            </Typography>

            <Typography variant="h5" align={'center'} sx={{pt: 2}}>How can I see metrics such as opens, clicks, devices, and locations of users?</Typography>
            <Typography variant="body1">
                Seeing these metrics is super easy! Simply create an account and then click on the Short Links tab to see metrics for your short links.
            </Typography>
        </Box>
    );

    return (
        <GenericURLShortener serviceTitle={'Spotify'} icon={'https://spotify.com/'} faqBox={faqBox}/>
    );
}
