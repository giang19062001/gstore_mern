import React  from 'react';
import AppbarAdmin from "../../component/admin/appbar";
import FooterAdmin from "../../component/admin/footer";
import OrderList from '../../component/admin/orderList';

const OrderAdminPage = () => {
  return (
    <>     
     <AppbarAdmin></AppbarAdmin>
    <OrderList></OrderList>
            <FooterAdmin></FooterAdmin>
    </>
  );
}

export default OrderAdminPage
