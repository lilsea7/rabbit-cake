
// import React, { useContext, useEffect, useState } from 'react';
// import './PlaceOrder.css';
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: ""
//   });

//   const [paymentMethod, setPaymentMethod] = useState(null); // Thêm state để lưu phương thức thanh toán

//   const onChangeHandler = (event) => {
//     if (!event || !event.target) return;
//     const { name, value } = event.target;
//     setData(prev => ({ ...prev, [name]: value }));
//   };

//   const placeOrder = async (event) => {
//     event.preventDefault();

//     let orderItems = [];
//     food_list.forEach((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = { ...item }; // ✅ clone object an toàn
//         itemInfo["quantity"] = cartItems[item._id];
//         orderItems.push(itemInfo);
//       }
//     });

//     let orderData = {
//       address: data,
//       items: orderItems,
//       amount: getTotalCartAmount() + 2,
//     };

//     try {
//       if (paymentMethod === 'cod') {
//         // Thanh toán khi nhận hàng (COD)
//         const response = await axios.post(url + "/api/order/place-cod", orderData, {
//           headers: { token }
//         });
//         if (response.data.success) {
//           alert("Đặt hàng thành công!");
//           navigate('/myorders'); // Điều hướng đến my order
//         } else {
//           alert("Đặt hàng thất bại. Vui lòng thử lại!");
//         }
//       } else if (paymentMethod === 'stripe') {
//         // Thanh toán trực tuyến với Stripe
//         const response = await axios.post(url + "/api/order/place", orderData, {
//           headers: { token }
//         });
//         if (response.data.success) {
//           const { session_url } = response.data;
//           window.location.replace(session_url);
//         } else {
//           alert("Đặt hàng thất bại. Vui lòng thử lại!");
//         }
//       }
//     } catch (error) {
//       console.error("Lỗi khi gửi yêu cầu đặt hàng:", error);
//       alert("Có lỗi xảy ra khi kết nối đến máy chủ.");
//     }
//   };

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate('/cart');
//     } else if (getTotalCartAmount() === 0) {
//       navigate('/cart');
//     }
//   }, [token]);

//   return (
//     <form onSubmit={placeOrder} className='place-order'>
//       <div className="place-order-left">
//         <p className="title">Thông tin giao hàng</p>
//         <div className="multi-fields">
//           <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Họ' />
//           <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Tên' />
//         </div>
//         <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' />
//         <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Địa chỉ' />
//         <div className="multi-fields">
//           <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='Thành phố' />
//           <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='Phường/ Xã' />
//         </div>
//         <div className="multi-fields">
//           <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Mã bưu chính' />
//           <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Quốc gia' />
//         </div>
//         <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Số điện thoại' />
//       </div>

//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Giỏ hàng</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Tổng</p>
//               <p>{getTotalCartAmount()}.000₫</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Phí vận chuyển</p>
//               <p>{getTotalCartAmount() === 0 ? 0 : 2}.000₫</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Tổng cộng</b>
//               <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}.000₫</b>
//             </div>
//           </div>
//           {/* Thêm lựa chọn thanh toán */}
//           <div className="payment-options">
//             <label>
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="cod"
//                 onChange={() => setPaymentMethod('cod')}
//               /> Thanh toán khi nhận hàng
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="stripe"
//                 onChange={() => setPaymentMethod('stripe')}
//                 defaultChecked // Mặc định chọn Stripe
//               /> Thanh toán trực tuyến với Stripe
//             </label>
//           </div>
//           <button type='submit' disabled={!paymentMethod}>Đồng ý và thanh toán</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;

import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State cho modal thành công

  const onChangeHandler = (event) => {
    if (!event || !event.target) return;
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      if (paymentMethod === 'cod') {
        const response = await axios.post(url + "/api/order/place-cod", orderData, {
          headers: { token }
        });
        if (response.data.success) {
          setShowSuccessModal(true); // Hiển thị modal thành công
          setTimeout(() => {
            setShowSuccessModal(false);
            navigate('/myorders');
          }, 3000); // Tự động ẩn sau 3 giây và điều hướng
        } else {
          alert("Đặt hàng thất bại. Vui lòng thử lại!");
        }
      } else if (paymentMethod === 'stripe') {
        const response = await axios.post(url + "/api/order/place", orderData, {
          headers: { token }
        });
        if (response.data.success) {
          const { session_url } = response.data;
          window.location.replace(session_url);
        } else {
          alert("Đặt hàng thất bại. Vui lòng thử lại!");
        }
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đặt hàng:", error);
      alert("Có lỗi xảy ra khi kết nối đến máy chủ.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Thông tin giao hàng</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Họ' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Tên' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Địa chỉ' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='Thành phố' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='Phường/ Xã' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Mã bưu chính' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Quốc gia' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Số điện thoại' />
      </div>

      <div className="place-order-right">
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
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                onChange={() => setPaymentMethod('cod')}
              /> Thanh toán khi nhận hàng
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="stripe"
                onChange={() => setPaymentMethod('stripe')}
                defaultChecked
              /> Thanh toán trực tuyến với Stripe
            </label>
          </div>
          <button type='submit' disabled={!paymentMethod}>Đồng ý và thanh toán</button>
        </div>
      </div>

      {/* Modal thành công */}
      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-modal-content">
              <h2>🎉 Đặt hàng thành công!</h2>
              <p>Cảm ơn bạn đã mua sắm tại Rabbit Cake. Đơn hàng của bạn sẽ được xử lý sớm!</p>
              <button onClick={() => { setShowSuccessModal(false); navigate('/myorders'); }} className="success-modal-close">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default PlaceOrder;