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
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">

                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <div className="ml-3 relative">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <main>{children}</main>
            </div>
        </Container>
    );
}
