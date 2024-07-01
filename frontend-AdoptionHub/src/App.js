import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NavBar from "./components/Navbar";
import AdoptWithToken from "./pages/AdoptWithToken";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <ToastContainer />
      <NavBar />
      <Routes>
        {/* <Route path="/home" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} /> */}
        <Route path="/home" element={<LandingPage />} />
        <Route path="/adopt-with-token" element={<AdoptWithToken />} />
      </Routes>
    </Router>
  );
}

export default App;

// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Navbar from "./components/Navbar";
// import Homepage from "./pages/Homepage";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Contact from "./pages/Contact";
// import About from "./pages/About";
// import AdminDashboard from "./pages/Admin/Dashboard";
// import UserRoutes from "./protected/UserRoute";
// import AdminRoute from "./protected/AdminRoute";
// import AdminContact from "./pages/Admin/AdminContact";
// import AdminUser from "./pages/Admin/AdminUser";
// import AdminBlog from "./pages/Admin/AdminBlog";
// import Blog from "./pages/Blog";
// import AdminProductDashboard from "./pages/Admin/AdminProduct";
// import AdminEditProduct from "./pages/Admin/AdminEditProduct";
// import Product from "./pages/Product";
// import AdminEdiBlog from "./pages/Admin/AdminEditBlogs";
// import Profile from "./pages/Profile";
// import AddBlogPage from "./pages/Admin/AddBlogPage";
// import AddProduct from "./pages/Admin/AddProduct";
// import ProductDetails from "./pages/ProductDetails";
// import Wishlist from "./pages/AddWishlist";
// import UpdatedPasswords from "./pages/UpdatedPasswords";
// import PasswordForgot from "./pages/PasswordForgot";
// import NewPassword from "./pages/NewPassword";
// import AddToCart from "./pages/AddToCart";
// import AdminCreateNotificationPage from "./pages/Admin/Notification";
// import OrderHistory from "./pages/OrderHistory";
// import NotificationComponent from "./pages/ClientNotification";
// import UpNavbar from "./components/UpNavbar";
// import Landing from "./pages/LandingPage";
// import Faq from "./pages/Faq";

// function App() {
//   return (
//     <Router>
//       <ToastContainer />
//       <Routes>
//         <Route path="/home" element={<Homepage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Register />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/blog" element={<Blog />} />
//         <Route path="/products" element={<Product />} />
//         <Route path="/landing" element={<Landing/>} />
//         <Route path="/productDetails/:id" element={<ProductDetails/>} />
//         <Route path="/passwordForget" element={<PasswordForgot />} />
//         <Route path = "/reset_password/:token" element ={<NewPassword/>} />
//         <Route path = "/notification" element ={<NotificationComponent/>} />
//         <Route path = "/faq" element ={<Faq/>} />
//         <Route path = '' element={<UserRoutes />}>
//         <Route path="/changePassword/:id" element={<UpdatedPasswords />} />
//         <Route path="/wishlist" element={<Wishlist/>} />
//         <Route path="/addtocart" element={<AddToCart/>} />
//         <Route path="/profile/edit/:id" element={<Profile />} />
//         <Route path="/orderHistory" element={<OrderHistory />} />
//         <Route path="/adopt" element={<UpNavbar />} />

//       </Route>

//       <Route element={<AdminRoute />}>
//         <Route path="/admin/addBlog" element={<AddBlogPage />} />
//         <Route path="/admin/addProduct" element={<AddProduct />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route path="/admin/contact" element={<AdminContact />} />
//         <Route path="/admin/user" element={<AdminUser />} />
//         <Route path="/admin/blog" element={<AdminBlog />} />
//         <Route path="/admin/product" element={<AdminProductDashboard />} />
//         <Route path = "/admin/notification" element = {<AdminCreateNotificationPage />} />
//         <Route path="/admin/up/:id" element={<AdminEdiBlog />} />
//         <Route path="/admin/edi/:id" element={<AdminEditProduct />} />

//        </Route>

//       </Routes>
//     </Router>
//   );
// }

// export default App;
