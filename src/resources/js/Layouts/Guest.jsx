import React from 'react';
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
