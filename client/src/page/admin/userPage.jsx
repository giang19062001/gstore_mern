import React  from 'react';
import AppbarAdmin from "../../component/admin/appbar";
import FooterAdmin from "../../component/admin/footer";
import UserList from '../../component/admin/userList';

const UserAdminPage = () => {
  return (
    <>     
     <AppbarAdmin></AppbarAdmin>
     <UserList></UserList>
            <FooterAdmin></FooterAdmin>
    </>
  );
}

export default UserAdminPage
