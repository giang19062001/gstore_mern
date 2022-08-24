import React,{useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography,Stack } from '@mui/material';
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {selectStatus} from "../../redux/user/user.selector";
import { signUpStart} from "../../redux/user/user.action"; 
import UserActionTypes from '../../redux/user/user.type'

const Register = ({status,registerDispatch}) =>{
    const [userRegister, setUserRegister] = useState({
        username: "",
        password: "",
        fullname:"",
        phone:"",
        address:"",    
    });
    
    //handleChange
const handleChange = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userRegister);
    registerDispatch(userRegister);
};
    return(
        <>
        <DialogTitle sx={{margin:"auto",fontWeight:"bold",fontFamily:"revert"}} > Register  </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{marginTop:"1em"}}>
              <Stack spacing={2}>
              <Stack  direction="row" spacing={1}>

              <TextField type="text"  label="User name" variant="outlined" name='username'  value={userRegister.username} onChange={handleChange} />
                  <TextField type="password" label="Password" variant="outlined" name='password'  value={userRegister.password} onChange={handleChange}/>
              </Stack>
              <Stack  direction="row" spacing={1}>
                  <TextField type="text"  label="Full name" variant="outlined" name='fullname'  value={userRegister.fullname} onChange={handleChange}/>
                  <TextField  type="text" label="Phone" variant="outlined" name='phone' value={userRegister.phone} onChange={handleChange}/>
              </Stack>
              <TextField  type="text" label="Address" multiline rows={2} variant="outlined" name='address' value={userRegister.address} onChange={handleChange} />
              </Stack>
              {status === UserActionTypes.SIGN_UP_PROCESSING ?(
                <Stack sx={{marginTop:5}}>
                        <LinearProgress />
                </Stack>
              ):null}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
            style={{color:"white", background: 'linear-gradient(to right, #33ccff 20%, #cc66ff 80%)',
            margin:"auto",borderRadius:"2em",width:"20em"}}
            onClick={handleSubmit}
            disabled={status === UserActionTypes.SIGN_UP_PROCESSING}
            >Đăng ký</Button>
          </DialogActions>
          <Typography textAlign={"center"} sx={{fontSize:"80%",marginY:"1em"}}>Nếu đã có tài khoản </Typography>
        </>
    )
}
const mapStateToProp = createStructuredSelector({
    status: selectStatus,
  });
  
const mapDispatchToProp = (dispatch) => ({
    registerDispatch: (registerInfo) => dispatch(signUpStart(registerInfo)),
});
  
export default connect(mapStateToProp, mapDispatchToProp)(Register);