import React, { useState, useEffect } from 'react';
import './EditProductPopup.css';

const EditProductPopup = ({ show, product, onSave, onClose }) => {
  if (!show) return null;

  const [formData, setFormData] = useState({
    name: product.name || '',
    category: product.category || '',
    price: product.price || '',
    description: product.description || '',
    quantity: product.quantity || 0,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(product.image || null); // State cho preview ảnh

  useEffect(() => {
    setFormData({
      name: product.name || '',
      category: product.category || '',
      price: product.price || '',
      description: product.description || '',
      quantity: product.quantity || 0,
      image: null,
    });
    setImagePreview(product.image ? `${product.image}` : null); // Đặt ảnh hiện tại làm preview
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setImagePreview(URL.createObjectURL(file)); // Hiển thị preview ảnh mới
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>
        <h2>Chỉnh sửa sản phẩm</h2>
        <form onSubmit={handleSubmit} className="popup-form">
          <div className="form-columns">
            <div className="form-column content">
              <div className="form-group">
                <label>Tên sản phẩm</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phân loại</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Giá</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Số lượng</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
            </div>
            <div className="form-column image">
              <div className="form-group">
                <label>Ảnh</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" className="preview-image" />
                </div>
              )}
            </div>
          </div>
          <div className="popup-buttons">
            <button type="submit" className="popup-save">Lưu thay đổi</button>
            <button type="button" className="popup-cancel" onClick={onClose}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPopup;