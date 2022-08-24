import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import {Toolbar,Box,Grid,Container} from '@mui/material';
import Typography from '@mui/material/Typography';
import AppleIcon from '@mui/icons-material/Apple';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 80,
  },
}));

export default function Footer() {
  return (
    <Box sx={{ bottom:0,position:"relative",width:"100%"}}>
      <AppBar position="static">
        <StyledToolbar className='bg-neutral-900'>
          <Container>
            <Typography className='text-2xl mt-8'>GSTORE<AppleIcon></AppleIcon></Typography>
         <Grid container spacing={5} className='py-12'>
            <Grid item md={4} >
                    <Typography >Tổng đài</Typography>
                     <Typography>Mua hàng: 0764288649 (7:30 - 22:00)</Typography>
                     <Typography>CSKH: 0326370882 (8:00 - 21:30)</Typography>
                     <Typography>Kỹ thuật: 0326370882 (7:30 - 22:00)</Typography>
            </Grid>
            <Grid item  md={2}>
                     <Typography>Hệ thống cửa hàng</Typography>
                     <Typography>Nội quy cửa hàng</Typography>
                     <Typography>Chất lượng dịch vụ</Typography>
                     <Typography>Chính sách bảo hành</Typography>
            </Grid>
            <Grid item  md={3}>
                     <Typography>Hỗ trợ khách hàng</Typography>
                     <Typography>Chính sách giao hàng</Typography>
                     <Typography>Hướng dẫn mua online</Typography>
                     <Typography>Hướng dẫn thanh toán</Typography>
            </Grid>
            <Grid item  md={3}>
                     <Typography>Về thương hiệu GSTORE</Typography>
                     <Typography>Chính sách bảo mật</Typography>
                     <Typography>Bán hàng doanh nghiệp</Typography>
                     <Typography>Chính sách hoạt động</Typography>
            </Grid>
         </Grid>
         </Container>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}
