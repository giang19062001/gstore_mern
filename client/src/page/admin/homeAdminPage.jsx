import React  from 'react';
import AppbarAdmin from "../../component/admin/appbar";
import FooterAdmin from "../../component/admin/footer";
import Iphone from '../../component/admin/iphone';

const HomeAdminPage = () => {
  return (
    <>     
     <AppbarAdmin></AppbarAdmin>
    <Iphone></Iphone>
            <FooterAdmin></FooterAdmin>
    </>
  );
}

export default HomeAdminPage
