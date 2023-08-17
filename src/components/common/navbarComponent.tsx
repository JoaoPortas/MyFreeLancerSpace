'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LeftDrawerMenuComponent from './leftDrawerMenu';
import NavbarMenuOptionComponent from './navbarMenuOptionComponent';

const pages = [
	{
		key: 'products',
		href: '/products',
		name: 'Produtos',
		type: 'multiOptions',
		subOption: [
			{
				key: 'listProducts',
				href: '/products',
				name: 'Todos os produtos'
			},
			{
				key: 'createProduct',
				href: '/products/create',
				name: 'Novo produto'
			}
		]
	},
	{
		key: 'pricing',
		href: '#',
		name: 'Procing',
		type: 'SingleOption'
	},
	{
		key: 'blog',
		href: '#',
		name: 'Blog',
		type: 'SingleOption'
	}
	
];
//['Produtos', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function NavbarComponent() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
    	<Container maxWidth={false}>
        	<Toolbar disableGutters>
          	<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          	<Typography
				variant="h6"
				noWrap
				component="a"
				href="/"
				sx={{
				mr: 2,
				display: { xs: 'none', md: 'flex' },
				fontFamily: 'monospace',
				fontWeight: 700,
				letterSpacing: '.3rem',
				color: 'inherit',
				textDecoration: 'none',
				}}
          	>
            	MFLS
          	</Typography>

        	<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
				<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={() => {setIsDrawerOpen(true); console.log(isDrawerOpen);}}
				color="inherit"
				>
            	<MenuIcon />
            	</IconButton>
          	</Box>
          	<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
				textDecoration: 'none',
				}}
          	>
            	MFLS
          	</Typography>
          	<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
				{pages.map((page) => (
					<NavbarMenuOptionComponent key={page.key} text={page.name} type={page.type} subOptions={page.subOption}></NavbarMenuOptionComponent>
				))}
            	<NavbarMenuOptionComponent text="Dash" type='singleOption'></NavbarMenuOptionComponent>
            
            
          	</Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/as.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <LeftDrawerMenuComponent isOpen={isDrawerOpen} setIsDrawerOpenFunction={setIsDrawerOpen} />
    </AppBar>
  );
}