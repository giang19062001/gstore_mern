import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axiosNormal from '../../api/url.js'
import { useNavigate } from 'react-router-dom';
import { Stack, TextField } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, px: 8 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DialogUpdateIphone({openValue,onClose,valueDetail}) {
    const [dateChange, setDateChange] = React.useState({
       name:valueDetail.name,
       price:valueDetail.price
    });
    const [open, setOpen] = React.useState(openValue);
    const navigate = useNavigate()

    const handleUpdate = () =>{
        try { 
            axiosNormal.put(`/v1/iphone/${valueDetail.id}`,dateChange)
            .then(() => {
                navigate(0);
              });
        } catch (error) {
            throw error
        }
    }
  return (
    <div>

      <BootstrapDialog
        onClose={() => onClose()}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title"  onClose={() => onClose()}>
          Cập nhập sản phẩm 
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
             <TextField label="Tên sản phẩm" name='name' defaultValue={valueDetail.name}
              onChange={(e)=>setDateChange((preState)=>({...preState,name:e.target.value}))}></TextField>
              <TextField label="Gía thành" name='price' defaultValue={valueDetail.price}
                onChange={(e)=>setDateChange((preState)=>({...preState,price:parseInt(e.target.value)}))}></TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} >
            Lưu thay đổi
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
