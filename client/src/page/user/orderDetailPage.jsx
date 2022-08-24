import Appbar from "../../component/user/appbar";
import Footer from "../../component/user/footer";
import React  from 'react';
import OrderDetail from "../../component/user/orderDetail";
const OrderDetailPage = () => {
  return (
    <>     
     <Appbar></Appbar>
     <OrderDetail></OrderDetail>
     <Footer></Footer>
    </>
  );
}

export default OrderDetailPage
