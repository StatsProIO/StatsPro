import React, {useEffect, useState} from 'react';
import {TextField, Typography} from '@mui/material';
import General from "@/Layouts/General";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import * as Yup from 'yup';
import {Link} from "@inertiajs/inertia-react";


export default function ToolUTMGenerator() {

    const [inputUrl, setInputUrl] = useState('');
    const [errors, setErrors] = useState('');
    const [parsedValues, setParsedValues] = useState({});

    const updateInputUrl = (event) => {
        setInputUrl(event.target.value);
    };

    const theme = useTheme();

    let utmSchema = Yup.object().shape({
        campaignSource: Yup.string().required('utm_source is required in the URL.'),
        campaignMedium: Yup.string().required('utm_medium is required in the URL.'),
        campaignName: Yup.string().required('utm_campaign is required in the URL.'),
    });

    useEffect(async () => {

        try {
            let url;
            try {
                 url = new URL(inputUrl);
            } catch (urlError) {
                setParsedValues({});
                setErrors('Invalid URL');
                return;
            }

            await utmSchema.validate(
                {
                    campaignSource: url.searchParams.get('utm_source'),
                    campaignMedium: url.searchParams.get('utm_medium'),
                    campaignName: url.searchParams.get('utm_campaign'),
                },
                { strict: true },
            );

            setParsedValues({
                'Campaign Source': url.searchParams.get('utm_source'),
                'Campaign Medium': url.searchParams.get('utm_medium'),
                'Campaign Name': url.searchParams.get('utm_campaign'),
                'Campaign Term': url.searchParams.get('utm_term'),
                'Campaign Content': url.searchParams.get('utm_content'),
                'Campaign Id': url.searchParams.get('utm_id'),
                'Source Platform': url.searchParams.get('utm_source_platform')
            });
            console.log(parsedValues);
            setErrors('')

        } catch (e) {
            setErrors('Invalid: ' + e.message );
            setParsedValues({});
        }

    }, [inputUrl]);

    return (
        <General title={'UTM Validator'}>
            <Typography sx={{py: 1}}>Use this tool to determine if your UTM URL is correct. To generate UTM URLs, use our  <Link href={route('ToolUTMGenerator')}>UTM Generator Tool</Link>!</Typography>
            <TextField
                required
                fullWidth
                label="URL"
                variant="outlined"
                type="url"
                name="inputUrl"
                onChange={updateInputUrl}
                sx={{mt: 2}}
            />

            <Box sx={{mt: 2}}>
                {errors === '' ? (
                        <Paper elevation={2} sx={{p: 3}} style={{outlineColor: theme.palette.success.main, outlineStyle: 'solid', outlineWidth: '3px'}}>
                            <Typography variant={'h5'} color={theme.palette.success.main}>Valid!</Typography>
                            {Object.keys(parsedValues).map(key =>
                                (<Typography variant={'p'} style={{display: 'block'}} color={theme.palette.success.main}>
                                    {key}: {parsedValues[key]}
                                </Typography>)

                            )}
                        </Paper>
                    ) :
                    (
                        <Paper elevation={2} sx={{p: 3}} style={{outlineColor: theme.palette.error.dark, outlineStyle: 'solid', outlineWidth: '3px'}}>
                            <Typography variant={'h5'} color={theme.palette.error.dark}>{errors}</Typography>
                        </Paper>
                    )
                }
            </Box>

        </General>
    );
}
