import React,{useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography,Box,Alert,Snackbar,AlertTitle } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountCircle from '@mui/icons-material/AccountCircle';
import '../../css/login.scss'
import {  useNavigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {selectStatus} from "../../redux/user/user.selector";
import { signInStart} from "../../redux/user/user.action"; 
import UserActionTypes from '../../redux/user/user.type'

const Login = ({status,loginDispatch}) =>{
  const navigate = useNavigate()

   const [userLogin, setUserLogin] = useState({
       username: "",
       password: "",
   });
   
   //handleChange
const handleChange = (e) => {
  setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   loginDispatch(userLogin,navigate);
};
    return (
        <>
       <DialogTitle sx={{margin:"auto",fontWeight:"bold",fontFamily:"revert"}} > Login  </DialogTitle>
       {status === UserActionTypes.SIGN_UP_SUCCESS ?(
              <Snackbar open={true} autoHideDuration={4000}  anchorOrigin={{vertical:"top", horizontal:"right"}} className="snackbarAlert">
                  <Alert variant="filled"  severity="success" sx={{ width: '100%' }}>
                      <AlertTitle>Success</AlertTitle>
                          <strong>Đăng kí tài khoản thành công</strong>
                  </Alert>
             </Snackbar>
              ):null}
        <DialogContent>
          <DialogContentText >
            <Box sx={{ display: 'flex', alignItems: 'flex-end',marginBottom:"1em" }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField fullWidth label="User name" variant="standard" name="username" onChange={handleChange}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField fullWidth type="password" label="Password" variant="standard" name="password" onChange={handleChange} />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
          style={{color:"white", background: 'linear-gradient(to right, #33ccff 20%, #cc66ff 80%)',
          margin:"auto",borderRadius:"2em",width:"16em" }}
          onClick={handleSubmit}
          >Đăng nhập
          </Button>
        </DialogActions>

        <Typography textAlign={"center"} sx={{fontSize:"80%",marginY:"1em"}}>Nếu chưa có tài khoản </Typography>
        </>
    )
}
const mapStateToProp = createStructuredSelector({
  status: selectStatus,
});

const mapDispatchToProp = (dispatch) => ({
  loginDispatch: (loginInfo,navigate) => dispatch(signInStart(loginInfo,navigate)),
});

export default connect(mapStateToProp, mapDispatchToProp)(Login);