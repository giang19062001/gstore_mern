import axios from "axios";
import baseURL from "../baseurl";
import jwt_decode from 'jwt-decode'


//axiosNormal
const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

//axiosJWT

const instanceJWT = axios.create({
  baseURL: baseURL,
  withCredentials: true // tự động lấy cookie từ server đề set
  //proxy 3000 mới lấy dc mà set
});
const refreshToken = async () =>{
  try { 
     const res = await instance.post("/v1/auth/refresh")   // dùng axiosNormal vì ko bị chặn
     return res.data 

  } catch (error) {
    console.log(error)
  }
}

export const createAxios = (user,dispatch,action) =>
{
  instanceJWT.interceptors.request.use(
   async (config) => {
    if (user?.accessToken) {
      let date = new Date()
      const decodedToken = jwt_decode(user?.accessToken)
   if(decodedToken.exp < parseInt(date.getTime()/1000)){
         const data = await refreshToken()
         config.headers['authorization'] = 'Bearer ' + data?.accessToken;
         const refreshUser = {
          ...user,
          accessToken: data.accessToken
        }
        dispatch(action(refreshUser))
      }else{
        config.headers['authorization'] = 'Bearer ' + user?.accessToken;

      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

   return instanceJWT

}


export default instance;
