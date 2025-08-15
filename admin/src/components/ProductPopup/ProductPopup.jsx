import React from 'react';
import './ProductPopup.css';

const ProductPopup = ({ show, product, onClose }) => {
  if (!show || !product) return null;

  return (
    <div className="product-popup-overlay" onClick={onClose}>
      <div className="product-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        <h2>{product.name}</h2>
        <p><strong>Phân loại:</strong> {product.category}</p>
        <p><strong>Giá:</strong> {product.price}.000₫</p>
        <p><strong>Số lượng:</strong> {product.quantity || 0}</p> {/* Thêm số lượng */}
        <p><strong>Mô tả:</strong> {product.description || 'Không có mô tả'}</p>
      </div>
    </div>
  );
};

export default ProductPopup;
