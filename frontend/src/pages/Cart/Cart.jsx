
import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Sản phẩm</p>
          <p>Tên</p>
          <p>Giá</p>
          <p>Số lượng</p>
          <p>Tổng</p>
          <p>Xóa</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}.000₫</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}.000₫</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null; // Trả về null nếu không render
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Giỏ hàng</h2>
          <div>
            <div className="cart-total-details">
              <p>Tổng</p>
              <p>{getTotalCartAmount()}.000₫</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí vận chuyển</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}.000₫</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Tổng cộng</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}.000₫</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Thanh toán</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Nếu bạn có mã khuyến mại, hãy nhập vào đây</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Mã khuyến mãi" />
              <button>Hoàn tất</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;