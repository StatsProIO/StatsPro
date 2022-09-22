import {Link, List, ListItem, ListItemButton} from '@mui/material';
import ListItemText from "@mui/material/ListItemText";


export default function DocsList() {

    const pages = [
        {
            url: '/docs/about',
            name: 'About'
        },
        {
            url: '/docs/getting-started',
            name: 'Getting Started'
        },
        {
            url: '/docs/installing',
            name: 'Installing'
        },
        {
            url: '/docs/faq',
            name: 'FAQ'
        },
        {
            url: '/docs/adding-a-domain',
            name: 'Adding a Domain'
        },
    ];

    return (
        <>
            <List sx={{backgroundColor: '#eee'}}>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/docs">
                        <ListItemText primary="Docs" primaryTypographyProps={{variant: "h5", fontWeight: 'bold'}} />
                    </ListItemButton>
                </ListItem>
                {pages.map((page) => <ListItem disablePadding>
                    <ListItemButton component="a" href={page.url}>
                        <ListItemText primary={page.name} />
                    </ListItemButton>
                </ListItem>)
                }
            </List>

        </>
    );
}
