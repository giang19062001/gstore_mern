import Appbar from "../../component/user/appbar";
import Footer from "../../component/user/footer";
import React  from 'react';
import UserInfo from "../../component/user/userInfo";

const UserPage = () => {
  return (
    <>     
     <Appbar></Appbar>
     <UserInfo></UserInfo>
    <Footer></Footer>
    </>
  );
}

export default UserPage
