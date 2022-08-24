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

export default function FooterAdmin() {
  return (
    <Box sx={{ bottom:0,position:"relative",width:"100%",marginTop:"20em"}}>
      <AppBar position="static">
        <StyledToolbar className='bg-neutral-900'>
          <Container>
            <Typography className='text-2xl mt-8 text-center p-6'>GSTORE</Typography>
        
         </Container>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}
