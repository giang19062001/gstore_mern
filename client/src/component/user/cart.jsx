
import {Container,Box,Typography,Stack,Paper,Button, TextField} from '@mui/material';
import { connect } from "react-redux";
import { deleteItemCart,addItemCart } from "../../redux/cart/cart.action";
import {createOrder,createOrderDetail} from "../../redux/order/order.action"
import { selectShopCart } from "../../redux/cart/cart.selector";
import { createStructuredSelector } from "reselect";
import baseURL from '../../baseurl';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { useState,useEffect } from 'react';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectOrderStatus } from '../../redux/order/order.selector';
import orderActionType from '../../redux/order/order.type';
import LoginRegister from './loginRegister';
import OrderDialog from './orderSuccess';

const Cart = ({addCartDispatch,deleteCartDispatch,cartList,user,addOrderDispatch,status}) =>{
  
  const [order,setOrder] = React.useState({ 
    user:user?._id,
    addressDelivery:"",
    total:"",
    status:1,
    "orderDetail":[]
   });
   const [orderDetail,setOrderDetail] = React.useState([])
  const [openLogin, setOpenLogin] = React.useState(false);

    const formatter = new Intl.NumberFormat('vi-VI', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 3
      })
      const handleDelete = (e) => {
        deleteCartDispatch(e);
      };
      const handleAdd = async (e) => {
        const response = cartList.find(item => item?._id === e)
        console.log(response)
        const quantity = 1;
        addCartDispatch({ ...response, quantity });
      };
      const handleSub = async (e) => {
        const response = cartList.find(item => item?._id === e)
        console.log(response)
        const quantity = -1;
        addCartDispatch({ ...response, quantity });
      };

      const [total,setTotal] = useState(0);
      useEffect(()=>{
        const totalSum = cartList.reduce(
          (preValue, currentValue)=>preValue+currentValue.price*currentValue.quantity,0)
        setTotal(totalSum)
        setOrder((preState) => ({
          ...preState,
          total: totalSum,
        }));
        setOrderDetail(cartList)
      },[cartList])

    const handleOpenLogin = () =>{
        setOpenLogin(true)
    }
    const handleCloseLogin = (value) =>{
      setOpenLogin(value)
    }

    const handleOrder = () =>{
       console.log(order)
       addOrderDispatch(order)
    }
    
    return(
  <Stack className='bg-gray-200 mt-12'>
         <Container maxWidth="md"  >
                <Paper className='rounded-lg  sm:p-12 p-5 sm:m-12 my-12 bg-stone-50 ' >
                <TextField
                  className='mb-12'
                  fullWidth
                  placeholder="Search Google Maps"
                  onChange={(e) => setOrder((preState) => ({...preState,addressDelivery:e.target.value}))}
                />
                {cartList.length === 0 
                  ?( 
                   <Box>
                    <Typography align='center'>Bạn chưa có sản phẩm nào trong giỏ hàng</Typography>
                  </Box>)
                  :( cartList.map((cart,index) =>(
                    <Box key={index} className='flex flex-wrap border-b-2 p-5' >
                            <img src={baseURL+"/"+cart.photo?.[0]} alt="" className='w-16 md:w-20  flex-auto'/>           
                             <Box className='flex-auto  sm:mx-12 mx-1'>
                             <Typography >{cart.name}</Typography>
                             <Typography >Dung lượng : 128 GB</Typography>
                            </Box >
                             <Box className='flex-auto sm:mx-12  mx-1 sm:mt-0 mt-5'>
                             <Typography>{formatter.format(cart.price)}</Typography>
                                <IconButton  onClick={(e) => handleSub(cart?._id, e)} disabled={cart.quantity === 1}>
                                   <RemoveIcon></RemoveIcon>
                                </IconButton>
                                <Typography variant="standard" className='w-5'>{cart.quantity}</Typography>
                                <IconButton   onClick={(e) => handleAdd(cart?._id, e)} disabled={cart.quantity === 10}>
                                   <AddIcon></AddIcon>
                                </IconButton>
                                
                            </Box>
                            <Button onClick={(e) => handleDelete(cart?._id, e)} variant='text' color='error' className='flex-auto  w-12' >Xóa</Button>  
                    </Box>            
                    ))
                  )}

                       <Box className='my-5'>
                          <Typography className='float-left font-semibold'>Tổng tiền</Typography>
                          <Typography className='float-right text-red-500'>{formatter.format(total)}</Typography>
                       </Box>
                       {user !== null 
                       ?(<Stack className='mt-12'>
                       <Button variant='contained' className='mt-10 mx-auto bg-sky-500 hover:bg-sky-600' 
                       fullWidth  onClick={handleOrder} disabled={status===orderActionType.CREATE_ORDER_PROCESSING} >Đặt hàng</Button>
                       </Stack>)
                       : (
                       <Stack className='mt-12'>
                       <Button variant='contained' className='mt-10 mx-auto bg-sky-500 hover:bg-sky-600' fullWidth onClick={handleOpenLogin} >Đặt hàng</Button>
                       </Stack>)}
                       {openLogin === true ? <LoginRegister valueOpen={openLogin} onClick={handleCloseLogin}/> : null}
                       {status === orderActionType.CREATE_ORDER_DETAIL_SUCCESS ?(<OrderDialog value={true}></OrderDialog>):null}
                </Paper>

        </Container>
   </Stack>
        
    )
}
const mapStateToProp = createStructuredSelector({
    cartList: selectShopCart,
    user : selectCurrentUser,
    status : selectOrderStatus
  });
  
  const mapDispatchToProp = (dispatch) => ({
    addCartDispatch: (cartInfo) => dispatch(addItemCart(cartInfo)),
    deleteCartDispatch: (idItem) => dispatch(deleteItemCart(idItem)),
    addOrderDispatch : (orderInfo) => dispatch(createOrder(orderInfo))  });
  
  export default connect(mapStateToProp, mapDispatchToProp)(Cart);