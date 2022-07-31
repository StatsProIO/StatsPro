import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';
import Container from './Container';

export default function Guest({ children, auth }) {
    return (
        <Container showDrawer={false} showNavLinks={true} auth={auth}>
            {children}
        </Container>
    );
}
