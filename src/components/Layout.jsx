import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/user';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const dispacth = useDispatch();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
        <Toolbar />
        <Divider />
        <List>
            <Link to="/">
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Dashboard"} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/departments">
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <FormatListBulletedIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Departments"} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/add-department">
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <PlaylistAddIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Add Department"} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/categories">
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <PlaylistAddIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Categories"} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/add-category">
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <PlaylistAddIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Add Category"} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/products">
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Products"} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/add-product">
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <AddShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Add Product"} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/orders">
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <ShoppingBasketIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Orders"} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/users">
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Users"} />
                    </ListItemButton>
                </ListItem>
            </Link>
        </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{
            backgroundColor:"white",
            color:"#ff5252",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
                Admin
            </Typography>
            <Box sx={{flex:1,display:"flex",justifyContent:"end"}}>
                <Button onClick={()=>dispacth(logout())}>Logout</Button>
            </Box>
            </Toolbar>
        </AppBar>
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            {drawer}
            </Drawer>
            <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
            >
            {drawer}
            </Drawer>
        </Box>
        <Box
            component="main"
            sx={{ flexGrow: 1, paddingX: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } , overflow:"hidden" }}
        >
            <Toolbar />
            {props.children}
        </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;