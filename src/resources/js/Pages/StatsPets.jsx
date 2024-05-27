import React, {useEffect} from 'react';
import {Typography, Alert, Grid, Paper} from '@mui/material';
import BlogLayout from "@/Layouts/BlogLayout";
import Box from "@mui/material/Box";
import Guest from "@/Layouts/Guest";
import {Head} from "@inertiajs/inertia-react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";


export default function StatsPets(props) {


    return (
        <Guest auth={props.auth}>
            <Head>
                <title>StatsPets | Friendly pets on your website</title>
                <meta name="description" content="StatsPets puts friendly pets on a visitor counter widget on your webiste. Customized to your liking." />
            </Head>

            <div>
                <Grid container spacing={0} justifyContent="center" sx={{position: 'relative', overflow: 'hidden', backgroundImage: 'url(\'https://i.imgur.com/VW2DYbL.png\')', backgroundPositionY: 'bottom', pt: 5, px: 1, pb: 40}}>
                    <Grid item xl={12} lg={7} md={7} sm={11} xs={12} textAlign='center'>
                        <Typography variant={'h3'} sx={{fontWeight: 'bold', fontFamily: 'monospace', color: '#222758'}}>Your website's own pet!</Typography>
                        <Typography variant={'h5'} sx={{fontWeight: 'bold', fontFamily: 'monospace', color: '#676b8c'}}>Say hello to Byte! The friendly dog that hangs out on your website!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={'dog-left-to-right-3'} component={'img'} src={'images/dog-3-run.gif'} sx={{position: 'absolute', bottom: '22%', left: '22%', width: '70px'}}></Box>
                        <Box className={'dog-left-to-right-2'} component={'img'} src={'images/dog-2-run.gif'} sx={{position: 'absolute', bottom: '15%', left: '13%', width: '70px'}}></Box>
                        <Box className={'dog-left-to-right-1'} component={'img'} src={'images/dog-1-run.gif'} sx={{position: 'absolute', bottom: '13%', left: '17%', width: '70px'}}></Box>
                        <Box className={'dog-left-to-right-4'} component={'img'} src={'images/dog-4-run.gif'} sx={{position: 'absolute', bottom: '18%', left: '12%', width: '70px'}}></Box>
                    </Grid>

                </Grid>
                <video src={'/visitor-widget?color-variant=2'}/>
                <Grid container spacing={0} sx={{ pt: 5, px: 1 }} justifyContent="center">

                    <Grid item xl={2} lg={7} md={7} sm={11} xs={12} textAlign='center'>
                        <video src="/images/visitor-widget/clips/dog-3-clip-12357.webm" onLoadedMetadata="this.muted = true" playsinline autoPlay muted loop width={'200px'}></video>
                    </Grid>

                    <Grid item xl={2} lg={7} md={7} sm={11} xs={12} textAlign='center'>
                        <video src="/images/visitor-widget/clips/dog-1-clip-12353.webm" onLoadedMetadata="this.muted = true" playsinline autoPlay muted loop width={'200px'}></video>
                    </Grid>

                    <Grid item xl={2} lg={7} md={7} sm={11} xs={12} textAlign='center'>
                        <video src="/images/visitor-widget/clips/dog-4-clip-12357.webm" onLoadedMetadata="this.muted = true" playsinline autoPlay muted loop width={'200px'}></video>
                    </Grid>

                    <Grid item xl={2} lg={7} md={7} sm={11} xs={12} textAlign='center'>
                        <video src="/images/visitor-widget/clips/dog-2-clip-12357.webm" onLoadedMetadata="this.muted = true" playsinline autoPlay muted loop width={'200px'}></video>
                    </Grid>


                </Grid>

                <Grid container alignItems="center" justifyContent="center" sx={{ pb: 3, px: 1  }}>
                    <Grid item sm={8} lg={6}>
                        <a href='/dashboard/demo.com'>
                            <div className="demo-image-container">
                                <picture>
                                    <source srcSet="../images/sample-dashboard.webp" media="(min-width: 800px)"/>
                                    <img className={'demo-image'} src="../images/sample-dashboard-m.webp" loading="lazy"
                                         decoding="async" style={{borderRadius: '10px'}} width={"100%"}/>
                                </picture>
                                <div className="demo-image-overlay">
                                    <Typography variant={'h4'} color={'white'} className={'live-demo-text'}>See Live
                                        Demo</Typography>
                                </div>
                            </div>
                        </a>
                    </Grid>
                </Grid>

                <Grid container spacing={0} sx={{ pt: 5, px: 1 }} justifyContent="center" >

                    <Grid item xl={2} lg={7} md={7} sm={11} xs={12} textAlign='center' >
                        <img src={'/images/dog-3-lay.gif'} width={'100px'}/>
                        <Typography variant={'h5'}>Tiny file size</Typography>
                    </Grid>

                    <Grid item xl={2} lg={7} md={7} sm={11} xs={12} textAlign='center' >
                        <img src={'/images/dog-4-run.gif'} width={'100px'}/>
                        <Typography variant={'h5'}>Loads quickly</Typography>
                    </Grid>

                    <Grid item xl={2} lg={7} md={7} sm={11} xs={12} textAlign='center' >
                        <img src={'/images/dog-1-idle.gif'} width={'100px'}/>
                        <Typography variant={'h5'}>Show off your visits</Typography>
                    </Grid>
                </Grid>



                <Typography variant={'h4'} align={'center'} sx={{mt: 4}}>Get your StatPet here</Typography>
                <Grid container spacing={0} sx={{ pt: 5, px: 1 }}  justifyContent="center" >

                    <Grid item xl={5} lg={7} md={7} sm={11} xs={12}  textAlign='center' sx={{borderRadius: '10px 0px 0px 10px'}} p={2}>


                        <Typography variant={'h5'} align={'center'}>Settings</Typography>


                        <Box py={2}>
                            <FormControl fullWidth sx={{ minWidth: 120 }} helperText={"Select a size"}>
                                <InputLabel id="demo-controlled-open-select-label">Size</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="size"
                                    name={'size'}
                                    fullWidth
                                    // value={data?.size}
                                    label="Size"
                                    // onChange={onHandleChange}
                                >
                                    <MenuItem value={'small'}>Small</MenuItem>
                                    <MenuItem value={'medium'}>Medium</MenuItem>
                                    <MenuItem value={'large'}>Large</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box py={2}>
                            <FormControl fullWidth sx={{ minWidth: 120 }} helperText={"Select a color"} >
                                <InputLabel id="demo-controlled-open-select-label-2">Color</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label-2"
                                    id="size"
                                    name={'size'}
                                    fullWidth
                                    // value={data?.size}
                                    label="Size"
                                    // onChange={onHandleChange}
                                >
                                    <MenuItem value={'1'}>Orange</MenuItem>
                                    <MenuItem value={'2'}>Black</MenuItem>
                                    <MenuItem value={'3'}>Brown</MenuItem>
                                    <MenuItem value={'4'}>Gray</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                    </Grid>

                    <Grid item xl={5} lg={7} md={7} sm={11} xs={12} textAlign='center' sx={{backgroundColor: '#ebebeb', borderRadius: '0px 10px 10px 0px', justifyContent: 'center'}} p={2} mb={3}>


                        <Typography variant={'h5'} align={'center'}>Preview</Typography>

                        <br/><br/>
                        <video src="/images/visitor-widget/clips/dog-2-clip-12357.webm" onLoadedMetadata="this.muted = true" playsinline autoPlay muted loop width={'200px'}></video>

                        <Grid container>
                            <Grid item>
                                <Typography variant={'h6'} sx={{borderWidth: '2px', borderStyle: 'solid', borderRadius: '22px', width: '42px', borderColor: '#0000ff', color: '#0000ff'}} m={1}>1</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={'h6'} m={1}>Copy this code into the head of your site</Typography>
                            </Grid>

                        </Grid>




                        <Paper sx={{ backgroundColor: '#111111', color: '#fff', px: 1, py: 3, fontFamily: 'Courier New', fontWeight: 'bold', overflowWrap: 'break-word' }} m={1}>
                            &lt;script data-domain="" src="/js/broadcaster.js" async&gt; &lt;/script&gt;
                        </Paper>


                        <Grid container>
                            <Grid item>
                                <Typography variant={'h6'} sx={{borderWidth: '2px', borderStyle: 'solid', borderRadius: '22px', width: '42px', borderColor: '#0000ff', color: '#0000ff'}} m={1}>2</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={'h6'} m={1}>Copy this code anywhere you want your StatPet to show</Typography>
                            </Grid>

                        </Grid>


                        <Paper sx={{ backgroundColor: '#111111', color: '#fff', px: 1, py: 3, fontFamily: 'Courier New', fontWeight: 'bold', overflowWrap: 'break-word' }} m={1}>
                            &lt;script data-domain="" src="/js/broadcaster.js" async&gt; &lt;/script&gt;
                        </Paper>

                    </Grid>
                </Grid>






            </div>
        </Guest>
    );
}
