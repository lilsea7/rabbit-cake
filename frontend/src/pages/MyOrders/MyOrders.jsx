import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, {
        headers: { token }
      });
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>Đơn hàng của tôi</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className='my-orders-order'>
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, idx) => (
                <span key={idx}>
                  {item.name} x {item.quantity}
                  {idx < order.items.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
            <p>{order.amount}.000₫</p>
            <p>Số lượng: {order.items.length}</p>
            <p><span>&#x25cf;</span><b>{order.status}</b></p>
            <button onClick={fetchOrders}>Theo dõi đơn hàng</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
