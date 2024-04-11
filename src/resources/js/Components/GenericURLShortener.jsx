import React, {useState} from 'react';
import {Head} from "@inertiajs/inertia-react";
import {Grid, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {LoadingButton} from "@mui/lab";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ConvincingBanner from "@/Components/ConvincingBanner";
import Guest from "@/Layouts/Guest";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";

export default function GenericURLShortener({serviceTitle = '', icon = ''}) {
    const [data, setData] = useState({
        long_url: '',
        name: '',
        expires: 'no-expiration'
    });
    const [processing, setProcessing] = useState(false);
    const [shortLinks, setShortLinks] = useState([]);

    const onHandleChange = (event) => {
        setData(prevState => ({...prevState, [event.target.name]: event.target.value}));
    };

    const submit = (e) => {
        e.preventDefault();

        setProcessing(true);
        axios.post(route('createShortLink'), data)
            .then(res => {
                setProcessing(false);
                setShortLinks([res.data, ...shortLinks]);
            });
    };

    const copyToClipboard = (text) => { navigator.clipboard.writeText(text); };

    return (
        <Guest>
            <Head title={'URL Shortener'} />
            <Grid container spacing={2} justifyContent={"center"} sx={{ py: 5, px: 1 }}>
                <Grid item lg={6} md={9} sm={8} xs={12} order={{xs: 1, sm: 2}}>

                    <Box justify={'center'} align={'center'}>
                        <img src={`https://www.google.com/s2/favicons?domain=${icon}&sz=128`} style={{width: '70px'}} align={'center'}/>
                    </Box>
                    <Typography variant="h2" align={'center'}><b>{serviceTitle} Link Shortener!</b></Typography>
                    <Typography variant="h5" align={'center'}>{serviceTitle} link shortener to share URLs with short, trackable URLs. Easily track clicks, locations, and your audience every time your short link is used!</Typography>

                    <Box style={{borderColor: '#dddddd', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px', backgroundColor: 'white'}} p={6} m={6}>
                        <form onSubmit={submit}>
                            <TextField
                                fullWidth
                                label={`Link to shorten (${icon}....)`}
                                variant="outlined"
                                type="url"
                                name="long_url"
                                size={"large"}
                                value={data?.long_url}
                                onChange={onHandleChange}
                                sx={{mt: 2}}
                            />

                            <Accordion disableGutters>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Options...
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        fullWidth
                                        label="Name (for tracking)..."
                                        variant="outlined"
                                        type="text"
                                        name="name"
                                        value={data?.name}
                                        onChange={onHandleChange}
                                        sx={{my: 2}}
                                        helperText={"Add a name for easier tracking"}
                                    />

                                    <FormControl fullWidth sx={{ minWidth: 120 }} helperText={"Add a name for easier tracking"}>
                                        <InputLabel id="demo-controlled-open-select-label">Expiration</InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="expires"
                                            name={'expires'}
                                            fullWidth
                                            value={data?.expires}
                                            label="Expiration"
                                            onChange={onHandleChange}
                                        >
                                            <MenuItem value={'no-expiration'}>No Expiration</MenuItem>
                                            <MenuItem value={'24-hours'}>24 Hours</MenuItem>
                                            <MenuItem value={'72-hours'}>72 Hours</MenuItem>
                                        </Select>
                                        <FormHelperText>Set an expiration if you would like the link to stop working after some time</FormHelperText>

                                    </FormControl>
                                </AccordionDetails>
                            </Accordion>

                            <LoadingButton loading={processing} fullWidth variant="contained" type="submit" size="large" sx={{ my: 2 }}>Create!</LoadingButton>
                        </form>

                        {shortLinks.map((shortLink) => {

                            return (<Box key={shortLink.id} style={{borderColor: '#dddddd', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px', "&:hover": { boxShadow: 6 }, overflow: 'hidden' }} my={1} p={2}  >

                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <img src={`https://www.google.com/s2/favicons?domain=${shortLink.long_url}&sz=128`} style={{width: '100%'}}/>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography variant={'h5'}>
                                            <a href={`//${window.location.host}/s/${shortLink.short_code}`}>{window.location.host}/s/{shortLink.short_code}</a>
                                            <IconButton aria-label="copy" onClick={() => copyToClipboard(window.location.host + '/s/' + shortLink.short_code)}>
                                                <ContentCopyIcon />
                                            </IconButton>
                                        </Typography>

                                        <Typography variant={'body1'}>{shortLink.long_url}</Typography>
                                        <Typography variant={'body2'}>Name: {shortLink.name ?? 'Unnamed'} | Expires: {shortLink.expires_at ? (new Date(Date.parse(shortLink.expires_at))).toLocaleDateString('en-US') : 'No expiration'}</Typography>

                                    </Grid>
                                </Grid>

                            </Box>)
                        })}
                    </Box>

                    <Box style={{borderColor: '#dddddd', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px', backgroundColor: 'white'}} p={6} m={6}>
                        <Typography variant="h5" align={'center'}>Keep track of your links, see how many people have clicked!</Typography>
                        <Typography variant="body1" align={'center'}>Create an account to see detailed metrics</Typography>

                        <Button loading={processing} fullWidth variant="outlined" type="submit" size="large" sx={{ my: 2 }}>Create an Account</Button>
                    </Box>

                    <Box style={{borderColor: '#dddddd', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px', backgroundColor: 'white'}} p={6} m={6}>
                        <Typography variant="h5" align={'center'}>More Link Shorteners</Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <ul>
                                    <li><a href={'/amazon-url-shortener'}>Amazon Link Shortener</a></li>
                                    <li><a href={'/chat-gpt-url-shortener'}>ChatGPT Link Shortener</a></li>
                                    <li><a href={'/google-url-shortener'}>Google Link Shortener</a></li>
                                    <li><a href={'/linked-in-url-shortener'}>LinkedIn Link Shortener</a></li>
                                    <li><a href={'/reddit-url-shortener'}>Reddit Link Shortener</a></li>
                                </ul>
                            </Grid>
                            <Grid item xs={6}>
                                <ul>
                                    <li><a href={'/spotify-url-shortener'}>Spotify Link Shortener</a></li>
                                    <li><a href={'/twitter-url-shortener'}>Twitter Link Shortener</a></li>
                                    <li><a href={'/whats-app-url-shortener'}>WhatsApp Link Shortener</a></li>
                                    <li><a href={'/x-url-shortener'}>X Link Shortener</a></li>
                                    <li><a href={'/zoom-url-shortener'}>Zoom Link Shortener</a></li>
                                </ul>
                            </Grid>
                        </Grid>
                    </Box>

                </Grid>
            </Grid>
            <ConvincingBanner/>
        </Guest>
    );
}
