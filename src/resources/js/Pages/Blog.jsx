import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import General from "@/Layouts/General";
import {Box} from "@mui/system";
import {Grid} from '@mui/material';
import Loading from "@/Components/common/Loading";

function convertToSlug(Text) {
    return Text.toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
}

export default function Blog({notionDataRaw}) {
    const notionData = JSON.parse(notionDataRaw);

    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const newBlogPosts = [];
        notionData.forEach((notionBlogPost) => {

            newBlogPosts.unshift( {
                title: notionBlogPost['Name'],
                url: '/blog/' + convertToSlug(notionBlogPost['Name']) + '/' + notionBlogPost['id'],
                cardImage: notionBlogPost['Image'][0]['url']
            })
        });
        setBlogPosts(newBlogPosts);
        setLoading(false);

    }, []);

    return (
        <General title={'Blog'}>
            <Loading loading={loading}>
                <Box sx={{py: 4}}>
                    <Grid container spacing={2}>
                        {blogPosts.map(blogPost => {
                            return (
                                <Grid item md={6} key={blogPost.url}>
                                    <a href={blogPost.url} style={{textDecoration: 'none'}}>

                                    <Card sx={{height: "100%", borderColor: '#eee', borderStyle: 'solid'}}>
                                        <CardMedia
                                            component="img"
                                            image={blogPost.cardImage}
                                        />
                                        <CardContent>
                                            <Typography variant={'h5'} sx={{py: 1, textAlign: 'center', marginTop: 'auto'}} >{blogPost.title}</Typography>
                                        </CardContent>
                                    </Card>

                                    </a>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            </Loading>
        </General>
    );
}
