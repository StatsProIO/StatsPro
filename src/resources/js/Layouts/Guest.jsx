import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';
import Container from './Container';

export default function Guest({ children }) {
    return (
        <Container>
            <div className="">
                <div>
                    <Link href="/">
                        {/* <ApplicationLogo className="" /> */}
                    </Link>
                </div>

                <div className="">
                    {children}
                </div>
            </div>
        </Container>
    );
}
