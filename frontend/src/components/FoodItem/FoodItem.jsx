
// //them quantity
// import React, { useContext } from 'react';
// import './FoodItem.css';
// import { assets } from '../../assets/assets';
// import { StoreContext } from '../../context/StoreContext';

// const FoodItem = ({ id, name, price, description, image, quantity }) => {
//     const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

//     const handleAddToCart = () => {
//         console.log("Adding to cart:", { id, quantity, currentCart: cartItems[id] }); // Thêm log để debug
//         if (quantity > 0 && (cartItems[id] || 0) < quantity) { // Sử dụng || 0 để tránh undefined
//             addToCart(id); // Sửa _id thành id
//         } else {
//             alert("Sản phẩm đã hết hàng hoặc số lượng trong giỏ đã đạt giới hạn!");
//         }
//     };

//     return (
//         <div className='food-item'>
//             <div className="food-item-img-container">
//                 <img className='food-item-image' src={url + "/images/" + image} alt="" />
//                 {!cartItems[id]
//                     ? <img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="" />
//                     : <div className='food-item-counter'>
//                         <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
//                         <p>{cartItems[id]}</p>
//                         <img onClick={handleAddToCart} src={assets.add_icon_green} alt="" />
//                     </div>
//                 }
//             </div>
//             <div className="food-item-info">
//                 <div className="food-item-name-rating">
//                     <p>{name}</p>
//                     <img src={assets.rating_starts} alt="" />
//                 </div>
//                 <p className="food-item-desc">{description}</p>
//                 <p className="food-item-price">{price}.000₫</p>
//                 <p className="food-item-quantity">Số lượng: {quantity}</p>
//             </div>
//         </div>
//     );
// };

// export default FoodItem;
// import React, { useContext, useState, useEffect, useRef } from 'react';
// import './FoodItem.css';
// import { assets } from '../../assets/assets';
// import { StoreContext } from '../../context/StoreContext';
// import { useNavigate } from 'react-router-dom';

// const FoodItem = ({ id, name, price, description, image, hoverImage, quantity }) => {
//   const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
//   const [currentImage, setCurrentImage] = useState(url + "/images/" + image);
//   const imageRef = useRef(null);
//   const navigate = useNavigate();

//   const handleAddToCart = () => {
//     console.log("Adding to cart:", { id, quantity, currentCart: cartItems[id] });
//     if (quantity > 0 && (cartItems[id] || 0) < quantity) {
//       addToCart(id);
//     } else {
//       alert("Sản phẩm đã hết hàng hoặc số lượng trong giỏ đã đạt giới hạn!");
//     }
//   };

//   useEffect(() => {
//     const imgElement = imageRef.current;
//     if (imgElement) {
//       const handleMouseOver = () => {
//         setCurrentImage(hoverImage ? url + "/images/" + hoverImage : url + "/images/" + image);
//       };
//       const handleMouseOut = () => {
//         setCurrentImage(url + "/images/" + image);
//       };

//       imgElement.addEventListener('mouseover', handleMouseOver);
//       imgElement.addEventListener('mouseout', handleMouseOut);

//       return () => {
//         imgElement.removeEventListener('mouseover', handleMouseOver);
//         imgElement.removeEventListener('mouseout', handleMouseOut);
//       };
//     }
//   }, [id, hoverImage, image, url]);

//   const handleProductClick = () => {
//     navigate(`/product/${id}`); // Điều hướng đến trang chi tiết
//   };

//   return (
//     <div className='food-item' onClick={handleProductClick}>
//       <div className="food-item-img-container">
//         <img 
//           ref={imageRef}
//           className='food-item-image' 
//           src={currentImage} 
//           alt={name} 
//           data-hover={hoverImage ? url + "/images/" + hoverImage : url + "/images/" + image} 
//           data-id={id}
//         />
//         {!cartItems[id]
//           ? <img className='add' onClick={(e) => { e.stopPropagation(); handleAddToCart(); }} src={assets.add_icon_white} alt="" />
//           : <div className='food-item-counter'>
//               <img onClick={(e) => { e.stopPropagation(); removeFromCart(id); }} src={assets.remove_icon_red} alt="" />
//               <p>{cartItems[id]}</p>
//               <img onClick={(e) => { e.stopPropagation(); handleAddToCart(); }} src={assets.add_icon_green} alt="" />
//             </div>
//         }
//       </div>
//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//           <p>{name}</p>
//           <img src={assets.rating_starts} alt="" />
//         </div>
//         {/* <p className="food-item-desc">{description}</p> */}
//         <p className="food-item-price">{price}.000₫</p>
//         <p className="food-item-quantity">Số lượng: {quantity}</p>
//       </div>
//     </div>
//   );
// };

// export default FoodItem;

//favorite
import React, { useContext, useState, useEffect, useRef } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const FoodItem = ({ id, name, price, description, image, hoverImage, quantity }) => {
  const { cartItems, addToCart, removeFromCart, url, favoriteItems, addToFavorites, removeFromFavorites } = useContext(StoreContext);
  const [currentImage, setCurrentImage] = useState(url + "/images/" + image);
  const [isFavorite, setIsFavorite] = useState(favoriteItems.includes(id)); // Kiểm tra xem id có trong favoriteItems không
  const imageRef = useRef(null);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    console.log("Adding to cart:", { id, quantity, currentCart: cartItems[id] });
    if (quantity > 0 && (cartItems[id] || 0) < quantity) {
      addToCart(id);
    } else {
      alert("Sản phẩm đã hết hàng hoặc số lượng trong giỏ đã đạt giới hạn!");
    }
  };

  useEffect(() => {
    const imgElement = imageRef.current;
    if (imgElement) {
      const handleMouseOver = () => {
        setCurrentImage(hoverImage ? url + "/images/" + hoverImage : url + "/images/" + image);
      };
      const handleMouseOut = () => {
        setCurrentImage(url + "/images/" + image);
      };

      imgElement.addEventListener('mouseover', handleMouseOver);
      imgElement.addEventListener('mouseout', handleMouseOut);

      return () => {
        imgElement.removeEventListener('mouseover', handleMouseOver);
        imgElement.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [id, hoverImage, image, url]);

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
    setIsFavorite(!isFavorite);
    console.log(`Product ${id} ${isFavorite ? 'removed from' : 'added to'} favorites`);
  };

  return (
    <div className='food-item' onClick={handleProductClick}>
      <div className="food-item-img-container">
        <img 
          ref={imageRef}
          className='food-item-image' 
          src={currentImage} 
          alt={name} 
          data-hover={hoverImage ? url + "/images/" + hoverImage : url + "/images/" + image} 
          data-id={id}
        />
        {!cartItems[id]
          ? <img className='add' onClick={(e) => { e.stopPropagation(); handleAddToCart(); }} src={assets.add_icon_white} alt="" />
          : <div className='food-item-counter'>
              <img onClick={(e) => { e.stopPropagation(); removeFromCart(id); }} src={assets.remove_icon_red} alt="" />
              <p>{cartItems[id]}</p>
              <img onClick={(e) => { e.stopPropagation(); handleAddToCart(); }} src={assets.add_icon_green} alt="" />
            </div>
        }
        <img
          src={isFavorite ? assets.icon_favorite_filled : assets.icon_favorite}
          className="favorite-icon"
          onClick={handleFavoriteToggle}
          alt="Favorite"
        />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-price">{price}.000₫</p>
        <p className="food-item-quantity">Số lượng: {quantity}</p>
      </div>
    </div>
  );
};

export default FoodItem;