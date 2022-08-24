import React, { useState } from "react";
import {Box,Container,Grid,Button, TextField,Alert,Snackbar,AlertTitle} from '@mui/material';
import '../../css/user.scss'
import { createStructuredSelector } from "reselect";
import { connect,useDispatch } from "react-redux";
import {signOutStart,saveUserStart} from "../../redux/user/user.action"; 
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from '../../redux/user/user.selector';
import { createAxios } from '../../api/url';
import { refreshUser } from '../../redux/user/user.action';
import baseURL from '../../baseurl';
import {selectStatus} from "../../redux/user/user.selector";
import UserActionTypes from '../../redux/user/user.type'



const UserInfo = ({logoutDispatch,user,saveUserDispatch,status}) =>{
  //logout
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let axiosJWT = createAxios(user,dispatch,refreshUser)

    const handleLogout = () =>{
        logoutDispatch(navigate,axiosJWT)
    }
//save
const [userDetail, setUserDetail] = useState({
    fullname: user.fullname,
    phone: user.phone,
    address: user.address,
    avatar:undefined
  });

  const handleChange = (event) =>{
    setUserDetail((preState) => ({
        ...preState,
        [event.target.name]: event.target.value,
      }));
  }

  
  const handleImage = (event) => {
    const files = event.target.files;
    const file = files[0];
    setUserDetail((preState) => ({
      ...preState,
      avatar: file,
    }));
  };

  const handleSave = () =>{
    console.log(userDetail)
    saveUserDispatch(userDetail)
  }
    return (
        
        <Box className='bg-gray-200 md:p-12 p-2'>
            <Container>
                <Grid container className='bg-slate-50 p-5' spacing={2}>
                    <Grid item md={6} xs={12}>
                        {user.avatar === "" ?(
                            <img src={require("../../assets/default.png")} alt=""  className='w-40 md:w-60 mx-auto'/>
                        ):
                        (
                            <img src={baseURL+"/"+user.avatar} alt=""  className='w-40 h-40  mx-auto rounded-full'/>
                        )}
                        <TextField type="file" className='flex justify-center items-center mt-5' name="avatar" onChange={handleImage}></TextField>
                    </Grid>
                    <Grid item md={6} xs={12} >
                        <TextField type="text" defaultValue={user.fullname}  variant="standard" 
                        label="Họ tên" fullWidth className='mb-6' name="fullname" onChange={handleChange}></TextField>

                        <TextField type="text" defaultValue={user.phone}  variant="standard"
                        label="Số điện thoại" fullWidth  className='mb-6'  name="phone"  onChange={handleChange}> </TextField>

                        <TextField type="text" defaultValue={user.address}  variant="standard" multiline rows={3}
                        label="Địa chỉ" fullWidth  className='mb-6'  name="address" onChange={handleChange}></TextField>

                        <Button onClick={handleSave} className='bg-sky-500 hover:bg-sky-700 text-slate-50' >Lưu thay đổi</Button>

                        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-slate-50 float-right">Đăng xuất</Button>
                    </Grid>
                    {status === UserActionTypes.SAVE_USER_SUCCESS ?(
              <Snackbar open={true} autoHideDuration={4000}  anchorOrigin={{vertical:"top", horizontal:"right"}} className="snackbarAlert">
                  <Alert variant="filled"  severity="success" sx={{ width: '100%' }}>
                      <AlertTitle>Success</AlertTitle>
                          <strong>Lưu thông tin thành công</strong>
                  </Alert>
             </Snackbar>
              ):null}
                </Grid>
            </Container>
        </Box>

    )
}
const mapStateToProp = createStructuredSelector({
    user : selectCurrentUser,
    status: selectStatus,

  });
  
  const mapDispatchToProp = (dispatch) => ({
    logoutDispatch: (navigate,axiosJWT) => dispatch(signOutStart(navigate,axiosJWT)),
    saveUserDispatch: (userInfo) => dispatch(saveUserStart(userInfo)),

  });
  
  export default connect(mapStateToProp, mapDispatchToProp)(UserInfo);