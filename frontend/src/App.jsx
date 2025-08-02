// import React, { useState } from 'react'
// import Navbar from './components/Navbar/Navbar'
// import { Route, Routes } from 'react-router-dom'
// import LandingPage from './pages/LandingPage/LandingPage'
// import Home from './pages/Home/Home'
// import Cart from './pages/Cart/Cart'
// import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
// import Footer from './components/Footer/Footer'
// import LoginPopup from './components/LoginPopup/LoginPopup'
// import Verify from './pages/Verify/Verify'
// import MyOrders from './pages/MyOrders/MyOrders'
// import ProductDetail from './pages/ProductDetail/ProductDetail'
// import Favorites from './pages/Favorites/Favorites'
// import EditProfile from './components/EditProfile/EditProfile'

// const App = () => {

//   const [showLogin,setShowLogin] = useState(false)

//   return (
//     <>
//     {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
//     <div className="app">
//       <Navbar setShowLogin={setShowLogin}/>
//       <Routes>
//         <Route path='/' element={<LandingPage />} />
//         < Route path='/home' element={<Home/>} />
//         < Route path='/cart' element={<Cart/>} />
//         < Route path='/order' element={<PlaceOrder/>} />
//         <Route path='/verify' element={<Verify/>} />
//         <Route path='/myorders' element={<MyOrders/>} />
//         <Route path="/favorites" element={<Favorites />} /> {/* Thêm route */}
//         <Route path="/product/:id" element={<ProductDetail />} />
//         <Route path='/edit-profile' element={<EditProfile />}/>
//       </Routes>
//     </div>
//     <Footer/>
//     </>

//   )
// }

// export default App

import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Favorites from './pages/Favorites/Favorites';
import EditProfile from './components/EditProfile/EditProfile';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <div className="app">
              <Home />
            </div>
          }
        />
        <Route
          path="/cart"
          element={
            <div className="app">
              <Cart />
            </div>
          }
        />
        <Route
          path="/order"
          element={
            <div className="app">
              <PlaceOrder />
            </div>
          }
        />
        <Route
          path="/verify"
          element={
            <div className="app">
              <Verify />
            </div>
          }
        />
        <Route
          path="/myorders"
          element={
            <div className="app">
              <MyOrders />
            </div>
          }
        />
        <Route
          path="/favorites"
          element={
            <div className="app">
              <Favorites />
            </div>
          }
        />
        <Route
          path="/product/:id"
          element={
            <div className="app">
              <ProductDetail />
            </div>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <div className="app">
              <EditProfile />
            </div>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;