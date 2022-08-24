import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Container, Box, Typography, Button} from '@mui/material';
import axiosNormal from "../../api/url";
import { Link } from "react-router-dom";
import DialogUpdate from './dialogUpdate';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function OrderList() {

    const [data,setData] = React.useState([])
    const [dataDetail,setDataDetail] = React.useState({
       id:"",
       value:0,
       user:""
    })
    const [openUpdate,setOpenUpdate] = React.useState(false);

  React.useEffect(() => {
    axiosNormal.get(`/v1/order`)
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const formatter = new Intl.NumberFormat('vi-VI', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 3
  })


console.log(data)
  return (
    <Box>
    <Typography align='center' className='font-bold text-2xl py-6'>Danh sách đơn hàng</Typography>
    <TableContainer component={Container} className='pb-12 pt-6'>
      <Table sx={{ minWidth: 1000 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >ID người dùng đặt hàng</StyledTableCell>
            <StyledTableCell >Tình trạng đơn hàng</StyledTableCell>
            <StyledTableCell >Thời gian đặt hàng</StyledTableCell>
            <StyledTableCell >Địa chỉ giao hàng</StyledTableCell>
            <StyledTableCell >Tổng giá trị đơn hàng</StyledTableCell>
            <StyledTableCell ></StyledTableCell>
            <StyledTableCell ></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((order,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {order.user}
              </StyledTableCell>
              {order?.status === 1 ? <StyledTableCell className='text-cyan-500' > Chờ xác nhận và đóng gói  </StyledTableCell>
                        : order?.status === 2 ?<StyledTableCell className='text-amber-400' >Đang vận chuyển </StyledTableCell>
                        : order?.status === 3 ?<StyledTableCell className='text-green-500' > Giao hàng thành công  </StyledTableCell>
                        : null}
               <StyledTableCell >{ new Date(order.createdAt).toLocaleString()}</StyledTableCell>

              <StyledTableCell >{formatter.format(order.total)}</StyledTableCell>
              <StyledTableCell >{order.addressDelivery}</StyledTableCell>
              <StyledTableCell >
                   <Button className='bg-amber-500 hover:bg-amber-700 text-slate-50 text-xs' 
                   onClick={()=> {setOpenUpdate(true); setDataDetail({id:order._id,value:order.status,user:order.user})}}>Cập nhập</Button>
              </StyledTableCell>

              <StyledTableCell >
                <Link to={`/admin/order/orderDetail/${order._id}`}>
                    <Button className='bg-sky-500 hover:bg-sky-700 text-slate-50 text-xs'>Xem chi tiết</Button>
               </Link>
              </StyledTableCell>

            </StyledTableRow>
          ))}
          {openUpdate === true 
          ?(<DialogUpdate valueDetail={dataDetail} openValue={openUpdate} onClose={()=>setOpenUpdate(false)}></DialogUpdate>):null}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
