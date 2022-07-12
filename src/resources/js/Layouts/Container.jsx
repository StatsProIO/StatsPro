import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

export default function Container({ children }) {
    return (
        <>
            <CssBaseline />
            {children}
        </>
    );
}
