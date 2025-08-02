// import React, { useContext, useState } from 'react'
// import './LoginPopup.css'
// import { assets } from '../../assets/assets'
// import { StoreContext } from '../../context/StoreContext'
// import axios from "axios"

// const LoginPopup = ({setShowLogin}) => {

//   const {url,setToken} = useContext(StoreContext)

//     const [currState, setCurrState] = useState("Login")
//     const [data,setData] = useState({
//       name:"",
//       email:"",
//       password:""
//     })

//     const onChangeHandler = (event) => {
//       const name = event.target.name;
//       const value = event.target.value;
//       setData(data=>({...data,[name]:value}))
//     }

//     const onLogin  = async (event) => {
//       event.preventDefault()
//       let newUrl = url;
//       if (currState==="Login") {
//         newUrl += "/api/user/login"
//       }
//       else{
//         newUrl += "/api/user/register"
//       }

//       const response = await axios.post(newUrl,data);

//       if (response.data.success) {
//         setToken(response.data.token);
//         localStorage.setItem("token",response.data.token);
//         setShowLogin(false)
//       }
//       else{
//         alert(response.data.message)
//       }

//     }



//   return (
//     <div className='login-popup'>
//       <form onSubmit={onLogin} className="login-popup-container">
//         <div className="login-popup-title">
//             <h2>{currState === "Login" ? "Đăng nhập" : "Đăng ký"}</h2>
//             <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
//         </div>
//         <div className="login-popup-inputs">
//           {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Tên xinh đẹp của bạn iu' required />}
//           <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required />
//           <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
//         </div>
//         <button type='submit'>{currState==="Sign Up"?"Tham gia với Rabbit":"Đăng nhập"}</button>
//         {currState === "Sign Up" && (
//           <div className="login-popup-condition">
//             <input type="checkbox" required />
//             <p>Khi click chọn là bạn đã đồng ý với điều khoản của chúng tôi.</p>
//           </div>
//         )}
//         {currState==="Login"
//         ?<p>Bạn chưa có tài khoản? <span onClick={()=>setCurrState("Sign Up")}>Tạo ngay</span> để gia nhập với Rabbit</p>
//         :<p>Bạn đã có tài khoản hãy <span onClick={()=>setCurrState("Login")}>Đăng nhập</span> ngay với Rabbit</p>
//       }
        
        
//       </form>
//     </div>
//   )
// }

// export default LoginPopup


//update tinh nang 

import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      }
      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl; // Điều hướng đến URL từ backend
      }
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState === "Login" ? "Đăng nhập" : "Đăng ký"}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Tên xinh đẹp của bạn iu' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Tham gia với Rabbit" : "Đăng nhập"}</button>
        {currState === "Sign Up" && (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>Khi click chọn là bạn đã đồng ý với điều khoản của chúng tôi.</p>
          </div>
        )}
        {currState === "Login"
          ? <p>Bạn chưa có tài khoản? <span onClick={() => setCurrState("Sign Up")}>Tạo ngay</span> để gia nhập với Rabbit</p>
          : <p>Bạn đã có tài khoản hãy <span onClick={() => setCurrState("Login")}>Đăng nhập</span> ngay với Rabbit</p>
        }
      </form>
    </div>
  );
};

export default LoginPopup;