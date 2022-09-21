import React from 'react';
import {Link, Typography} from '@mui/material';
import General from "@/Layouts/General";


export default function Docs() {
    return (
        <>

            <Link href="/docs/about" underline="hover" color="inherit" align={"center"}>About</Link>
            <Link href="/docs/adding-a-domain" underline="hover" color="inherit" align={"center"}>Adding a Domain</Link>
            <Link href="/docs/faq" underline="hover" color="inherit" align={"center"}>FAQ</Link>
            <Link href="/docs/getting-started" underline="hover" color="inherit" align={"center"}>Getting Started</Link>
            <Link href="/docs/installing" underline="hover" color="inherit" align={"center"}>Installing</Link>

        </>
    );
}
