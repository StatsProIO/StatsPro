import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Button from '@mui/material/Button';
import Guest from '@/Layouts/Guest';
import { Box, Grid, Paper, Toolbar, Typography } from '@mui/material';
import Container from '@/Layouts/Container';
import IntegrationCode from '@/components/IntegrationCode';


export default function Welcome(props) {
    return (
        <Guest>
            <Head title="Welcome" />

            <Grid container spacing={0} className="hero-row" sx={{ pt: 5 }}>
                <Grid item sm={12} lg={6}>

                    <Typography variant="h2" component="div" sx={{ fontWeight: 500, textAlign: 'center' }} gutterBottom>
                        GDPR Compliant Google Analytics alternative without compromises
                    </Typography>


                    {/* You're not seeing 40% of your customers */}

                    <Typography variant="h6" gutterBottom component="div" align='center' >
                        Get full analytics on your website <b>without</b> a cookie banner.
                    </Typography>

                    {/* <!--<div className="input-group mb-3">--> */}
                    {/* <!--<input type="text" className="form-control" placeholder="http://your-website.com">--> */}
                    {/* <!--<div className="input-group-append">--> */}
                    {/* <!--<button className="btn btn-primary" type="button" id="button-addon2">Submit</button>--> */}
                    {/* <!--</div>--> */}
                    {/* <!--</div>--> */}

                </Grid>
                <Grid item lg={5} md={12} alignItems="center" justifyContent="center">
                    <img src="images/header.svg" style={{ width: '100%', height: '100%' }} />
                </Grid>
            </Grid>



            <Grid container alignItems="center" justifyContent="center">
                <Grid item sm={12} lg={6}>
                    <Box sx={{ textAlign: 'center', pt: 6, pb: 6 }}>
                        <Typography variant="h3">Get Started in 5 seconds</Typography>
                        <Typography variant="h6">Drop this on your website</Typography>

                        <IntegrationCode />

                    </Box>
                </Grid>
            </Grid>



            <Box sx={{ textAlign: 'center', pt: 6, pb: 6 }}>
                <Typography variant="h3">Analytics like you've never seen before</Typography>
                <Typography variant="h6">With CNAME integration, you will be able to see traffic on your website that's been missing from Google Analytics.</Typography>
                <Typography variant="h6">Setup only takes a few minutes and we've got a guide</Typography>
                <Typography variant="h6">Users with ad blockers won't be seen by traditional analytics tools<br />
                    Midnight Metrics reveals this dark traffic so you can see all of your users
                </Typography>
            </Box>




            <Grid container justifyContent="center" alignItems="center" sx={{ textAlign: 'center', pt: 6 }}>
                <Grid container lg={10} justifyContent="center" alignItems="center" >
                    <Grid item sm={4} justifyContent="center" alignItems="center" >
                        <img src="/images/icon-1_optimized.svg" width="50%" />
                        <Typography variant="h5">No User Left Behind</Typography>
                        <Typography variant="body1">Midnight Metrics lets you get the full picture. Track pageviews, clicks, conversions,
                            and define your own events.</Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <img src="images/icon-2_optimized.svg" width="50%" />
                        <Typography variant="h5">Real Time</Typography>
                        <Typography variant="body1">Get answers in seconds, not hours. Midnight Metrics is updated as soon as
                            each of your events occurs.</Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <img src="images/icon-3_optimized.svg" width="50%" />
                        <Typography variant="h5">All Platforms</Typography>
                        <Typography variant="body1">Setup to track events on your website, emails, or in your apps.</Typography>
                    </Grid>
                </Grid>
            </Grid>



            <Grid container alignItems="center" justifyContent="center">
                <Grid item sm={12} lg={10}>
                    <Box sx={{ textAlign: 'center', pt: 6, pb: 6 }} >
                        <Typography variant="h4">
                            Midnight Metrics respects user privacy, personally identifying information is not collected. Midnight Metrics is also GDPR compliant.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ textAlign: 'center', pt: 6, pb: 6 }}>
                <Typography variant="h3">Analytics Blocking Usage</Typography>
                <Typography variant="h6">Users from the United States, Europe, and India have high usage levels of adblockers.</Typography>
            </Box>

            <Grid container spacing={2} justifyContent="center">
                <Grid item sm={6}>
                    <img src="../images/map_optimized.svg" width="100%" />
                </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center' }}>
                <Grid item sm={3}>
                    <div className="text-center">
                        <Typography variant="h3">615M</Typography>
                        <Typography variant="h6">Worldwide Users Using Adblock</Typography>
                    </div>
                </Grid>
                <Grid item sm={3}>
                    <div className="text-center">
                        <Typography variant="h3">10%</Typography>
                        <Typography variant="h6">Increase in Adblock usage each year</Typography>
                    </div>
                </Grid>
            </Grid>


            <Grid container alignItems="center" justifyContent="center" sx={{ pt: 5 }}>
                <Grid container lg={10} justifyContent="center" alignItems="center">
                    <Grid item sm={6} lg={3}>
                        <img src="../images/featuredA_optimized.svg" width="100%" />
                    </Grid>
                    <Grid item sm={6} lg={6}>
                        <Typography variant="h5">Made For Humans</Typography>
                        <Typography variant="body1">
                            Midnight Metrics provides all the analytics you're used to seeing. Aggregate by
                            users URL, acquisition, location, device, browser, time on page. Midnight Metrics also allows you to
                            drill down into an individual user.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>


            <Grid container alignItems="center" justifyContent="center" sx={{ pt: 5 }}>
                <Grid container lg={10} justifyContent="center" alignItems="center">
                    <Grid item sm={6} lg={6}>
                        <Typography variant="h5">Easy Dashboards & Google Analytics Integration</Typography>
                        <Typography variant="body1">
                            You can browse your data easily in Midnight Metrics. If you're already
                            familiar with Google Analytics, that's no problem. Midnight Metrics will automatically
                            send your data to Google Analytics in real time.
                        </Typography>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <img src="../images/featuredB_optimized.svg" width="100%" />
                    </Grid>
                </Grid>
            </Grid>


            <Grid container alignItems="center" justifyContent="center" sx={{ pt: 5 }}>
                <Grid container lg={10} justifyContent="center" alignItems="center">
                    <Grid item sm={6} lg={3}>
                        <img src="../images/featuredC_optimized.svg" width="100%" />
                    </Grid>
                    <Grid item sm={6} lg={6}>
                        <Typography variant="h5">Data for Decisions</Typography>
                        <Typography variant="body1">
                            We give you all of the data so you can answer questions about your business.
                            Know what 100% of your users are doing across your site. No other analytics platform offers
                            this level of precision.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Box sx={{ textAlign: 'center', pt: 6 }}>
                <Typography variant="h3">Side by Side Comparison</Typography>
                <Typography variant="h6">A real comparison of how Midnight Metrics reveals Dark Traffic. </Typography>
                <a href="#">Read the full report here</a>
            </Box>

            <Grid container alignItems="center" justifyContent="center" sx={{ pt: 5 }}>
                <Grid item sm={8} lg={6}>
                    <img src="../images/sample-before.png" width="100%" />
                </Grid>
            </Grid>

            <Box sx={{ textAlign: 'center', pt: 6 }}>
                <Typography variant="h3">Simple Pricing</Typography>
            </Box>

            <Grid container justifyContent="center" alignItems="center" sx={{ textAlign: 'center', pt: 6 }}>
                <Grid container lg={10} justifyContent="center" alignItems="center" >
                    <Grid item sm={4} justifyContent="center" alignItems="center" >

                        <div className="card pricing-card mb-3">
                            <div className="card-body text-center">
                                <h5 className="card-subtitle  pb-2">Free</h5>
                                <h3 className="card-title"><b>$0/month</b></h3>
                                <hr />
                                <p className="card-text">Great if you have a few personal side projects that you'd like to
                                    monitor.</p>
                                <hr />
                                <p className="card-text">3 Sites</p>
                                <p className="card-text">100,000 Events/month</p>
                                <p className="card-text">Email Support</p>
                                <p className="card-text">1 year data retention</p>
                                <p> &nbsp;</p>
                                <a href="#" className="btn btn-lg btn-pink-gradient  btn-block btn-round">Start for Free</a>
                            </div>
                        </div>
                    </Grid>

                    <Grid item sm={4} justifyContent="center" alignItems="center" >

                        <div className="card pricing-card mb-3">
                            <div className="card-body text-center">
                                <h5 className="card-subtitle pb-2">Start Up</h5>
                                <h3 className="card-title"><b>$35/month</b></h3>
                                <hr />
                                <p className="card-text">The best plan for a growing or small business that needs deep
                                    insights into users.</p>
                                <hr />
                                <p className="card-text">Unlimited Sites</p>
                                <p className="card-text">5M Events/month</p>
                                <p className="card-text">Premium Support</p>
                                <p className="card-text">2 year data retention</p>
                                <p className="card-text">Email reports</p>
                                <a href="#" className="btn btn-lg btn-pink-gradient  btn-block btn-round">Start for Free</a>
                            </div>
                        </div>
                    </Grid>

                    <Grid item sm={4} justifyContent="center" alignItems="center" >
                        <div className="card pricing-card mb-3">
                            <div className="card-body text-center">
                                <h5 className="card-subtitle pb-2">Business</h5>
                                <h3 className="card-title"><b>$150/month</b></h3>
                                <hr />
                                <p className="card-text">Perfect for businesses or large agencies with many clients.</p>
                                <hr />
                                <p className="card-text">Unlimited sites</p>
                                <p className="card-text">15M Events/month</p>
                                <p className="card-text">Premium Support</p>
                                <p className="card-text">2+ year data retention</p>
                                <p className="card-text">Email reports</p>
                                <a href="#" className="btn btn-lg btn-pink-gradient  btn-block btn-round">Start for Free</a>
                            </div>
                        </div>

                    </Grid>
                    <div className="row">
                        <div className="col-sm-12">
                            <p className="small text-right">High plans available upon request.</p>
                        </div>
                    </div>
                </Grid>
            </Grid>


            <div className="row">
                <div className="col-sm-10 offset-sm-1 text-center pt-5 pb-5">
                    <h1 className="dark-blue"><b></b></h1>

                    <div className="pt-2 pb-5">

                    </div>
                </div>
            </div>

            <Grid container alignItems="center" justifyContent="center">
                <Grid item sm={12} lg={10}>
                    <Box sx={{ textAlign: 'center', pt: 6, pb: 6 }} >
                        <Typography variant="h4">
                            Seriously though, it's time to get serious about privacy and analytics
                        </Typography>
                        <h4 className="light-gray"></h4>
                        <Typography variant="h6">Setup in just a few minutes, no credit card required.</Typography>
                        <button type="button" className="btn btn-primary btn-lg btn-purple-gradient btn-round btn-larger"><h1>
                            Sign Up</h1></button>
                    </Box>
                </Grid>
            </Grid>


        </Guest >
    );
}
