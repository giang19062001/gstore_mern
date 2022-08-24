import { BrowserRouter,Routes,Route} from "react-router-dom"
import CartPage from "./page/user/cartPage";
import HomePage from "./page/user/homePage";
import OrderPage from "./page/user/orderPage";
import ProductDetailPage from "./page/user/productDetailPage";
import UserPage from "./page/user/userPage";
import OrderDetailPage from "./page/user/orderDetailPage";
import HomeAdminPage from "./page/admin/homeAdminPage";
import OrderAdminPage from "./page/admin/orderAdminPage";
import OrderDetailAdminPage from "./page/admin/orderDetailAdminPage";
import UserAdminPage from "./page/admin/userPage";



function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}> </Route>
      <Route path="/product-detail/:id" element = {<ProductDetailPage/>}></Route>   
      <Route path="/cart" element={<CartPage/>}> </Route>
      <Route path="/order" element={<OrderPage/>}> </Route>
      <Route path="/order/orderDetail/:id" element={<OrderDetailPage/>}> </Route>
      <Route path="/user/:id" element={<UserPage/>}> </Route>
      <Route path="/admin" element={<HomeAdminPage/>}> </Route>
      <Route path="/admin/product" element={<UserAdminPage/>}> </Route>

      <Route path="/admin/order" element={<OrderAdminPage/>}> </Route>
      <Route path="/admin/order/orderDetail/:id" element={<OrderDetailAdminPage/>}> </Route>



    </Routes>
    </BrowserRouter>
      
  );
}

export default App;
