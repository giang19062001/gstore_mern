import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Login from './login';
import Register from './register';
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {selectStatus} from "../../redux/user/user.selector";
import UserActionTypes from '../../redux/user/user.type'
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" duration ref={ref} {...props} />;
});


const  LoginRegister = ({onClick,valueOpen,status}) => {

  const [open,setOpen] = React.useState(valueOpen)
  const [openRegister,setOpenRegister] = React.useState(false)

  const handleOpenRegister  = () =>{
    setOpenRegister(true)
  }
  const handleOpenLogin  = () =>{
    setOpenRegister(false)
  }
  React.useEffect(() =>{
      if(status === UserActionTypes.SIGN_UP_SUCCESS){
        setOpenRegister(false)
       }
       if(status === UserActionTypes.SIGN_IN_SUCCESS){
        setOpen(false)
       }

  },[status])
  return (
      <Dialog open={open}  onClose={() => onClick(false)} keepMounted  TransitionComponent={Transition}>
        {openRegister === false 
        ?(
          <>
          <Login></Login>
        <Button variant='text' size='small' sx={{marginBottom:"3em"}}  onClick={handleOpenRegister}>Đăng kí</Button>
        </>
        )
        :(
          <>
         <Register></Register>
          <Button variant='text' size='small'  sx={{marginBottom:"2em"}} onClick={handleOpenLogin}>Đăng nhập</Button>
          </>
        )
      }
      </Dialog>
      
  );
}
const mapStateToProp = createStructuredSelector({
  status: selectStatus,
});

const mapDispatchToProp = (dispatch) => ({
 
});

export default connect(mapStateToProp, mapDispatchToProp)(LoginRegister);
