import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import Container from './Container';

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <Container>
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                        {/* TODO */}
                        {/* {auth.user.name} */}
                        {/* {auth.user.email} */}

                        {/* <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                                    Log Out
                                                </ResponsiveNavLink> */}

                    </span>
                </Dropdown.Trigger>


            </Dropdown>


            <main>{children}</main>

        </Container>
    );
}
