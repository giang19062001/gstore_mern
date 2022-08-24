import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper,Container, Box, Typography} from '@mui/material';
import axiosNormal from "../../api/url";
import baseURL from '../../baseurl';

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

export default function UserList() {
    const [data,setData] = React.useState([])
   
  React.useEffect(() => {
    axiosNormal.get(`/v1/auth`)
      .then((response) => {
        setData(response.data);
      });
  }, []);
  console.log(data)

  return (
    <Box>
    <Typography align='center' className='font-bold text-2xl py-6'>Danh sách khách hàng</Typography>
    <TableContainer component={Container} className='pb-12 pt-6'>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >ID khách hàng</StyledTableCell>
            <StyledTableCell >Ảnh đại diện</StyledTableCell>
            <StyledTableCell >Họ tên</StyledTableCell>
            <StyledTableCell >Số điện thoại</StyledTableCell>
            <StyledTableCell >Địa chỉ</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {user._id}
              </StyledTableCell>
              {user?.avatar !== ""
              ?(<StyledTableCell >
                 <img src={baseURL+"/"+user?.avatar} alt="" className='w-12 h-12 rounded-full'/>
              </StyledTableCell>)
              :(
                <StyledTableCell >
                  <img src={require("../../assets/default.png")} alt="" className='w-12 h-12 rounded-full'/>
              </StyledTableCell>
              )}

              <StyledTableCell >{user.fullname}</StyledTableCell>
              <StyledTableCell >{user.phone}</StyledTableCell>
              <StyledTableCell >{user.address}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
