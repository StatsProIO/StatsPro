import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';
import Container from './Container';
import Footer from "@/Components/Footer";

export default function Guest({ children, auth }) {
    return (
        <Container showDrawer={false} showNavLinks={true} auth={auth}>
            {children}
            <Footer/>
        </Container>
    );
}
