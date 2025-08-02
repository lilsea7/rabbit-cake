// import React from 'react'
// import './Navbar.css'
// import { assets } from '../../assets/assets'

// const Navbar = () => {
//   return (
//     <div className='navbar'>
//         <img className='logo' src={assets.logo} alt="" />
//         <img className='profile' src={assets.profile_image} alt="" />
      
//     </div>
//   )
// }

// export default Navbar


//update logout và hồ sơ người dùng
import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false); // State để quản lý dropdown
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa hoàn toàn trạng thái đăng nhập
    localStorage.removeItem("token"); // Xóa token
    // Điều hướng về trang chủ chưa đăng nhập của frontend
    window.location.href = 'http://localhost:5174'; // Đi đến giao diện người dùng chưa đăng nhập
  };

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" />
      <div 
        className='profile-container'
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <img className='profile' src={assets.profile_image} alt="Profile" />
        {showDropdown && (
          <ul className='nav-dropdown'>
            <li onClick={() => alert('Chuyển đến trang Hồ sơ người dùng')}>Hồ sơ người dùng</li>
            <li onClick={handleLogout}>Đăng xuất</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;