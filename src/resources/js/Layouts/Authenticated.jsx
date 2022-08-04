import { Box } from '@mui/material';
import Container from './Container';

export default function Authenticated({ auth, header, children }) {
    return (
        <Container showDrawer={true} showNavLinks={false} auth={auth}>
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, md: 3 } }}>
                <main>
                    {children}
                </main>
            </Box>
        </Container>
    );
}
