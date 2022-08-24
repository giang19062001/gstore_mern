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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axiosNormal from '../../api/url.js'
import { useNavigate } from 'react-router-dom';
import baseURL from '../../baseurl.js';
import { io } from "socket.io-client";


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

const DialogUpdate = ({openValue,onClose,valueDetail}) => {
    const [status, setStatus] = React.useState(valueDetail.value);
    const [open, setOpen] = React.useState(openValue);

    const navigate = useNavigate()
    const handleChange = (event) => {
        setStatus(event.target.value);
      };
    const handleUpdate = () =>{
        try { 
            handleNotification()
            axiosNormal.put(`/v1/order/${valueDetail.id}`,{status:status})
            .then(() => {
                navigate(0);
              });
        } catch (error) {
            throw  error
        }
    }
    const handleNotification = () => {
      const socketAdmin = io(baseURL)
      socketAdmin?.emit("sendNotification", { 
        sendUserId: valueDetail.user, 
        orderId:valueDetail.id
      });
    };
  return (
    <div>

      <BootstrapDialog
        onClose={() => onClose()}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title"  onClose={() => onClose()}>
          Cập nhập trạng thái 
        </BootstrapDialogTitle>
        <DialogContent dividers>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="status"
                onChange={handleChange}
                >
                <MenuItem value={1} >Chờ xác nhận và đóng gói</MenuItem>
                <MenuItem value={2}>Đang vận chuyển</MenuItem>
                <MenuItem value={3}>Giao hàng thành công</MenuItem>
                </Select>
            </FormControl>
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
export default DialogUpdate