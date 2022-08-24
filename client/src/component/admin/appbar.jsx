import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppleIcon from '@mui/icons-material/Apple';
import { Link } from "react-router-dom";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
const drawerWidth = 210;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const AppbarAdmin = () => {

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex',marginBottom:9 }}>
      <AppBar position="fixed" open={open} className="bg-black">
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}  component="div">
          <IconButton size="medium" aria-label="show 4 new mails" color="inherit">    
               <Link to="/admin"><AppleIcon />GStore </Link>      
            </IconButton> 
          </Typography>
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
          <IconButton 
            color="inherit"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader className='bg-black'>
          <IconButton onClick={handleDrawerClose} className="text-slate-50 font-semibold">
                 <CloseIcon />&emsp;GSTORE 
           </IconButton>
        </DrawerHeader>
        <Divider />
        {/* mobile */}
        <List>
          <ListItem  disablePadding>
            <Link to="/admin/product">
              <ListItemButton >
                <ListItemIcon>
                     <SupervisedUserCircleIcon></SupervisedUserCircleIcon>
                </ListItemIcon>
                <ListItemText  primary="Danh sách Khách hàng"/>
              </ListItemButton>
           </Link>
          </ListItem>
          <ListItem  disablePadding>
            <Link to="/admin/order">
              <ListItemButton >
                <ListItemIcon>
                     <LibraryBooksIcon></LibraryBooksIcon>
                </ListItemIcon>
                <ListItemText  primary="Danh sách đơn hàng"/>
              </ListItemButton>
           </Link>
          </ListItem>

          <ListItem  disablePadding className='bg-neutral-900 '>
            <Link to="/">
              <ListItemButton >
              <ListItemIcon>
                     <PowerSettingsNewIcon className='text-slate-50'></PowerSettingsNewIcon>
                </ListItemIcon>
                    <Typography className='text-slate-50'>Đăng xuất</Typography>
               </ListItemButton>
           </Link>
          </ListItem>
        </List>
       {/* mobile */}
      </Drawer>
    </Box>
  );
}
export default AppbarAdmin
