import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './ProductDetail.css';
import { assets } from '../../assets/assets';

const ProductDetail = () => {
  const { id } = useParams();
  const { url, cartItems, addToCart, removeFromCart, food_list } = useContext(StoreContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`Fetching product with id: ${id}`);
        // Kiểm tra trước trong food_list từ context
        const productFromList = food_list.find((item) => item._id === id);
        if (productFromList) {
          setProduct(productFromList);
        } else {
          // Nếu không tìm thấy trong food_list, gọi API
          const response = await axios.get(`${url}/api/food/products/${id}`);
          console.log("API response:", response.data);
          if (response.data.success) {
            setProduct(response.data.data);
          } else {
            setError("Sản phẩm không tồn tại.");
            navigate('/products');
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError("Lỗi khi tải sản phẩm. Vui lòng thử lại.");
        navigate('/products');
      }
    };
    fetchProduct();
  }, [id, url, navigate, food_list]); // Thêm food_list vào dependencies

  const handleAddToCart = () => {
    if (product && product.quantity > 0 && (cartItems[product._id] || 0) < product.quantity) {
      addToCart(product._id);
      setQuantity(1);
    } else {
      alert('Sản phẩm đã hết hàng hoặc số lượng trong giỏ đã đạt giới hạn!');
    }
  };

  const handleRemoveFromCart = () => {
    if (cartItems[product._id] > 0) {
      removeFromCart(product._id);
    }
  };

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-image">
          <img src={`${url}/images/${product.image}`} alt={product.name} />
          <img
            src={`${url}/images/${product.hoverImage || product.image}`}
            alt={`${product.name} hover`}
            className="hover-image"
          />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="rating">
            <img src={assets.rating_starts} alt="Rating" />
          </div>
          <p className="price">{product.price}.000₫</p>
          <p className="quantity">Số lượng còn: {product.quantity}</p>
          {!cartItems[product._id] ? (
            <button onClick={handleAddToCart} className="add-to-cart">
              Thêm vào giỏ hàng
            </button>
          ) : (
            <div className="cart-counter">
              <button onClick={handleRemoveFromCart}>-</button>
              <span>{cartItems[product._id]}</span>
              <button onClick={handleAddToCart}>+</button>
            </div>
          )}
        </div>
      </div>
      <div className="product-description">
        <h2>Mô tả sản phẩm</h2>
        <p>{product.description || 'Không có mô tả'}</p> {/* Xử lý trường hợp description không tồn tại */}
      </div>
    </div>
  );
};

export default ProductDetail;