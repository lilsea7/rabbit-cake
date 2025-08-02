

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [favoriteItems, setFavoriteItems] = useState(() => {
    const savedFavorites = localStorage.getItem("favoriteItems");
    // Đảm bảo luôn là mảng, ngay cả khi dữ liệu không hợp lệ
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const url = "https://rabbit-cake-backend.onrender.com";
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Đồng bộ với localStorage

  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Failed to add to cart:", error.message);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Failed to remove from cart:", error.message);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        totalAmount += (itemInfo?.price || 0) * cartItems[item]; // Xử lý an toàn
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch food list:", error.message);
      setFoodList([]); // Đặt giá trị mặc định nếu API thất bại
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Failed to load cart data:", error.message);
      setCartItems({}); // Đặt giá trị mặc định nếu API thất bại
    }
  };

  const addToFavorites = async (itemId) => {
    try {
      const newFavorites = [...new Set([...favoriteItems, itemId])]; // Tạo mảng mới
      setFavoriteItems(newFavorites); // Cập nhật state ngay lập tức
      localStorage.setItem("favoriteItems", JSON.stringify(newFavorites));
      if (token) {
        await axios.post(url + "/api/favorites/add", { itemId }, { headers: { token } });
      }
    } catch (error) {
      console.error("Failed to add to favorites:", error.message);
      // Rollback nếu API thất bại (tùy chọn)
      const rollbackFavorites = favoriteItems.filter((id) => id !== itemId);
      setFavoriteItems(rollbackFavorites);
      localStorage.setItem("favoriteItems", JSON.stringify(rollbackFavorites));
    }
  };

  const removeFromFavorites = async (itemId) => {
    try {
      const newFavorites = favoriteItems.filter((id) => id !== itemId); // Tạo mảng mới
      setFavoriteItems(newFavorites); // Cập nhật state ngay lập tức
      localStorage.setItem("favoriteItems", JSON.stringify(newFavorites));
      if (token) {
        await axios.post(url + "/api/favorites/remove", { itemId }, { headers: { token } });
      }
    } catch (error) {
      console.error("Failed to remove from favorites:", error.message);
      // Rollback nếu API thất bại (tùy chọn)
      const rollbackFavorites = [...favoriteItems, itemId];
      setFavoriteItems(rollbackFavorites);
      localStorage.setItem("favoriteItems", JSON.stringify(rollbackFavorites));
    }
  };

  const loadFavoritesData = async (token) => {
    try {
      console.log("Loading favorites with token:", token); // Debug
      const response = await axios.get(url + "/api/favorites/get", { headers: { token } });
      const newFavorites = Array.isArray(response.data.favorites) ? response.data.favorites : [];
      setFavoriteItems(newFavorites);
      localStorage.setItem("favoriteItems", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Failed to load favorites data:", error.message);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
        await loadFavoritesData(localStorage.getItem("token")); // Tải danh sách yêu thích
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token); // Đồng bộ token với localStorage
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  }, [token, favoriteItems]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    favoriteItems,
    addToFavorites,
    removeFromFavorites,
    loadFavoritesData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
