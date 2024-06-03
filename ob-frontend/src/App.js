
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/about/About";
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import UserProfile from "./pages/users/UserProfile/UserProfile";
import AdminProductEdit from "./pages/admin/AdminProductEdit/AdminProductEdit";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import Order from "./pages/orders/Order";
import AdminOrders from "./pages/admin/AdminOrders/Adminorders";
import Search from "./pages/search/Search";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";
import AdminRoute from "./protected/AdminRoute";
import UserRoute from "./protected/UserRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/product/details/:id" element={<ProductDetails/>}/>

        
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        {/* About */}
        <Route path="/about" element={<About />} />
   
     {/* Search */}
     <Route path="/search/:query" element={<Search/>} />

     <Route path="/forgot_password" element={<ForgotPassword/>} />

    {/* for admin route */}
     <Route element={<AdminRoute/>}>
     <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
      <Route path="/admin/product/edit/:id" element={<AdminProductEdit/>}/>
      <Route path="/admin/order" element={<AdminOrders/>}></Route>
      </Route>

     {/* for user route */}
     <Route element={<UserRoute/>}>
     <Route path="/cart" element={<Cart/>}/>
     <Route path="/order" element={<Order/>}/>
     <Route path="/UserProfile" element={<UserProfile/>}/>
     </Route>


      </Routes>
     
      <Footer/>
    </Router>
  );
}

export default App;