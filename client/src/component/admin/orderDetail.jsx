import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Box,Container, Typography, Stack} from '@mui/material';
import axiosNormal from "../../api/url";
import baseURL from "../../baseurl";

export default function OrderDetail() {
  const formatter = new Intl.NumberFormat('vi-VI', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 3
  })

    const params = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState();
    const [iphone, setIphone] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data: response } = await axiosNormal.get(`/v1/order/${params.id}`
            );            

            setData(response);
          } catch (error) {
            console.error(error.message);
          }
        };
        fetchData();
      }, []);
      const fetchUser = async (id) => {
        try {
          const { data: response } = await axiosNormal.get(`/v1/auth/${id}`
          );            
          setUser(response);
        } catch (error) {
          console.error(error.message);
        }
      };
      const fetchIphone = async (idIphone) => {
        try {
          const { data: response } = await axiosNormal.get(`/v1/iphone/${idIphone}`
          );            
          setIphone((preState) => [...preState,response]);
        } catch (error) {
          console.error(error.message);
        }
      };
      useEffect(() => {
        fetchUser(data.user);
        console.log( data.orderDetail?.length)
           for(let i = 0 ; i < data.orderDetail?.length ;i++){
              fetchIphone(data.orderDetail[i].iphone)
           }
      }, [data]);
      
console.log("iphone",iphone)

  return (
    <Box>
       <Container>
        <Stack className="pt-5">
       <Typography >Khách đặt hàng : {user?.fullname}</Typography>
       <Typography >Số điện thoại khách hàng : {user?.phone}</Typography>
       <Typography >Gía thành : <b className='text-red-500'>{formatter.format(data.total)}</b></Typography>
        <Typography >Thời gian đặt hàng : { new Date(data.createdAt).toLocaleString()}</Typography>
       <Typography>Địa điểm giao hàng : {data.addressDelivery}</Typography>
       {data?.status === 1 ? <Typography>Tình trạng : <b className='text-cyan-500'>Chờ xác nhận và đóng gói </b> </Typography>
                        : data?.status === 2 ?<Typography >Tình trạng : <b  className='text-amber-400'>Đang vận chuyển </b></Typography>
                        : data?.status === 3 ?<Typography > Tình trạng : <b className='text-green-500' >Giao hàng thành công </b> </Typography>
                        : null}
                  
       </Stack >

       <Stack spacing={2} className="py-6">
       {iphone.map((product,index)=>(
            <Box key={index} >
                 <img src={baseURL+'/'+product.photo?.[0]} alt="" className="w-60 mx-auto"/>
                 <Typography align="center">Tên sản phẩm : {product.name}</Typography>
                 <Typography align="center">Số lượng đặt hàng : {data.orderDetail[index]?.quantity}</Typography>
                 <Typography align="center">Gía sản phẩm : {formatter.format(product.price)}</Typography>

            </Box>
           ))}
        </Stack>
       </Container> 
    </Box>
  );
}
