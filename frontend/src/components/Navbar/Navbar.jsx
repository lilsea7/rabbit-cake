

import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount, token, setToken, url, favoriteItems } = useContext(StoreContext);
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(''); // State để lưu URL ảnh đại diện

  // Fetch profile data khi token thay đổi
  useEffect(() => {
    const fetchProfileData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${url}/api/user/profile`, { headers: { token } });
          console.log('Profile Response:', response.data); // Debug
          if (response.data.success) {
            const avatar = response.data.data.avatar || '';
            setAvatarUrl(avatar ? `${url}/images/${avatar}` : assets.profile_default); // Sử dụng profile_default làm mặc định
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
          setAvatarUrl(assets.profile_default); // Fallback đến profile_default nếu lỗi
        }
      } else {
        setAvatarUrl(assets.profile_default); // Mặc định khi chưa đăng nhập
      }
    };
    fetchProfileData();
  }, [token, url]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("main")} className={menu === "main" ? "active" : ""}>
          Trang chủ
        </Link>
        <Link to="/home" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
          Sản phẩm
        </Link>
        <Link to="/favorites" onClick={() => setMenu("favorites")} className={menu === "favorites" ? "active" : ""}>
          Yêu thích
        </Link>
        <Link to="/myorders" onClick={() => setMenu("myorders")} className={menu === "myorders" ? "active" : ""}>
          Đơn hàng
        </Link>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Đăng nhập</button>
        ) : (
          <div className="navbar-profile">
            <img src={avatarUrl} alt="User Avatar" className="profile-icon" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" />Đơn hàng
              </li>
              <hr />
              <li onClick={() => navigate('/favorites')}>
                <img src={assets.icon_fav_nav} alt="" />Danh sách yêu thích
              </li>
              <hr />
              <li onClick={() => navigate('/edit-profile')}>
                <img src={assets.profile_icon} alt="" />Hồ sơ người dùng
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />Đăng xuất
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;