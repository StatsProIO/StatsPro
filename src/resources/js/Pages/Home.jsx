import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Guest from '@/Layouts/Guest';
import {Box, Grid, Paper, TextField, Typography} from '@mui/material';
import IntegrationCode from '@/Components/IntegrationCode';
import {SubscriptionOptions} from "@/Components/SubscriptionOptions";
import {subscriptionPlans} from "@/helpers/subscriptions";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {Inertia} from "@inertiajs/inertia";


function createData(name, marbleMetrics, googleAnalytics, fathom, plausible, simpleAnalytics) {
    return { name, marbleMetrics, googleAnalytics, fathom, plausible, simpleAnalytics};
}

const rows = [
    createData('Free for hobbyists', true, true, false, false, false),
    createData('Hosted only in the EU', true, false, false, true, true),
    createData('No cookie banner required', true, false, true, true, true),
    createData('Does not use fingerprinting', true,false, false, false, true),
    createData('Does not collect users IP addresses', true,false, false, false, true),
    createData('Open Source', true,false, false, true, false),
    createData('Can be self hosted', true,true, false, true, false),
];



export default function Home(props) {
    const [email, setEmail] = useState('');

    function onChange(e) {
        setEmail(e.target.value);
    }

    function submitSignUpForm() {
        Inertia.get('/register?email=' + email);
    }

    return (
        <Guest auth={props.auth}>

            <div className="home">
                <Grid container spacing={0} className="hero-row" sx={{ pt: 5, px: 1 }} justifyContent="center" >
                    <Grid item xl={5} lg={7} md={7} sm={11} xs={12} textAlign='center' >
                        <Typography variant="h2" component="div" sx={{ fontWeight: 600, textAlign: 'center', fontSize: {xs: '45px', sm : '50px', md: '55px'} }} gutterBottom style={{fontFamily: 'Helvetica', letterSpacing: '0.3px', wordSpacing: '.75px'}}>
                            GDPR-compliant analytics without compromises
                        </Typography>
                        <Typography color="#aaa"  variant="h6" component="div" align='center' sx={{pb: 4}}>
                            Get powerful analytics on your website <b>without</b> a cookie banner. Fully compliant with GDPR, CCPA and PECR. Fully hosted in the EU.
                        </Typography>

                        <Grid container spacing={1} justifyContent='center'>
                            <Grid item lg={6} sm={6} xs={8}>
                                <TextField size="large" fullWidth label={email.length === 0 ? 'Email' : ''} variant="outlined" sx={{  backgroundColor: '#fff', borderRadius: '8px', mt: 1}} type="email" InputLabelProps={{
                                    shrink: false
                                }} onChange={onChange}/>
                            </Grid>
                            <Grid item lg={3} sm={3} xs={4}>
                                <Button variant="contained" fullWidth size="large" endIcon={<ArrowForwardIosIcon/>} onClick={submitSignUpForm}
                                        sx={{px: 2, py: 2, mt: 1}} >Sign Up</Button>
                            </Grid>
                        </Grid>

                        <Typography variant="subtitle2" color="#aaa" align="center" sx={{pb: 8}}>No credit card required.</Typography>
                    </Grid>
                    <Grid item xl={5} lg={4} md={4} sm={12} alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
                        <img src="images/header.svg" style={{ width: '100%', height: '100%' }} />
                    </Grid>
                    <Grid item sm={4} md={4} alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'none' } }}>
                        <img src="images/header-mobile.svg" style={{ width: '100%', height: '100%' }} />
                    </Grid>
                </Grid>


                <Box sx={{ textAlign: 'center', py: 6, pb: 2, px: 1 }}>
                    <Typography variant="h3"><b>Powerful analytics to drive decisions</b></Typography>
                </Box>

                <Grid container alignItems="center" justifyContent="center" sx={{ pb: 6, px: 1  }}>
                    <Grid item sm={8} lg={6}>
                        <picture>
                            <source srcSet="../images/sample-dashboard.webp" media="(min-width: 800px)" />
                            <img src="../images/sample-dashboard-m.webp" loading="lazy" decoding="async" style={{borderRadius: '10px'}} width={"100%"}/>
                        </picture>
                    </Grid>
                </Grid>

                <Grid container alignItems="center" justifyContent="center" sx={{ textAlign: 'center', pt: 6, pb: 6, px: 1 }}>
                    <Grid item sm={12} md={12} lg={12}>
                        <Typography variant="h3" sx={{py: 3}}><b>Get started in 5 seconds!</b></Typography>
                        <Typography variant="h6">Drop this code on your website</Typography>
                    </Grid>
                    <Grid item xs={12} md={10} lg={5}>
                        <IntegrationCode />
                    </Grid>
                </Grid>

                <Grid container justifyContent="center" alignItems="center" sx={{ textAlign: 'center', py: 10, px: 1 }}>
                    <Grid container spacing={3} lg={10}  md={11} justifyContent="center"  alignItems="stretch" >
                        <Grid item sm={4} >
                            <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f2f2f2', height: '100%' }}>
                                <img src="../images/Global Business.png" style={{maxWidth: '30%'}} height={'100px'} loading="lazy" decoding="async" />
                                <Typography variant="h4"><b>European hosted analytics</b></Typography>
                                <Typography variant="h6" color="text.secondary">Unlike other privacy-focused analytics services, Marble Metrics keeps <b>100%</b> of your analytics data on European-owned servers. This applies to all data, all the time, in storage or even in transit.</Typography>
                            </Paper>
                        </Grid>
                        <Grid item sm={4}>
                            <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f2f2f2' }}>
                                <img src="../images/Business Protection.png" style={{maxWidth: '30%'}} height={'100px'} loading="lazy" decoding="async" />
                                <Typography variant="h4"><b>Your data is never sold</b></Typography>
                                <Typography variant="h6" color="text.secondary">We charge larger customers to use our service. This allows us to keep our service Free for small projects and ensures that we have no conflict of interest between privacy and profits.</Typography>
                            </Paper>
                        </Grid>
                        <Grid item sm={4}>
                            <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f2f2f2' }}>
                                <img src="../images/Strategy.png" style={{maxWidth: '30%'}} height={'100px'} loading="lazy" decoding="async" />
                                <Typography variant="h4"><b>All the features you need</b></Typography>
                                <Typography variant="h6" color="text.secondary">Marble Metrics comes standard with all of the features that you're used to seeing from your analytics platform: real-time, page views, time on page, bounce rate, and more.</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container alignItems="center" justifyContent="center" sx={{ textAlign: 'center', py: 5 }}>
                    <Grid item sm={12} md={10} xl={7} zeroMinWidth={true}>
                        <Typography variant="h3"><b>Compare to the competition</b></Typography>

                        <TableContainer component={Paper} sx={{ pt: 3 }} style={{maxWidth: '100%', width: '100%', overflowX: 'auto'}} >
                            <Table>
                                <colgroup>
                                    <col/>
                                    <col className="outlined"/>
                                    <col/>
                                    <col/>
                                    <col/>
                                    <col/>
                                </colgroup>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"/>
                                        <TableCell align="center" className="bright-blue-background" style={{color: '#fff', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', fontWeight: 'bold', fontSize: '1em'}}>Marble Metrics</TableCell>
                                        <TableCell align="center" style={{fontWeight: 'bold', fontSize: '1em'}}>Google Analytics</TableCell>
                                        <TableCell align="center" style={{fontWeight: 'bold', fontSize: '1em'}}>Fathom</TableCell>
                                        <TableCell align="center" style={{fontWeight: 'bold', fontSize: '1em'}}>Plausible</TableCell>
                                        <TableCell align="center" style={{fontWeight: 'bold', fontSize: '1em'}}>Simple Analytics</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell style={{fontWeight: 'bold', fontSize: '1em'}} component="th" scope="row">{row.name}</TableCell>
                                            <TableCell align="center" className="light-gray-background">{row.marbleMetrics ? <CheckCircleIcon sx={{color: "#27ae60" }}/> : <CancelIcon color="error"/>}</TableCell>
                                            <TableCell align="center">{row.googleAnalytics ? <CheckCircleIcon sx={{color: "#27ae60" }}/> : <CancelIcon color="error"/>}</TableCell>
                                            <TableCell align="center">{row.fathom ? <CheckCircleIcon sx={{color: "#27ae60" }}/> : <CancelIcon color="error"/>}</TableCell>
                                            <TableCell align="center">{row.plausible ? <CheckCircleIcon sx={{color: "#27ae60" }}/> : <CancelIcon color="error"/>}</TableCell>
                                            <TableCell align="center">{row.simpleAnalytics ? <CheckCircleIcon sx={{color: "#27ae60" }}/> : <CancelIcon color="error"/>}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>
                </Grid>


                <Grid container alignItems="center" justifyContent="center" sx={{ pt: 9, px: 1 }}>
                    <Grid container lg={12} xl={10} justifyContent="center" alignItems="center" textAlign={'center'}>
                        <Grid item sm={6} lg={6}>
                            <Typography variant="h4"><b>Your data is secured and belongs to only you</b></Typography>
                            <Typography variant="h6" color="text.secondary">
                                All of the analytics data collected on your websites belongs to you, it is never used for any other purpose other than to show in your Dashboard. We store all data securely in the EU and no analytics information can be traced to identify an individual user.
                            </Typography>
                        </Grid>

                    </Grid>
                </Grid>


                <Grid container alignItems="center" justifyContent="center" sx={{ pt: 5, px: 1  }}>
                    <Grid container lg={12} xl={10} justifyContent="center" alignItems="center" textAlign={'center'}>
                        <Grid item sm={6} lg={6}>
                            <Typography variant="h4"><b>Personally Identifiable Information (PII) is never stored</b></Typography>
                            <Typography variant="h6" color="text.secondary">
                                Marble Metrics never stores or uses PII. Some other privacy-focused analytics services will attempt to fingerprint your users using IP addresses and other information. Our analytics solution specifically does not fingerprint users because PECR forbids fingerprinting.
                            </Typography>
                        </Grid>

                    </Grid>
                </Grid>


                <Grid container alignItems="center" justifyContent="center" sx={{ pt: 5, px: 1  }}>
                    <Grid container lg={12} xl={10} justifyContent="center" alignItems="center" textAlign={'center'}>
                        <Grid item sm={6} lg={6}>
                            <Typography variant="h4"><b>GDPR, PECR and CCPA Compliant</b></Typography>
                            <Typography variant="h6" color="text.secondary">
                                Marble Metrics has been built from the ground up with the intention of being fully compliant with global privacy initiatives. We go a step further to ensure that we always keep the spirit of the law in mind, not simply skirting by the law.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} textAlign={'center'}>
                        <Button sx={{ my: 2}} variant={'outlined'} onClick={() => Inertia.get('/docs/about')}>Learn More</Button>
                    </Grid>
                </Grid>

                <Grid container justifyContent="center" alignItems="center" sx={{ textAlign: 'center', py: 10 }}>
                    <Grid container lg={10} justifyContent="center" alignItems="center" >
                        <Typography variant="h3" sx={{py: 3}}><b>Simple Pricing</b></Typography>
                        <SubscriptionOptions showLabels={false} currentProductSubscription={subscriptionPlans[0]} />
                    </Grid>
                </Grid>

                <Grid container alignItems="center" justifyContent="center" className={['dark-blue', 'font-white']}>
                    <Grid item sm={12} lg={10}>
                        <Box sx={{ textAlign: 'center', py: 6, my: 6 }} >
                            <Typography variant="h3">
                                <b>It's time to get serious about privacy and analytics</b>
                            </Typography>
                            <Typography variant="h6" color="#aaa">Setup in just a few minutes, no credit card required.</Typography>

                            <Button onClick={() => Inertia.get('register')} variant="contained" size="large" style={{fontSize: '1.3em'}} endIcon={<ArrowForwardIosIcon/>}
                                           sx={{px: 5, py: 2, my: 4}} fontWeight="bold"><b>Get Started For Free</b></Button>
                        </Box>
                    </Grid>
                </Grid>
            </div>

        </Guest >
    );
}