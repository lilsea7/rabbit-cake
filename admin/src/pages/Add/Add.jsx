// import React, { useEffect, useState } from 'react'
// import './Add.css'
// import { assets } from '../../assets/assets'
// import axios from "axios"
// import { toast } from 'react-toastify'
// const Add = ({url}) => {

//     const [image,setImage] = useState(false)
//     const [data,setData] = useState({
//         name:"",
//         description:"",
//         price:"",
//         category:"Bánh mì"
//     })

//     const onChangeHandler = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;
//         setData(data=>({...data,[name]:value}))
//     }

//     const onSubmitHandler = async (event) => {
//         event.preventDefault();
//         const formData = new FormData();
//         formData.append("name",data.name)
//         formData.append("description",data.description)
//         formData.append("price",Number(data.price))
//         formData.append("category",data.category)
//         formData.append("image",image)
//         const reponse = await axios.post(`${url}/api/food/add`,formData);
//         if (reponse.data.success) {
//             setData({
//                 name:"",
//                 description:"",
//                 price:"",
//                 category:"Bánh mì"
//             })
//             setImage(false)
//             toast.success(reponse.data.message)
//         }
//         else {
//             toast.error(reponse.data.message)
//         }

//     }

//     useEffect(()=>{
//         console.log(data);
//     },[data])

//   return (
//     <div className='add'>
//       <form className='flex-col' onSubmit={onSubmitHandler}>
//         <div className="add-img-upload flex-col">
//             <p>Tải lên hình ảnh</p>
//             <label htmlFor="image">
//                 <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
//             </label>
//             <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
//         </div>
//         <div className="add-product-name flex-col">
//             <p>Tên sản phẩm</p>
//             <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Thêm tại đây' />
//         </div>
//         <div className="add-product-description flex-col">
//             <p>Mô tả sản phẩm</p>
//             <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Mô tả tại đây' required></textarea>
//         </div>
//         <div className="add-category-price">
//             <div className="add-category flex-col">
//                 <p>Phân loại sản phẩm</p>
//                 <select onChange={onChangeHandler} name="category" >
//                     <option value="Bánh mì">Bánh mì</option>
//                     <option value="Bánh kem">Bánh kem</option>
//                     <option value="Bánh ngọt">Bánh ngọt</option>
//                     <option value="Bánh khô">Bánh khô</option>
//                     <option value="Bánh đông lạnh">Bánh đông lạnh</option>
//                     <option value="Đồ uống">Đồ uống</option>
//                     <option value="Bánh mùa vụ">Bánh mùa vụ</option>
//                     <option value="Phụ kiện">Phụ kiện</option>
//                 </select>
//             </div>
//             <div className="add-price flex-col">
//                 <p>Giá sản phẩm</p>
//                 <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='500.000₫' />
//             </div>
//         </div>
//         <button type='submit' className='add-btn'>Thêm mới</button>
//       </form>
//     </div>
//   )
// }

// export default Add

//them quantity
import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({ url }) => {
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Bánh mì",
        quantity: "" // Thêm trường quantity
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("quantity", Number(data.quantity)) // Thêm quantity
        formData.append("image", image)
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Bánh mì",
                quantity: "" // Reset quantity
            })
            setImage(false)
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Tải lên hình ảnh</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Tên sản phẩm</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Thêm tại đây' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Mô tả sản phẩm</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Mô tả tại đây' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Phân loại sản phẩm</p>
                        <select onChange={onChangeHandler} name="category" >
                            <option value="Bánh mì">Bánh mì</option>
                            <option value="Bánh kem">Bánh kem</option>
                            <option value="Bánh ngọt">Bánh ngọt</option>
                            <option value="Bánh khô">Bánh khô</option>
                            <option value="Bánh đông lạnh">Bánh đông lạnh</option>
                            <option value="Đồ uống">Đồ uống</option>
                            <option value="Bánh mùa vụ">Bánh mùa vụ</option>
                            <option value="Phụ kiện">Phụ kiện</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Giá sản phẩm</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='500.000₫' />
                    </div>
                </div>
                <div className="add-quantity flex-col"> {/* Thêm div cho quantity */}
                    <p>Số lượng</p>
                    <input onChange={onChangeHandler} value={data.quantity} type="number" name='quantity' placeholder='Nhập số lượng' required />
                </div>
                <button type='submit' className='add-btn'>Thêm mới</button>
            </form>
        </div>
    )
}

export default Add