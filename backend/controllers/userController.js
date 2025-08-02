

// // controllers/userController.js
// import userModel from "../models/userModel.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import validator from "validator";
// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: './uploads/',
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET);
// };

// // Register user
// const registerUser = async (req, res) => {
//   const { name, password, email, address, phone } = req.body;
//   try {
//     const exists = await userModel.findOne({ email });
//     if (exists) {
//       return res.json({ success: false, message: "User already exists" });
//     }

//     if (!validator.isEmail(email)) {
//       return res.json({ success: false, message: "Please enter a valid email" });
//     }

//     if (password.length < 8) {
//       return res.json({ success: false, message: "Please enter a strong pass" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new userModel({
//       name,
//       email,
//       password: hashedPassword,
//       address: address || '', // Giá trị mặc định nếu không cung cấp
//       phone: phone || '',    // Giá trị mặc định nếu không cung cấp
//       avatar: null,          // Giá trị mặc định cho avatar
//     });

//     const user = await newUser.save();
//     const token = createToken(user._id);
//     res.json({ success: true, token });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// // Login user
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res.json({ success: false, message: "User Doesn't exists" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
    
//     if (!isMatch) {
//       return res.json({ success: false, message: "Invalid credentials" });
//     }

//     const token = createToken(user._id);

//     let redirectUrl = '/';
//     if (email.endsWith('@gmail.com')) {
//       redirectUrl = 'https://rabbit-cake.onrender.com';
//     } else if (email.endsWith('@rabbitcake.com')) {
//       redirectUrl = 'https://rabbit-cake-admin.onrender.com';
//     }
//     res.json({ success: true, token, redirectUrl });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// // Get user profile
// const getProfile = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.userId).select('name email address phone avatar');
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }
//     res.json({ success: true, data: user });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// // Update user profile
// const updateProfile = async (req, res) => {
//   try {
//     const { name, address, phone, email, password } = req.body;
//     let avatar = null;
//     if (req.file) {
//       avatar = req.file.filename; // Chỉ lưu tên file
//     }

//     const updateData = { name, address, phone, email };
//     if (avatar) updateData.avatar = avatar;
//     if (password) {
//       if (password.length < 8) {
//         return res.json({ success: false, message: 'Please enter a strong password' });
//       }
//       updateData.password = await bcrypt.hash(password, 10);
//     }

//     const user = await userModel.findByIdAndUpdate(req.userId, updateData, {
//       new: true,
//       runValidators: true,
//     });
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     const token = createToken(user._id);
//     res.json({
//       success: true,
//       message: 'Profile updated',
//       token,
//       data: user,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// // Remove user (tùy chọn, dựa trên removeFood)
// const removeUser = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.body.id);
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // Loại bỏ logic xóa file trực tiếp
//     await userModel.findByIdAndDelete(req.body.id);
//     res.json({ success: true, message: "User Removed" });
//   } catch (error) {
//     console.log("Error removing user:", error);
//     res.status(500).json({ success: false, message: "Error removing user" });
//   }
// };

// export { registerUser, loginUser, getProfile, updateProfile, removeUser };

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import multer from "multer";

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register user
// const registerUser = async (req, res) => {
//   const { name, password, email, address, phone } = req.body;
//   try {
//     const exists = await userModel.findOne({ email });
//     if (exists) {
//       return res.json({ success: false, message: "User already exists" });
//     }

//     if (!validator.isEmail(email)) {
//       return res.json({ success: false, message: "Please enter a valid email" });
//     }

//     if (password.length < 8) {
//       return res.json({ success: false, message: "Please enter a strong pass" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new userModel({
//       name,
//       email,
//       password: hashedPassword,
//       address: address || '', // Giá trị mặc định nếu không cung cấp
//       phone: phone || '',    // Giá trị mặc định nếu không cung cấp
//       avatar: null,          // Giá trị mặc định cho avatar
//     });

//     const user = await newUser.save();
//     const token = createToken(user._id);
//     res.json({ success: true, token });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };
const registerUser = async (req, res) => {
  const { name, password, email, address, phone } = req.body;

  try {
    // Kiểm tra các trường bắt buộc
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ tên, email và mật khẩu' });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Email đã tồn tại' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập email hợp lệ' });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Mật khẩu phải có ít nhất 8 ký tự' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      address: address || '', // Giá trị mặc định rỗng nếu không cung cấp
      phone: phone || '',    // Giá trị mặc định rỗng nếu không cung cấp
      avatar: null,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error('Register error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: `Dữ liệu không hợp lệ: ${error.message}` });
    } else if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email đã tồn tại' });
    }
    res.status(500).json({ success: false, message: 'Lỗi máy chủ, vui lòng thử lại' });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    let redirectUrl = '/';
    if (email.endsWith('@gmail.com')) {
      redirectUrl = 'http://localhost:5174';
    } else if (email.endsWith('@rabbitcake.com')) {
      redirectUrl = 'http://localhost:5173';
    }
    res.json({ success: true, token, redirectUrl });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select('name email address phone avatar');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, address, phone, email, password } = req.body;
    let avatar = null;
    if (req.file) {
      avatar = req.file.filename; // Chỉ lưu tên file
    }

    const updateData = { name, address, phone, email };
    if (avatar) updateData.avatar = avatar;
    if (password) {
      if (password.length < 8) {
        return res.json({ success: false, message: 'Please enter a strong password' });
      }
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await userModel.findByIdAndUpdate(req.userId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      message: 'Profile updated',
      token,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Remove user (tùy chọn, dựa trên removeFood)
const removeUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Loại bỏ logic xóa file trực tiếp
    await userModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "User Removed" });
  } catch (error) {
    console.log("Error removing user:", error);
    res.status(500).json({ success: false, message: "Error removing user" });
  }
};

export { registerUser, loginUser, getProfile, updateProfile, removeUser };
