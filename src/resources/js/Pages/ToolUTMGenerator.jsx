import React, {useEffect, useState} from 'react';
import {TextField, Typography} from '@mui/material';
import General from "@/Layouts/General";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import {Link} from "@inertiajs/inertia-react";

export default function ToolUTMGenerator() {

    const [inputValues, setInputValues] = useState({
        url: '',
        campaignSource: '',
        campaignMedium: '',
        campaignName: '',
        campaignTerm: '',
        campaignContent: '',
        campaignId: '',
        sourcePlatform: ''
    });

    const [utmString, setUtmString] = useState('');

    const updateInputValues = (event) => {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
        })
    };

    useEffect(() => {

        try {
            const myUrl = new URL(inputValues.url);

            inputValues.campaignSource ? myUrl.searchParams.append('utm_source', inputValues.campaignSource) : '';
            inputValues.campaignMedium ? myUrl.searchParams.append('utm_medium', inputValues.campaignMedium) : '';
            inputValues.campaignName ? myUrl.searchParams.append('utm_campaign', inputValues.campaignName) : '';
            inputValues.campaignTerm ? myUrl.searchParams.append('utm_term', inputValues.campaignTerm) : '';
            inputValues.campaignContent ? myUrl.searchParams.append('utm_content', inputValues.campaignContent) : '';
            inputValues.campaignId ? myUrl.searchParams.append('utm_id', inputValues.campaignId) : '';
            inputValues.sourcePlatform ? myUrl.searchParams.append('utm_source_platform', inputValues.sourcePlatform) : '';

            setUtmString(myUrl.href);
        } catch (e) {
            setUtmString('');
        }

    }, [inputValues]);

    const theme = useTheme();

    return (
        <General title={'UTM Generator'}>
            <Typography sx={{py: 1}}>Use the form below to generate URLs with UTM tracking parameters. You can use this to generate unique URLs to track performance of your campaigns. Read below on more information about UTM parameters. To validate any UTM URLs you might have, use our  <Link href={route('ToolUTMValidator')}>UTM Validator</Link>!</Typography>
            <TextField
                required
                fullWidth
                label="URL"
                variant="outlined"
                type="url"
                name="url"
                value={inputValues.url}
                onChange={updateInputValues}
                sx={{mt: 2}}
            />

            <TextField
                required
                fullWidth
                label="Campaign Source"
                variant="outlined"
                type="text"
                name="campaignSource"
                value={inputValues.campaignSource}
                onChange={updateInputValues}
                sx={{mt: 2}}
            />

            <TextField
                required
                fullWidth
                label="Campaign Medium"
                variant="outlined"
                type="text"
                name="campaignMedium"
                value={inputValues.campaignMedium}
                onChange={updateInputValues}
                sx={{mt: 2}}
            />

            <TextField
                required
                fullWidth
                label="Campaign Name"
                variant="outlined"
                type="text"
                name="campaignName"
                value={inputValues.campaignName}
                onChange={updateInputValues}
                sx={{mt: 2}}
            />

            <TextField
                fullWidth
                label="Campaign Term"
                variant="outlined"
                type="text"
                name="campaignTerm"
                value={inputValues.campaignTerm}
                onChange={updateInputValues}
                sx={{mt: 2}}
            />

            <TextField
                fullWidth
                label="Campaign Content"
                variant="outlined"
                type="text"
                name="campaignContent"
                value={inputValues.campaignContent}
                onChange={updateInputValues}
                sx={{mt: 2}}
            />

            <TextField
                fullWidth
                label="Campaign ID"
                variant="outlined"
                type="text"
                name="campaignId"
                value={inputValues.campaignId}
                onChange={updateInputValues}
                sx={{mt: 2}}
            />

            <TextField
                fullWidth
                label="Source Platform"
                variant="outlined"
                type="text"
                name="sourcePlatform"
                value={inputValues.sourcePlatform}
                onChange={updateInputValues}
                sx={{mt: 2}}
            />

            <Box sx={{mt: 2}}>
                <Typography variant={'h6'} sx={{py: 1}}>
                    Your UTM URL
                </Typography>
                {utmString !== '' ? (
                        <Paper elevation={2} sx={{p: 3}} style={{outlineColor: theme.palette.success.main, outlineStyle: 'solid', outlineWidth: '3px'}}>
                            <Typography variant={'h5'} color={theme.palette.success.main}>{utmString}</Typography>
                        </Paper>
                    ) :
                    (
                        <Paper elevation={2} sx={{p: 3}} style={{outlineColor: theme.palette.error.dark, outlineStyle: 'solid', outlineWidth: '3px'}}>
                            <Typography variant={'h5'} color={theme.palette.error.dark}>Fill out all required fields above!</Typography>
                        </Paper>
                    )
                }
            </Box>

            <Typography variant={'h4'} sx={{pt: 2}}>What are UTM Parameters?</Typography>
            <Typography sx={{py: 1}}>UTM parameters, short for Urchin Tracking Module parameters, are invaluable tools for digital marketers seeking to track and analyze the effectiveness of their online campaigns. These parameters are tags appended to URLs, enabling marketers to monitor and understand user behavior across various marketing channels with precision.</Typography>
            <Typography sx={{py: 1}}>By incorporating UTM parameters into URLs, marketers can gain insights into which specific elements of their campaigns are driving traffic and conversions. UTM parameters typically consist of five components: source, medium, campaign, term, and content.</Typography>

            <Typography sx={{py: 1}}>By strategically incorporating UTM parameters into URLs, marketers can accurately measure the performance of their marketing efforts across different channels and campaigns. This data can then be analyzed using web analytics tools like Google Analytics to optimize future campaigns, allocate resources effectively, and maximize return on investment (ROI).</Typography>
            <Typography sx={{py: 1}}>In summary, UTM parameters serve as powerful instruments for data-driven decision-making in digital marketing, enabling marketers to track, measure, and optimize their online efforts with precision.</Typography>

            <Typography variant={'h4'} sx={{pt: 2}}>What are the parts of a UTM URL?</Typography>
            <Typography sx={{py: 1}}>The parts of a UTM URL, also known as UTM parameters, include:</Typography>

            <Typography sx={{py: 1}}>
                <ul>
                    <li>Source: This identifies where the traffic is coming from, such as a search engine, social media platform, or referring website.</li>
                    <li>Medium: This indicates the type of channel or medium through which the traffic is generated, such as email, organic search, or paid advertising.</li>
                    <li>Campaign: This denotes the overall marketing campaign or initiative associated with the URL. It helps marketers differentiate between various campaigns running concurrently.</li>
                    <li>Term: This is primarily used for tracking keywords in paid search campaigns. It specifies the search term or keyword that triggered the ad.</li>
                    <li>Content: This allows marketers to differentiate between different elements within the same campaign, such as different ad creatives or variations.</li>
                </ul>
            </Typography>
            <Typography sx={{py: 1}}>These parameters are added to the end of a URL using a question mark (?) followed by the parameter name and value pairs separated by an ampersand (&). For example:</Typography>
            <Typography sx={{py: 1}}>https://example.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=holiday_sale&utm_term=keyword&utm_content=variant1</Typography>

            <Typography variant={'h4'} sx={{pt: 2}}>Does the order of UTM tags matter?</Typography>
            <Typography sx={{py: 1}}>No, the order of UTM tags does not matter. UTM parameters are processed independently by web analytics tools like Google Analytics, regardless of their order in the URL. As long as each parameter is correctly formatted with its respective name and value pair (e.g., utm_source=facebook), the analytics tool will capture and attribute the traffic accordingly.</Typography>

            <Typography variant={'h4'} sx={{pt: 2}}>What should you consider when building UTM codes?</Typography>
            <Typography sx={{py: 1}}>When building UTM codes, it's crucial to consider several factors to ensure accurate tracking and effective campaign analysis:</Typography>
            <Typography sx={{py: 1}}>
                <ul>
                    <li>Consistent Naming Convention: Maintain a consistent naming convention for UTM parameters across all campaigns to facilitate organization and analysis. This includes using standardized names for source, medium, campaign, term, and content.</li>
                    <li>Relevance and Clarity: Choose descriptive and relevant values for each UTM parameter to accurately reflect the source, medium, campaign, etc. Avoid generic or ambiguous terms that could lead to confusion during analysis.</li>
                    <li>Avoid Special Characters: Avoid using special characters such as spaces, ampersands (&), and other symbols in UTM parameter values, as they can cause issues with URL encoding and tracking. Instead, use hyphens (-) or underscores (_) for readability.</li>
                    <li>URL Encoding: Properly encode UTM parameters to ensure they are correctly interpreted by web browsers and analytics tools. Use URL encoding for special characters or reserved characters, such as spaces (%20), ampersands (%26), and equals signs (%3D).</li>
                    <li>Length Limitations: Be mindful of URL length limitations, especially when sharing UTM-tagged links in emails or social media posts. Keep UTM parameters concise while still conveying essential information.</li>
                    <li>Testing and Validation: Test UTM-tagged URLs to ensure they are working correctly and tracking data accurately in your analytics tool. Validate UTM parameter values to avoid errors and inconsistencies.</li>
                    <li>Document and Standardize: Document your UTM tagging strategy and establish standardized guidelines for creating UTM codes within your organization. This helps maintain consistency and coherence across campaigns.</li>
                    <li>Exclude Personal Information: Avoid including personally identifiable information (PII) or sensitive data in UTM parameters, as this can violate privacy regulations and compromise data security.</li>
                </ul>
            </Typography>
            <Typography sx={{py: 1}}>By considering these factors when building UTM codes, you can ensure accurate tracking, consistent analysis, and actionable insights from your marketing campaigns.</Typography>

        </General>
    );
}
