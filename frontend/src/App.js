import './App.css';
import Header from './component/layout/header/Header.jsx';
import {BrowserRouter,Route, Routes} from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect,useState } from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from './component/layout/home/Home';
import ProductDetails from './component/product/ProductDetails';
import Products from './component/product/Products';
import Search from './component/product/Search';
import LoginSignup from './component/User/LoginSignup';
import store from "./store";
import { loadUser } from './actions/userAction';
import { useSelector } from "react-redux";
import Action from './component/layout/header/Action';
import Profile from './component/User/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from "axios";
import Payment from './component/Cart/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrder from './component/Order/MyOrder';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UserList from './component/Admin/UserList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import Contact from './component/layout/Contact/Contact';
import About from './component/layout/Aboutus/About';
import NotFound from './component/layout/NotFound/NotFound';


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(()=>{
   WebFont.load({
    google:{
      families:["Roboto","Droid Sans","Chilanks"],
    },
   });
   store.dispatch(loadUser());
   getStripeApiKey();
  },[]);
  return (
  <>

  <BrowserRouter>
  <Header/>
  {isAuthenticated && <Action user={user} />}
  <Routes>
  <Route exact path='/' element={<Home/>}/>
  <Route exact path='/contact' element={<Contact/>}/>
  <Route exact path='/about' element={<About/>}/>
  <Route exact path='/*' element={<NotFound/>}/>
  <Route   path='/product/:id' element={<ProductDetails/>}/>
  <Route  exact path='/products' element={<Products/>}/>
  <Route  exact path='/products/:keyword' element={<Products/>}/>
  <Route exact  path='/search' element={<Search/>}/>
  <Route  exact path='/login' element={<LoginSignup/>}/>
  <Route exact path='/account' element={<ProtectedRoute component={Profile}/>}/>
  <Route exact path='/me/update' element={<ProtectedRoute component={UpdateProfile}/>}/>
  <Route exact path='/password/update' element={<ProtectedRoute component={UpdatePassword}/>}/>
  <Route exact path='/password/forgot' element={<ForgotPassword/>}/>
  <Route exact path='/password/reset/:token' element={<ResetPassword/>}/>
  <Route exact path='/Cart' element={<Cart/>}/>
  <Route exact path='/login/shipping' element={<ProtectedRoute component={Shipping}/>}/>
  
  {stripeApiKey && (

  <Route exact path='/process/payment' element={<> <Elements stripe={loadStripe(stripeApiKey)}><ProtectedRoute component={Payment}   /></Elements> </>}/>
    )}
  <Route exact path='/success' element={<ProtectedRoute component={OrderSuccess}/>}/>
  <Route exact path='/orders' element={<ProtectedRoute component={MyOrder}/>}/>

  <Route exact path='/order/confirm' element={<ProtectedRoute component={ConfirmOrder}/>}/>
  <Route exact path='/order/:id' element={<ProtectedRoute component={OrderDetails}/>}/>

  <Route exact path='/admin/dashboard' element={<ProtectedRoute isAdmin={true} component={Dashboard}/>}/>
  <Route exact path='/admin/products' element={<ProtectedRoute isAdmin={true} component={ProductList}/>}/>
  <Route exact path='/admin/product' element={<ProtectedRoute isAdmin={true} component={NewProduct}/>}/>
  <Route exact path='/admin/product/:id' element={<ProtectedRoute isAdmin={true} component={UpdateProduct}/>}/>
  <Route exact path='/admin/orders' element={<ProtectedRoute isAdmin={true} component={OrderList}/>}/>
  <Route exact path='/admin/order/:id' element={<ProtectedRoute isAdmin={true} component={ProcessOrder}/>}/>
  <Route exact path='/admin/users' element={<ProtectedRoute isAdmin={true} component={UserList}/>}/>
  <Route exact path='/admin/user/:id' element={<ProtectedRoute isAdmin={true} component={UpdateUser}/>}/>
  <Route exact path='/admin/reviews' element={<ProtectedRoute isAdmin={true} component={ProductReviews}/>}/>

  </Routes>
 

  <Footer/>
   </BrowserRouter>
   
   
  </>
  );
}

export default App;
