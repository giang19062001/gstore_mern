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
                    <Typography className="font-medium mt-5 mb-5">Dung l?????ng : 128GB</Typography>
                    <Typography className="mb-5 text-justify">{data.description}</Typography>
                    <Divider/>
                    <Box  className="my-5">
                      <Typography><AllInboxIcon></AllInboxIcon>  B??? s???n ph???m g???m: H???p, S??ch h?????ng d???n, C??y l???y sim</Typography>
                        <Typography><LoopIcon></LoopIcon> H?? g?? ?????i n???y 12 th??ng t???i 3306 si??u th??? tr??n to??n qu???c </Typography>
                        <Typography><GppGoodIcon></GppGoodIcon> Ba??o ha??nh ch??nh h??ng 1 n??m</Typography>
                        <Typography><LocalShippingIcon></LocalShippingIcon>   Giao h??ng nhanh to??n qu???c</Typography>
                        <Typography><CallIcon></CallIcon> T???ng ????i: 1900.9696.42 (9h00 - 21h00 m???i ng??y)</Typography>
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
                    <strong>???? th??m s???n ph???m v??o gi??? h??ng</strong>
              </Alert>
          ) : null}
             {addFailed === true ? (
              <Alert severity="error" className="right-5 top-20 w-18 fixed">
                  <AlertTitle>Failed</AlertTitle>
                    <strong>S???n ph???m ???? th??m v?????t qu?? s??? l?????ng cho ph??p</strong>
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