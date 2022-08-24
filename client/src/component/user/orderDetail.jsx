import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosNormal from "../../api/url";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Container, Typography,Stack, Grid, Divider, Paper } from "@mui/material";
import baseURL from '../../baseurl';

const OrderDetail = () =>{

    const params = useParams();
    const [data, setData] = useState();
    const [arrIphone, setArrIphone] = useState([]);

    useEffect(() => {
        const fetchDataOrder = async () => {
          try {
            const { data: response } = await axiosNormal.get(`/v1/order/${params.id}`
            );            
            setData(response);
          } catch (error) {
            console.error(error.message);
          }
        };
        fetchDataOrder();
      }, []);
      
      const fetchDataIphone = async (iphone) => {
        try {
          const { data: response } = await axiosNormal.get(`/v1/iphone/${iphone}`);            
             setArrIphone((preState) => [...preState,response])
         } catch (error) {
          console.error(error.message);
        }
      };
      useEffect(() =>{    
         data?.orderDetail.forEach((product) => {
          fetchDataIphone(product.iphone)
        })
    },[data])   
  

    const formatter = new Intl.NumberFormat('vi-VI', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 3
    })
  
    let date = new Date(data?.createdAt);
    date = date.toLocaleString()

    return(
        <Box className="m-12 py-5 sm:p-12">
           <Typography className="text-center pb-12 text-4xl md:text-5xl">Chi tiết <b className="text-amber-300">đơn hàng</b></Typography>
              <Grid container spacing={2} >
                <Grid item md={8} xs={12} >
                    <Typography>
                      <LocalShippingOutlinedIcon></LocalShippingOutlinedIcon> Thông tin vận chuyển : Vận chuyển nhanh (GSTORE - Xpress)
                    </Typography>
                    <Typography >
                      <HourglassTopIcon></HourglassTopIcon> Tình trạng giao hàng : 
                      {data?.status === 1 ? <b className='text-cyan-500' > Chờ xác nhận và đóng gói  </b>
                        : data?.status === 2 ?<b className='text-amber-400' >Đang vận chuyển </b>
                        : data?.status === 3 ?<b className='text-green-500' > Giao hàng thành công  </b>
                        : null}
                    </Typography>
                    <Typography>
                        <AccessTimeIcon></AccessTimeIcon> Ngày đặt hàng : {date}
                    </Typography>
                    <Typography>
                      <LocationOnOutlinedIcon></LocationOnOutlinedIcon>  Địa chỉ nhận hàng : {data?.addressDelivery}
                    </Typography>
                 </Grid>
                 <Grid item md={4} xs={12}>
                     <Typography>Mã đơn hàng : <strong className="uppercase"> {data?._id}</strong></Typography>
                     <Typography>Phương thức thanh toán : Thanh toán khi nhận hàng</Typography>

                     <Typography>Tổng giá trị đơn hàng : <b className="text-red-500">{formatter.format(data?.total)}</b></Typography>
                 </Grid>
              </Grid>
              <Divider className="my-6"></Divider>
            <Paper spacing={2} className='bg-neutral-50 p-12'>
                {arrIphone.map((iphone,index) =>(
                  <Box key={index}>
                         <img src={baseURL+"/"+iphone.photo?.[0]} alt="" className='w-44 md:w-96 mx-auto'/>       
                         <Box className='sm:mx-12 mx-1 text-center'>          
                             <Typography >{iphone.name}</Typography>
                             <Typography >Dung lượng : 128 GB</Typography>
                             <Typography >Số lượng đặt : {data.orderDetail[index]?.quantity}</Typography>
                             <Typography >Gía thành : {formatter.format(iphone?.price)}</Typography>
                         </Box >
                  </Box>
                ))}
             </Paper>
        </Box>
    

    )
}
export default OrderDetail