import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {Grid,Container,Typography,Box,Button,Divider,Stack } from '@mui/material';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import LoopIcon from '@mui/icons-material/Loop';
import GppGoodIcon from '@mui/icons-material/GppGood';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CallIcon from '@mui/icons-material/Call';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axiosNormal from "../../api/url";
import baseURL from "../../baseurl";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {addItemCart} from "../../redux/cart/cart.action"
import { selectShopCart } from "../../redux/cart/cart.selector";


const ProductDetail = ({addCartMiddleware,cartList}) =>{
  const formatter = new Intl.NumberFormat('vi-VI', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 3
  })
    const params = useParams();

    const [data, setData] = useState([]);
    const [addSuccess,setAddSuccess] = useState(false)
    const [addFailed,setAddFailed] = useState(false)



    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data: response } = await axiosNormal.get(`/v1/iphone/${params.id}`
            );            

            setData(response);
          } catch (error) {
            console.error(error.message);
          }
        };
        fetchData();
      }, []);

      const handleAdd = async (e) => {
        const quantityOnCart  = cartList.find(item => item._id === params.id)
        if(quantityOnCart?.quantity === 10 ){
          setAddFailed(true)
        }else{
          setAddSuccess(true)
          const quantity = 1;
          addCartMiddleware({ ...data, quantity });
        }
      };
      useEffect(() => {
        setTimeout(() => {
          setAddFailed(false);
        }, 3000);
        setTimeout(() => {
          setAddSuccess(false);
        }, 3000);
      }, [addSuccess,addFailed]);  
    return(
       <Container >
         <Grid container className="mb-12">
             <Grid item md={6}>
               <img className="" src={baseURL+"/"+data?.photo?.[0]} alt=""/>
             </Grid>
             <Grid item md={6}>
                 <Box className="pt-12">
                    <Typography variant="h3" className="font-semibold font-mono">{data.name}</Typography>
                    <Typography className="font-semibold mt-5 mb-5">{formatter.format(data.price)}</Typography>
                    <Typography className="font-medium mt-5 mb-5">Dung lượng : 128GB</Typography>
                    <Typography className="mb-5 text-justify">{data.description}</Typography>
                    <Divider/>
                    <Box  className="my-5">
                      <Typography><AllInboxIcon></AllInboxIcon>  Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim</Typography>
                        <Typography><LoopIcon></LoopIcon> Hư gì đổi nấy 12 tháng tại 3306 siêu thị trên toàn quốc </Typography>
                        <Typography><GppGoodIcon></GppGoodIcon> Bảo hành chính hãng 1 năm</Typography>
                        <Typography><LocalShippingIcon></LocalShippingIcon>   Giao hàng nhanh toàn quốc</Typography>
                        <Typography><CallIcon></CallIcon> Tổng đài: 1900.9696.42 (9h00 - 21h00 mỗi ngày)</Typography>
                    </Box>
                    <Divider/>

                     <Button fullWidth className="bg-sky-500 hover:bg-sky-600 text-slate-50 mt-5"
                      onClick={(e) => handleAdd(data._id, e)}
                     >Mua ngay</Button>
                 </Box>
             </Grid>
         </Grid>
         <Stack  direction="row" className="mb-12">
               <img className="float-left w-6/12 mr-1 border-stone-100 border-2" src={baseURL+"/"+data?.photo?.[1]} alt=""/>
               <img className="float-right  w-6/12 border-stone-100 border-2"  src={baseURL+"/"+data?.photo?.[2]} alt=""/>
          </Stack>
          {addSuccess === true ? (
              <Alert severity="success" className="right-5 top-20 w-18 fixed">
                  <AlertTitle>Success</AlertTitle>
                    <strong>Đã thêm sản phẩm vào giỏ hàng</strong>
              </Alert>
          ) : null}
             {addFailed === true ? (
              <Alert severity="error" className="right-5 top-20 w-18 fixed">
                  <AlertTitle>Failed</AlertTitle>
                    <strong>Sản phẩm đã thêm vượt quá số lượng cho phép</strong>
              </Alert>
          ) : null}
          

       </Container>
        )
}

const mapStateToProp = createStructuredSelector({
  cartList: selectShopCart,

});

const mapDispatchToProp = (dispatch) => ({
  addCartMiddleware: (cartInfo) => dispatch(addItemCart(cartInfo)),
});

export default connect(mapStateToProp, mapDispatchToProp)(ProductDetail);