import React, { useEffect, useState } from 'react';
import './List.css';
import axios from "axios";
import { toast } from "react-toastify";
import ProductPopup from '../../components/ProductPopup/ProductPopup';
import EditProductPopup from '../../components/EditProductPopup/EditProductPopup'; // Đã có

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editData, setEditData] = useState({ name: "", category: "", price: "", description: "", quantity: 0, image: null });
  const [selectedProduct, setSelectedProduct] = useState(null); // State cho popup xem

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  const handleEdit = (item) => {
    setEditItem(item._id);
    setEditData({
      name: item.name || "",
      category: item.category || "",
      price: item.price || "",
      description: item.description || "",
      quantity: item.quantity || 0, // Thêm trường quantity
      image: null, // Reset image để chọn file mới nếu cần
    });
  };

  const saveEdit = async (formData) => {
    const dataToSend = new FormData();
    dataToSend.append('id', editItem);
    dataToSend.append('name', formData.name);
    dataToSend.append('category', formData.category);
    dataToSend.append('price', formData.price);
    dataToSend.append('description', formData.description);
    dataToSend.append('quantity', formData.quantity); // Thêm trường quantity
    if (formData.image) {
      dataToSend.append('image', formData.image);
    }

    try {
      const response = await axios.put(`${url}/api/food/edit`, dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.success) {
        toast.success("Sản phẩm đã được cập nhật!");
        setEditItem(null);
        await fetchList();
      } else {
        toast.error("Lỗi khi cập nhật sản phẩm");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi kết nối đến server: " + error.message);
      console.error(error);
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct({
      imageUrl: `${url}/images/${product.image}`,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description || 'Không có mô tả',
      quantity: product.quantity || 0, // Thêm trường quantity
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>Danh sách tất cả các sản phẩm của Rabbit Cake</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Ảnh</b>
          <b>Tên</b>
          <b>Phân loại</b>
          <b>Giá</b>
          <b>Số lượng</b> {/* Thêm cột số lượng */}
          <b>Hành động</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p>{item.quantity || 0}</p> {/* Hiển thị số lượng */}
            <div className='actions'>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
              <p onClick={() => handleEdit(item)} className='cursor'>✏️</p>
              <p onClick={() => handleViewProduct(item)} className='cursor'>👁️</p>
            </div>
          </div>
        ))}
      </div>

      {/* Popup xem sản phẩm */}
      <ProductPopup
        show={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Popup chỉnh sửa sản phẩm */}
      <EditProductPopup
        show={!!editItem}
        product={{
          _id: editItem,
          name: editData.name,
          category: editData.category,
          price: editData.price,
          description: editData.description,
          quantity: editData.quantity, // Thêm trường quantity
          image: editData.image ? `${url}/images/${editData.image}` : null,
        }}
        onSave={saveEdit}
        onClose={() => setEditItem(null)}
      />
    </div>
  );
};

export default List;


// import React, { useEffect, useState } from 'react';
// import './List.css';
// import axios from "axios";
// import { toast } from "react-toastify";
// import ProductPopup from '../../components/ProductPopup/ProductPopup';
// import EditProductPopup from '../../components/EditProductPopup/EditProductPopup'; // Thêm import

// const List = ({ url }) => {
//   const [list, setList] = useState([]);
//   const [editItem, setEditItem] = useState(null);
//   const [editData, setEditData] = useState({ name: "", category: "", price: "", description: "", quantity: 0, image: null });
//   const [selectedProduct, setSelectedProduct] = useState(null); // State cho popup xem

//   const fetchList = async () => {
//     const response = await axios.get(`${url}/api/food/list`);
//     if (response.data.success) {
//       setList(response.data.data);
//     } else {
//       toast.error("Error");
//     }
//   };

//   const removeFood = async (foodId) => {
//     const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
//     await fetchList();
//     if (response.data.success) {
//       toast.success(response.data.message);
//     } else {
//       toast.error("Error");
//     }
//   };

//   const handleEdit = (item) => {
//     setEditItem(item._id);
//     setEditData({
//       name: item.name || "",
//       category: item.category || "",
//       price: item.price || "",
//       description: item.description || "",
//       quantity: item.quantity || 0,
//       image: null, // Reset image để chọn file mới nếu cần
//     });
//   };

//   const saveEdit = async (formData) => {
//     const dataToSend = new FormData();
//     dataToSend.append('id', editItem);
//     dataToSend.append('name', formData.name);
//     dataToSend.append('category', formData.category);
//     dataToSend.append('price', formData.price);
//     dataToSend.append('description', formData.description);
//     dataToSend.append('quantity', formData.quantity);
//     if (formData.image) {
//       dataToSend.append('image', formData.image);
//     }

//     try {
//       const response = await axios.put(`${url}/api/food/edit`, dataToSend, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       if (response.data.success) {
//         toast.success("Sản phẩm đã được cập nhật!");
//         setEditItem(null);
//         await fetchList();
//       } else {
//         toast.error("Lỗi khi cập nhật sản phẩm");
//       }
//     } catch (error) {
//       toast.error("Có lỗi xảy ra khi kết nối đến server: " + error.message);
//       console.error(error);
//     }
//   };

//   const handleViewProduct = (product) => {
//     setSelectedProduct({
//       imageUrl: `${url}/images/${product.image}`,
//       name: product.name,
//       category: product.category,
//       price: product.price,
//       description: product.description || 'Không có mô tả',
//     });
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <div className='list add flex-col'>
//       <p>Danh sách tất cả các sản phẩm của Rabbit Cake</p>
//       <div className="list-table">
//         <div className="list-table-format title">
//           <b>Ảnh</b>
//           <b>Tên</b>
//           <b>Phân loại</b>
//           <b>Giá</b>
//           <b>Hành động</b>
//         </div>
//         {list.map((item, index) => (
//           <div key={index} className='list-table-format'>
//             <img src={`${url}/images/${item.image}`} alt="" />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>{item.price}</p>
//             <div className='actions'>
//               <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
//               <p onClick={() => handleEdit(item)} className='cursor'>✏️</p> {/* Mở EditProductPopup */}
//               <p onClick={() => handleViewProduct(item)} className='cursor'>👁️</p> {/* Mở ProductPopup */}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Popup xem sản phẩm */}
//       <ProductPopup
//         show={!!selectedProduct}
//         product={selectedProduct}
//         onClose={() => setSelectedProduct(null)}
//       />

//       {/* Popup chỉnh sửa sản phẩm */}
//       <EditProductPopup
//         show={!!editItem}
//         product={{
//           _id: editItem,
//           name: editData.name,
//           category: editData.category,
//           price: editData.price,
//           description: editData.description,
//           quantity: editData.quantity,
//           image: editData.image ? `${url}/images/${editData.image}` : null,
//         }}
//         onSave={saveEdit}
//         onClose={() => setEditItem(null)}
//       />
//     </div>
//   );
// };

// export default List;