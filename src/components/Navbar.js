import { useState, useContext } from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography,Menu, Container, Avatar, Button, Tooltip, MenuItem} from '@mui/material';
import { Link, useNavigate, useParams, useResolvedPath } from 'react-router-dom';
import { GeneralContext } from '../App';
import SearchBar from './SearchBar';
import NavbarLandingPage from '../LandingPages/NavbarLandingPage';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import MenuIcon from '@mui/icons-material/Menu';
import NightlightIcon from '@mui/icons-material/Nightlight';
import HomeIcon from '@mui/icons-material/Home';

export const RoleTypes = {
    none: 0,
    user: 1,
    business: 2,
    admin: 3};

export const checkPermissions = (permissions, userRoleType) => {
return permissions.includes(userRoleType);}

const pages = [
    { route: '/about', title: 'About' },
    { route: '/login', title: 'Login', permissions: [RoleTypes.none] },
    { route: '/signup', title: 'Signup', permissions: [RoleTypes.none] },
    { route: '/favorite', title: 'Fav cards', permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin] },
    { route: '/my-cards', title: 'My cards', permissions: [RoleTypes.business, RoleTypes.admin] },
    { route: '/admin', title: 'User management', permissions: [RoleTypes.admin] }];

export default function Navbar({ mode, toggleMode }) {
     const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { user, setUser, setLoader, userRoleType, setUserRoleType, snackbar } = useContext(GeneralContext);
    const navigate = useNavigate();
    const path = useResolvedPath().pathname;
    const { id } = useParams();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)};

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)};

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)};

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)};

    const logout = () => {
        setLoader(true);
        navigate('/');
        snackbar('You have been successfully logged out');
        fetch(`https://api.shipap.co.il/clients/logout`, {
            credentials: 'include',
        })
        .then(() => {
            setUser();
            setUserRoleType(RoleTypes.none);
            setLoader(false);
            });
        handleCloseUserMenu();
    }
 
 if (/^\/landing-page\/\d+$/.test(path)) {
    return (<NavbarLandingPage/>)}
        
return (
    <AppBar
        position="static"
        sx={{backgroundColor: mode === 'dark' ? 'black' : '#dda147'}}>
    <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="a"
                onClick={() => navigate('/')}
                sx={{mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'color',
                    textDecoration: 'none',
                    cursor:"pointer",
                    userSelect: 'none'}}>
                <HomeIcon/>&nbsp;AllCards
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit">
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: 'block', md: 'none' }, }}
                >
                    {pages.filter(p => !p.permissions || checkPermissions(p.permissions, userRoleType)).map(p => (
                        <Link key={p.route} to={p.route} style={{ textDecoration: 'none', color: 'black' }}>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{p.title}</Typography>
                            </MenuItem>
                        </Link>
                    ))}
                </Menu>
            </Box>
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',}}>     
                <HomeIcon/>&nbsp;All Cards
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.filter(p => !p.permissions || checkPermissions(p.permissions, userRoleType)).map(p => (
                    <Link key={p.route} to={p.route} style={{ textDecoration: 'none', color: 'white' }}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                color: 'white',
                                display: 'block',
                                backgroundColor: p.route === path ? '#ffffff3d' : {} }}>
                            {p.title}
                        </Button>
                    </Link>))} 
            </Box>

            {(path !== '/admin' && path !== '/about') && (
            <Box sx={{ width: '20vw' }}>
                <SearchBar  />
            </Box>)}

            <Box sx={{}} >
                <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
                    {mode === 'dark' ? <Brightness4Icon /> : <NightlightIcon />}
                </IconButton>
                </Box>
            {user ?
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src={user.imgUrl} alt="User Avatar"/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'}}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'}}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}>
                        <Link to="/account" style={{ textDecoration: 'none', color: 'black' }}>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{user.fullName}</Typography>
                            </MenuItem>
                        </Link>
                        <MenuItem onClick={logout}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box> : ''
            }
        </Toolbar>
    </Container>
    </AppBar>
    );
}
