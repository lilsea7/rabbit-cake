import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import './Favorites.css';

const Favorites = () => {
  const { favoriteItems, url, food_list, loadFavoritesData, token } = useContext(StoreContext);
  const navigate = useNavigate();

  // Tải danh sách yêu thích từ backend khi component mount
  useEffect(() => {
    if (token) {
      loadFavoritesData(token);
    }
  }, [token, loadFavoritesData]);

  if (!favoriteItems || favoriteItems.length === 0) {
    return (
      <div className="favorites-empty">
        <p>Không có sản phẩm yêu thích nào.</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h1>Danh sách yêu thích</h1>
      <div className="favorites-list">
        {favoriteItems.map((id) => {
          const product = food_list.find((item) => item._id === id) || { _id: id, name: "Sản phẩm không xác định", price: 0, image: "default.jpg" };
          return (
            <div key={id} className="favorite-item" onClick={() => navigate(`/product/${id}`)}>
              <img src={url + "/images/" + product.image} alt={product.name} className="favorite-item-image" />
              <div className="favorite-item-info">
                <p className="favorite-item-name">{product.name}</p>
                <p className="favorite-item-price">{product.price}.000₫</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Error Boundary (tùy chọn)
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Có lỗi xảy ra. Vui lòng thử lại sau.</h1>;
    }
    return this.props.children;
  }
}

export default function WrappedFavorites() {
  return (
    <ErrorBoundary>
      <Favorites />
    </ErrorBoundary>
  );
}