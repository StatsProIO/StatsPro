import {Drawer} from '@mui/material';
import DrawerContents from './DrawerContents';


export default function Drawers({ isDrawerOpen, domain }) {

    const drawerWidth = 240;

    return (
        <>
            <Drawer
                variant="temporary"
                open={isDrawerOpen}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#f8f9fc', color: '#080808' },
                }}
            >
                <DrawerContents domain={domain}/>
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderWidth: 0, backgroundColor: '#f8f9fc', color: '#080808' },
                }}
                open
            >
                <DrawerContents domain={domain}/>
            </Drawer>
        </>
    );
}
