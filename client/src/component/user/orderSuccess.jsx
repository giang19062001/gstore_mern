import * as React from 'react';
import {Button,Typography} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import {StopAllAction} from "../../redux/order/order.action"
import { createStructuredSelector } from "reselect";



 function OrderDialog({value,StopAllActionDispatch}) {
    console.log(value)

  const [open, setOpen] = React.useState(value);

  const handleClose = () => {
    setOpen(false);
    StopAllActionDispatch();
  };
  
  const handleStop = () =>{
    StopAllActionDispatch();

  }
  return (
    <div>
  
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <img src={require("../../assets/tick-xanh.png")} alt='' width={200} ></img>
            <Typography align='center'>Đặt hàng thành công</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Link to="/order" >
           <Button onClick={handleStop} >Xem đơn hàng </Button>
        </Link>
        
          <Button onClick={handleClose} >Trở về
            
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProp = createStructuredSelector({
});

const mapDispatchToProp = (dispatch) => ({ 
  StopAllActionDispatch : () => dispatch(StopAllAction()) 

 });

export default connect(mapStateToProp, mapDispatchToProp)(OrderDialog);
