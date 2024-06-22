import React, {useEffect, useState} from 'react';
import {Typography, Alert} from '@mui/material';
import BlogLayout from "@/Layouts/BlogLayout";
import Box from "@mui/material/Box";
import {NotionRenderer} from "react-notion";


export default function BlogPost({slug, data}) {
    const pageData = JSON.parse(data);

    const title = pageData[Object.keys(pageData)[0]].value.properties.title[0][0];
    const tags = pageData[Object.keys(pageData)[0]].value.properties['HDV='][0][0].split(',');
    return (

        <BlogLayout title={title} tags={tags}>
            <Box sx={{maxWidth: '100%'}}>
                <Typography><NotionRenderer blockMap={pageData} /></Typography>
            </Box>

        </BlogLayout>
    );
}
