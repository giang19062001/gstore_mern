import React  from 'react';
import AppbarAdmin from "../../component/admin/appbar";
import FooterAdmin from "../../component/admin/footer";
import OrderDetail from '../../component/admin/orderDetail';

const OrderDetailAdminPage = () => {
  
  return (
    <>     
     <AppbarAdmin></AppbarAdmin>
     <OrderDetail></OrderDetail>
            <FooterAdmin></FooterAdmin>
    </>
  );
}

export default OrderDetailAdminPage
