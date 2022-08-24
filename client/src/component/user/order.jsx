import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import {Box,Container,Stack,Paper} from '@mui/material';
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectOrderList } from '../../redux/order/order.selector';
import { Link } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function positionProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
    padding:20
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


const formatter = new Intl.NumberFormat('vi-VI', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 3
})

const Order = ({orderList}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log((orderList))

  return (
    <Stack className='bg-gray-200 py-12'>
     <Container  maxWidth="md">
        <Box className="bg-slate-50 ">
        <Box>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Chờ đóng gói" {...positionProps(1)} className='md:text-base text-xs' />
            <Tab label="Đang vận chuyển" {...positionProps(2)} className='md:text-base text-xs' />
            <Tab label="Giao thành công" {...positionProps(3)} className='md:text-base text-xs' />

            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>

           <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow >
                <StyledTableCell  align='center' className='font-semibold	'>STT</StyledTableCell>
                  <StyledTableCell  align='center' className='font-semibold	'>Địa chỉ nhận hàng </StyledTableCell>
                  <StyledTableCell  align='center' className='font-semibold	'>Tổng tiền</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {orderList.some(orderCheck => orderCheck.status === 1)
                ?(
                  orderList.map((order,index) => (
                    order.status === 1
                   ?(<StyledTableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell align='center'>{index+1}</StyledTableCell>
                      <StyledTableCell align='center'>{order.addressDelivery}</StyledTableCell>
                      <StyledTableCell  align='center'>{formatter.format(order.total)}</StyledTableCell>
                      <StyledTableCell  align='center'>
                           <Link to={`/order/orderDetail/${order._id}`}
                            className="text-slate-100 bg-sky-500 hover:bg-sky-700 rounded-lg p-2">Chi tiết</Link>
                      </StyledTableCell>
  
                    </StyledTableRow>)
                    : (
                     null
                    )
                  ))
                )
                :(
                  <StyledTableRow>
                    <StyledTableCell colSpan={4} align="center">Bạn chưa có đơn hàng nào</StyledTableCell>
                   </StyledTableRow>                 
                )
                }
              </TableBody>
            </Table>
          </TableContainer>
         
        </TabPanel>
        <TabPanel value={value} index={1}>
          
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow >
                <StyledTableCell  align='center' className='font-semibold	'>STT</StyledTableCell>
                  <StyledTableCell  align='center' className='font-semibold	'>Địa chỉ nhận hàng</StyledTableCell>
                  <StyledTableCell  align='center' className='font-semibold	'>Tổng tiền</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
              {orderList.some(orderCheck => orderCheck.status === 2)
                ?(
                  orderList.map((order,index) => (
                    order.status === 2
                   ?(<StyledTableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell align='center'>{index+1}</StyledTableCell>
                      <StyledTableCell align='center'>{order.addressDelivery}</StyledTableCell>
                      <StyledTableCell  align='center'>{formatter.format(order.total)}</StyledTableCell>
                      <StyledTableCell  align='center'>
                           <Link to={`/order/orderDetail/${order._id}`}
                            className="text-slate-100 bg-sky-500 hover:bg-sky-700 rounded-lg p-2">Chi tiết</Link>
                      </StyledTableCell>
  
                    </StyledTableRow>)
                    : (
                     null
                    )
                  ))
                )
                :(
                  <StyledTableRow>
                    <StyledTableCell colSpan={4} align="center">Bạn chưa có đơn hàng nào</StyledTableCell>
                   </StyledTableRow>                 
                )
                }
              </TableBody>
            </Table>
          </TableContainer>

        </TabPanel>

        <TabPanel value={value} index={2}>
                 <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow >
                <StyledTableCell  align='center' className='font-semibold	'>STT</StyledTableCell>
                  <StyledTableCell  align='center' className='font-semibold	'>Địa chỉ nhận hàng</StyledTableCell>
                  <StyledTableCell  align='center' className='font-semibold	'>Tổng tiền</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
              {orderList.some(orderCheck => orderCheck.status === 3)
                ?(
                  orderList.map((order,index) => (
                    order.status === 3
                   ?(<StyledTableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell align='center'>{index+1}</StyledTableCell>
                      <StyledTableCell align='center'>{order.addressDelivery}</StyledTableCell>
                      <StyledTableCell  align='center'>{formatter.format(order.total)}</StyledTableCell>
                      <StyledTableCell  align='center'>
                           <Link to={`/order/orderDetail/${order._id}`}
                            className="text-slate-100 bg-sky-500 hover:bg-sky-700 rounded-lg p-2">Chi tiết</Link>
                      </StyledTableCell>
  
                    </StyledTableRow>)
                    : (
                     null
                    )
                  ))
                )
                :(
                  <StyledTableRow>
                    <StyledTableCell colSpan={4} align="center">Bạn chưa có đơn hàng nào</StyledTableCell>
                   </StyledTableRow>                 
                )
                }
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        </Box>
      </Container>
    </Stack>
  );
}
const mapStateToProp = createStructuredSelector({
  orderList : selectOrderList
});

const mapDispatchToProp = (dispatch) => ({
});

export default connect(mapStateToProp, mapDispatchToProp)(Order);