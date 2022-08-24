import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
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
import MailIcon from '@mui/icons-material/Mail';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppleIcon from '@mui/icons-material/Apple';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectShopCart } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { getOrderByUser } from '../../redux/order/order.action';
import {addNotify } from '../../redux/notify/notify.action';
import LoginRegister from './loginRegister';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LoginIcon from '@mui/icons-material/Login';
import { io } from "socket.io-client";
import { useEffect } from "react";
import baseURL from '../../baseurl'
import { selectNotify} from '../../redux/notify/notify.selector';
import {memo} from 'react'


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

const Appbar = ({cartList,user,getOrderByUserDispatch,addNotifyDispatch,notify}) => {

  const [open, setOpen] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openTool, setOpenTool] = React.useState(false);
  const [openNotify, setOpenNotify] = React.useState(false);

  useEffect(() => {
    if(user!==null){
      const socket = io(baseURL) 
      socket?.emit("User", user);
      socket?.on("getNotification", (data) => {
        addNotifyDispatch(data) 
      });
    }

  }, [user,addNotifyDispatch]);




  const handleNotify = () =>{
    if(openNotify === false ){
      setOpenNotify(true)
    }else{
      setOpenNotify(false)
    }
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenLogin = () =>{
      setOpenLogin(true)
  }
  const handleCloseLogin = (value) =>{
    setOpenLogin(value)
  }

  const handleGetOrder = () =>{
    getOrderByUserDispatch(user._id)
  }
  
  const handleTooltipClose = () => {
    setOpenTool(false);
  };

  const handleTooltipOpen = () => {
    setOpenTool(true);
  };

  return (
    <Box sx={{ display: 'flex',marginBottom:9 }}>
      <AppBar position="fixed" open={open} className="bg-black">
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1,position:"relative" }}  component="div">
          <IconButton size="medium" aria-label="show 4 new mails" color="inherit">    
               <Link to="/"><AppleIcon />GStore </Link>      
            </IconButton> 
          </Typography>
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
          <IconButton size="large"  color="inherit">
            <Link to="/cart">
              <Badge badgeContent={cartList.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </Link>
            </IconButton>
            <Tooltip title="Email : ngohoanggiang1906@gmail.com" 
            onClose={handleTooltipClose}
            open={openTool}>
            <IconButton size="large"  color="inherit" onClick={handleTooltipOpen}>
                <MailIcon />
            </IconButton>
            </Tooltip>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleNotify}
            >
              <Badge badgeContent={notify.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            </Box>
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
          {openNotify  && (
        <Box className="bg-slate-50 absolute top-12 right-0 p-5 flex flex-col border-2 divide-y">
           {notify.length === 0
            ?(
               <small className='text-black'>Chưa có bất kì thông báo nào</small>
            )
            :(
              notify.map((notic,index) =>(
              <>
              <Link key={index} to={`/order/orderDetail/${notic?.orderId}`} className="pb-2 text-black hover:text-sky-500">
               <small>{index+1} ) Bạn có đơn hàng vừa được cập nhập</small></Link>
              </>
              )
            ))
          }
        </Box>
      )}
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
          {user === null 
         ?( <ListItem  disablePadding>
              <ListItemButton onClick={handleOpenLogin}>
                <ListItemIcon>
                   <LoginIcon></LoginIcon>
                </ListItemIcon>
                <ListItemText  primary="Đăng nhập / Đăng kí"/>
              </ListItemButton>
          </ListItem>)
          :(<ListItem  disablePadding>
            <Link to={`/user/${user._id}`}>
              <ListItemButton >
                <ListItemIcon>
                    <AccountCircle></AccountCircle>
                </ListItemIcon>
                <ListItemText  primary="Thông tin cá nhân"/>
              </ListItemButton>
           </Link>
          </ListItem>)}
          <ListItem  disablePadding>
            <Link to="/order">
              <ListItemButton  onClick={handleGetOrder} >
                <ListItemIcon>
                     <LibraryBooksIcon></LibraryBooksIcon>
                </ListItemIcon>
                <ListItemText  primary="Đơn mua"/>
              </ListItemButton>
           </Link>
          </ListItem>
        </List>
       {/* mobile */}
      </Drawer>
      {openLogin === true ? <LoginRegister valueOpen={openLogin} onClick={handleCloseLogin}/> : null}
    </Box>
  );
}
const mapStateToProp = createStructuredSelector({
  cartList: selectShopCart,
  user:selectCurrentUser,
  notify:selectNotify
});

const mapDispatchToProp = (dispatch) => ({
  getOrderByUserDispatch : (orderUser) => dispatch(getOrderByUser(orderUser)),
  addNotifyDispatch : (notify) => dispatch(addNotify(notify))

});

export default connect(mapStateToProp, mapDispatchToProp)(memo(Appbar));