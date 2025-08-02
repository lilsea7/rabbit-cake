import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Mang đến cho bạn những trải nghiệm siêu tuyệt vời tại Rabbit Cake.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
              <h2>Xem thêm</h2>
              <ul>
                <li>Trang chủ</li>
                <li>Giới thiệu</li>
                <li>Giao hàng</li>
                <li>Chính sách bảo mật</li>
              </ul>
            </div>
            <div className="footer-content-right">
              <h2>Liên hệ</h2>
              <ul>
                <li>0398681186</li>
                <li>contact@rabbitcake.com</li>
              </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 © Rabbitcake.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer 
