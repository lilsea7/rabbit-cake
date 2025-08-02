import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import './EditProfile.css';
import { assets } from '../../assets/assets';

const EditProfile = () => {
  const { url, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    avatar: null, // Lưu file ảnh
    avatarPreview: '', // URL tạm để hiển thị ảnh
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${url}/api/user/profile`, { headers: { token } });
        console.log('API Response:', response.data); // Debug giá trị avatar
        if (response.data.success) {
          const avatarPath = response.data.data.avatar || '';
          const previewUrl = avatarPath
            ? `${url}/images/${avatarPath}` // Sử dụng trực tiếp tên file
            : assets.profile_default || `${url}/images/default-avatar.jpg`; // Ảnh mặc định
          setUserData((prev) => ({
            ...prev,
            name: response.data.data.name || '',
            address: response.data.data.address || '',
            phone: response.data.data.phone || '',
            email: response.data.data.email || '',
            avatar: null,
            avatarPreview: previewUrl,
            password: '',
          }));
        } else {
          setError('Không thể tải thông tin người dùng.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Lỗi khi tải thôngtin. Vui lòng thử lại.');
      }
    };
    if (token) fetchUserData();
  }, [url, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prev) => ({
        ...prev,
        avatar: file,
        avatarPreview: URL.createObjectURL(file), // Hiển thị ảnh tạm
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('address', userData.address);
    formData.append('phone', userData.phone);
    formData.append('email', userData.email);
    if (userData.password) formData.append('password', userData.password);
    if (userData.avatar) formData.append('avatar', userData.avatar);

    try {
      const response = await axios.post(`${url}/api/user/update`, formData, {
        headers: { token, 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.success) {
        setSuccess('Cập nhật hồ sơ thành công!');
        if (response.data.token) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }
        // Cập nhật avatarPreview với đường dẫn từ server
        if (response.data.data.avatar) {
          setUserData((prev) => ({
            ...prev,
            avatar: null, // Reset avatar file sau khi upload
            avatarPreview: `${url}/images/${response.data.data.avatar}`,
          }));
        }
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError(response.data.message || 'Cập nhật thất bại.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Lỗi khi cập nhật. Vui lòng thử lại.');
    }
  };

  if (!token) {
    return <div>Vui lòng đăng nhập để chỉnh sửa hồ sơ.</div>;
  }

  return (
    <div className="edit-profile-container">
      <h1>Chỉnh sửa hồ sơ</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group avatar-section">
          <label>Ảnh đại diện:</label>
          <div className="avatar-preview">
            <div className="avatar-frame">
              <img
                src={userData.avatarPreview || assets.profile_default || `${url}/images/default-avatar.jpg`} // Ưu tiên avatarPreview, sau đó assets, cuối cùng URL
                alt="Avatar"
                className="avatar-image"
                onError={(e) => {
                  console.log('Image load failed, using default:', `${url}/images/default-avatar.jpg`);
                  e.target.src = assets.profile_default || `${url}/images/default-avatar.jpg`; // Fallback
                  e.target.onError = null; // Ngăn reload vô hạn
                }}
              />
            </div>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              id="avatar-upload"
              style={{ display: 'none' }} // Ẩn input
            />
            <label htmlFor="avatar-upload" className="upload-btn">
              Tải ảnh lên
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Tên người dùng:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Nhập tên người dùng"
            required
          />
        </div>
        <div className="form-group">
          <label>Địa chỉ:</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
            placeholder="Nhập địa chỉ"
            required
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại:</label>
          <input
            type="tel"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
            pattern="[0-9]{10}" // Validation cơ bản cho số điện thoại (10 chữ số)
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Nhập email"
            required
          />
        </div>
        <button type="submit" className="save-btn">Lưu thay đổi</button>
      </form>
    </div>
  );
};

export default EditProfile;