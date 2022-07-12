import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Button from '@mui/material/Button';
import Guest from '@/Layouts/Guest';


export default function Welcome(props) {
    return (
        <Guest>
            <Head title="Welcome" />
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href={route('dashboard')} className="text-sm text-gray-700 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 underline">
                                Log in
                            </Link>

                            <Link href={route('register')} className="ml-4 text-sm text-gray-700 underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>



                <Button variant="contained">Hello World</Button>;



                <div className="container-fluid">
                    <div className="row hero-row">

                        <div className="col-sm-12 col-lg-5 pb-5">

                            <div className="text-center pt-5"><h1 className="large-font">You're missing 30% of your customers</h1></div>
                            {/* <!--Your analytics platform is missing 30% of impressions--> */}
                            <div className="text-center pt-3 mb-5"><h4 className="">Midnight Metrics is the only analytics platform that tracks dark traffic
                                on your site</h4></div>
                            <br />
                            {/* <!--<div className="input-group mb-3">--> */}
                            {/* <!--<input type="text" className="form-control" placeholder="http://your-website.com">--> */}
                            {/* <!--<div className="input-group-append">--> */}
                            {/* <!--<button className="btn btn-primary" type="button" id="button-addon2">Submit</button>--> */}
                            {/* <!--</div>--> */}
                            {/* <!--</div>--> */}

                        </div>

                        <div className="col-lg-7">
                            <img src="../images/header.svg" width="100%" className="d-none d-lg-block" />
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm text-center pt-5 pb-5">
                            <h1 className="dark-blue"><b>What is Dark Traffic?</b></h1>
                            <h4 className="light-gray">Users with ad blockers won't be seen by traditional analytics tools<br />
                                Midnight Metrics reveals this dark traffic so you can see all of your users</h4>
                        </div>
                    </div>
                </div>


                <div className="container-fluid">
                    <div className="row pt-4">
                        <div className="col-lg-10 offset-lg-1">

                            <div className="row pb-5 pt-5">
                                <div className="col-sm text-center">
                                    <img src="/images/icon-1_optimized.svg" width="50%" />
                                    <h4 className="dark-blue pt-4"><b>No User Left Behind</b></h4>
                                    <h5 className="light-gray">Midnight Metrics lets you get the full picture. Track pageviews, clicks, conversions,
                                        and define your own events.</h5>
                                </div>
                                <div className="col-sm text-center">
                                    <img src="images/icon-2_optimized.svg" width="50%" />
                                    <h4 className="dark-blue pt-4"><b>Real Time</b></h4>
                                    <h5 className="light-gray">Get answers in seconds, not hours. Midnight Metrics is updated as soon as
                                        each of your events occurs.</h5>
                                </div>
                                <div className="col-sm text-center">
                                    <img src="images/icon-3_optimized.svg" width="50%" />
                                    <h4 className="dark-blue pt-4"><b>All Platforms</b></h4>
                                    <h5 className="light-gray">Setup to track events on your website, emails, or in your apps.</h5>

                                    {/* <!--Midnight Metrics respects user privacy, personally identifying information is not collected. Midnight Metrics is also GDPR compliant.--> */}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>


                <div className="container-fluid pb-5">
                    <div className="row mt-5 pt-5">
                        <div className="col-lg-10 offset-lg-1 text-center">
                            <h1 className="dark-blue"><b>Analytics Blocking Usage</b></h1>
                            <h4 className="light-gray">Users from the United States, Europe, and India have high usage levels of
                                adblockers.</h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6 offset-sm-3 pt-3">
                            <img src="../images/map_optimized.svg" width="100%" />
                        </div>
                    </div>

                    <div className="row pt-5">
                        <div className="col-sm-3 offset-sm-3 text-center">
                            <h3 className="dark-blue">615M</h3>
                            <h6 className="light-gray">Worldwide Users Using Adblock</h6>
                        </div>
                        <div className="col-sm-3 text-center">
                            <h3 className="dark-blue">10%</h3>
                            <h6 className="light-gray">Increase in Adblock usage each year</h6>
                        </div>
                    </div>

                </div>


                <div className="container-fluid pt-5 pb-5 mt-5" >

                    <div className="row h-100 align-items-center">
                        <div className="col-sm-6 col-lg-3 offset-lg-1">
                            <img src="../images/featuredA_optimized.svg" width="100%" />
                        </div>
                        <div className="col-sm-6 col-lg-6 offset-lg-1 align-middle">
                            <h1 className="text-center white"><b>Made For Humans</b></h1>

                            <br />
                            <h5 className="light-blue">
                                Midnight Metrics provides all the analytics you're used to seeing. Aggregate by
                                users URL, acquisition, location, device, browser, time on page. Midnight Metrics also allows you to
                                drill down into an individual user.
                            </h5>
                        </div>

                    </div>
                </div>


                <div className="container-fluid pt-5 pb-5" >

                    <div className="row h-100 align-items-center">
                        <div className="col-sm-6 col-lg-6 offset-lg-1 align-middle">
                            <h1 className="text-center white"><b>Easy Dashboards & Google Analytics Integration</b></h1>

                            <br />
                            <h5 className="light-blue">
                                You can browse your data easily in Midnight Metrics. If you're already
                                familiar with Google Analytics, that's no problem. Midnight Metrics will automatically
                                send your data to Google Analytics in real time.
                            </h5>
                        </div>
                        <div className="col-sm-6 col-lg-3 offset-lg-1">
                            <img src="../images/featuredB_optimized.svg" width="100%" />
                        </div>
                    </div>
                </div>

                <div className="container-fluid pt-5 pb-5 mb-5" >

                    <div className="row h-100 align-items-center">
                        <div className="col-sm-6 col-lg-3 offset-lg-1">
                            <img src="../images/featuredC_optimized.svg" width="100%" />
                        </div>

                        <div className="col-sm-6 col-lg-6 offset-lg-1 align-middle">
                            <h1 className="text-center white"><b>Data for Decisions</b></h1>

                            <br />
                            <h5 className="light-blue">
                                We give you all of the data so you can answer questions about your business.
                                Know what 100% of your users are doing across your site. No other analytics platform offers
                                this level of precision.
                            </h5>
                        </div>
                    </div>
                </div>


                <div className="container-fluid pb-5">
                    <div className="row pb-5 pt-5">
                        <div className="col-sm text-center">
                            <h1 className="dark-blue"><b>Side by Side Comparison</b></h1>
                            <h4 className="light-gray">A real comparison of how Midnight Metrics reveals Dark Traffic. </h4>
                            <a href="#">Read the full report here</a>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-6 col-lg-5 offset-lg-1"><img src="../images/sample-before.png" width="100%" /></div>
                        <div className="col-md-6 col-lg-5"><img src="../images/sample-after.png" width="100%" /></div>
                    </div>
                </div>

                <div className="container-fluid pt-5">
                    <div className="row pt-3 pb-3">
                        <div className="col-sm text-center">
                            <h1 className="dark-blue"><b>Simple Pricing</b></h1>
                            <h4 className="light-gray"></h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="row">
                                <div className="col-md">
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
                                </div>
                                <div className="col-md">
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
                                </div>
                                <div className="col-md">
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
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <p className="small text-right">High plans available upon request.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="container-fluid pt-5 pb-5">
                    <div className="row">
                        <div className="col-sm-10 offset-sm-1 text-center pt-5 pb-5">
                            <h1 className="dark-blue"><b>Seriously though, it's time to unmask your traffic</b></h1>
                            <div className="mt-3 mb-5">
                                <img src="images/unmask.gif" />
                            </div>
                            <h4 className="light-gray">Setup in just a few minutes, no credit card required.</h4>
                            <div className="pt-2 pb-5">
                                <button type="button" className="btn btn-primary btn-lg btn-purple-gradient btn-round btn-larger"><h1>
                                    Sign Up</h1></button>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </Guest>
    );
}
