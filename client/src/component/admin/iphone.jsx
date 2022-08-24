import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button,Container, Box, Typography} from '@mui/material';
import axiosNormal from "../../api/url";
import baseURL from '../../baseurl';
import AddIphone from './formAddIphone';
import { useNavigate } from 'react-router-dom';
import DialogUpdateIphone from './dialogUpdateIphone';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
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

const Iphone = () => {

    const formatter = new Intl.NumberFormat('vi-VI', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 3
      })

    const [data,setData] = React.useState([])
    const [iphoneDetail,setIphoneDetail] = React.useState({
       id:"",
       name:"",
       price:0
    })
    const [openUpdate,setOpenUpdate] = React.useState(false);
    const navigate = useNavigate()

  React.useEffect(() => {
    axiosNormal.get(`/v1/iphone`)
      .then((response) => {
        setData(response.data);
      });
  }, []);
  
  const handleUnBlock = (id) =>{
     console.log("idp",id) 
     axiosNormal.put(`v1/iphone/${id}`,{display:true})
      .then(()=>{
        navigate(0)
      })
  } 
  const handleBlock = (id) =>{
    console.log("idp",id) 
    axiosNormal.put(`v1/iphone/${id}`,{display:false})
     .then(()=>{
       navigate(0)
     })
 } 
  return (
    <Box>
    <Typography align='center' className='font-bold text-2xl py-6'>Danh sách sản phẩm</Typography>
    <AddIphone></AddIphone>
    <TableContainer component={Container} className='pb-12 pt-6'>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >STT</StyledTableCell>
            <StyledTableCell >Tên sản phẩm</StyledTableCell>
            <StyledTableCell >Gía tiền</StyledTableCell>
            <StyledTableCell >Ảnh minh họa </StyledTableCell>
            <StyledTableCell > </StyledTableCell>
            <StyledTableCell ></StyledTableCell>

         
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((iphone,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {index}
              </StyledTableCell>
              <StyledTableCell >{iphone.name}</StyledTableCell>
              <StyledTableCell >{formatter.format(iphone.price)}</StyledTableCell>
              <StyledTableCell >
                  <img src={baseURL+'/'+iphone.photo?.[0]} alt="" className="w-40 h-40"/>

              </StyledTableCell>
              <StyledTableCell >
                   <Button className='bg-amber-500 hover:bg-amber-700 text-slate-50 text-xs'
                    onClick={()=> {setOpenUpdate(true); setIphoneDetail({id:iphone._id,name:iphone.name,price:iphone.price})}}
                   >Cập nhập</Button>
              </StyledTableCell>
              <StyledTableCell >
                {iphone.display === true
                 ?(<Button className='bg-red-500 hover:bg-red-700 text-slate-50 text-xs' onClick={() => handleBlock(iphone._id)}>Khóa</Button>)
                 :(<Button className='bg-green-500 hover:bg-green-700 text-slate-50 text-xs' onClick={() => handleUnBlock(iphone._id)}>Mở khóa</Button>)}
              </StyledTableCell>

            </StyledTableRow>
          ))}
            {openUpdate === true 
          ?(<DialogUpdateIphone valueDetail={iphoneDetail} openValue={openUpdate} onClose={()=>setOpenUpdate(false)}></DialogUpdateIphone>):null}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
export default Iphone