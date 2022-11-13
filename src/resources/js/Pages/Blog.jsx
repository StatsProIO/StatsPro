import React from 'react';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import General from "@/Layouts/General";
import {Box} from "@mui/system";
import {Grid} from '@mui/material';


const blogPosts = [
    {
        title: 'Deploying From Github Actions to Stackhero',
        url: '/blog/deploying-from-github-actions-to-stackhero',
        cardImage: '/images/deploying-from-github-actions-to-stackhero.avif'
    },
    {
        title: 'Ethical Analytics',
        url: '/blog/ethical-analytics',
        cardImage: '/images/ethical-analytics.webp'
    },
    {
        title: 'Italy Decalres Google Analytics Illegal',
        url: '/blog/italy-google-analytics-illegal',
        cardImage: '/images/illegal.webp'
    },
    {
        title: 'Top 5 Google Analytics Alternatives',
        url: '/blog/top-5-google-analytics-alternatives',
        cardImage: '/images/alternative.webp'
    }


];

export default function Blog() {
    return (
        <General title={'Blog'}>
            <Box sx={{py: 4}}>
                <Grid container spacing={2}>

                {blogPosts.map(blogPost => {
                    return (
                        <Grid item md={6} key={blogPost.url}>
                            <a href={blogPost.url}>
                            <Card >
                                <CardMedia
                                    component="img"
                                    image={blogPost.cardImage}
                                />
                                <CardContent>
                                    <Typography variant={'h5'} sx={{py: 1}}>{blogPost.title}</Typography>
                                </CardContent>
                            </Card>
                            </a>
                        </Grid>
                    );
                })}
                </Grid>
            </Box>
        </General>
    );
}
