import React from 'react';
import {Typography, Alert} from '@mui/material';
import BlogLayout from "@/Layouts/BlogLayout";


export default function BlogDeployingToStackhero() {
    return (
        <BlogLayout title={'Deploying From Github Actions To Stackhero'}>
            <img src='/images/deploying-from-github-actions-to-stackhero.avif' width='100%'/>
            <Alert severity="warning">This blog post is still being updated with more details! Come back later to see the full article.</Alert>
            <Typography sx={{py: 1}}>At StatsPro, one of our core tenants is respecting all data privacy laws that have been passed across the globe. Among those is the Schrems II ruling. This ruling requires that all servers which store PII data of European citizens must be stored on servers which are owned by a European company. The reason for this is that US companies which own servers in Europe are required to turn over data to US authorities, violating their privacy.</Typography>
            <Typography sx={{py: 1}}>Many privacy-friendly companies will route their data through servers owned by US companies but this does not comply with the Schrems II ruling.</Typography>
            <Typography sx={{py: 1}}>To solve for this, StatsPro has chosen to use Stackhero to host our servers in Europe. Stackhero is a European company and so this setup complies with Schrems II ruling.</Typography>
            <Typography sx={{py: 1}}>One challenge we faced while automating our deployments to Stackhero was deploying to a remote docker instance using Github Actions. This guide will show you how you can setup Github Actions to deploy to your own Stackheo docker instance.</Typography>
            <Typography sx={{py: 1}}>1. Start off by creating a dummy project that just returns Hello World.</Typography>
            <Typography sx={{py: 1}}>2. Now login to Stackheo and create a docker instance.</Typography>
            <Typography sx={{py: 1}}>3. Setup environment secrets in Github Actions. Include the secrets required to connect to your Stackheor Docker instance.</Typography>
            <Typography sx={{py: 1}}>4. Create a workflow that checks out your code, builds, and does a deploy to your Stackhero instance.</Typography>
        </BlogLayout>
    );
}
