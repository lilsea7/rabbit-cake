// import jwt from "jsonwebtoken"

// const authMiddleware = async (req,res,next) => {
//     const {token} = req.headers;
//     if (!token) {
//         return res.json({success:false,message:"Not authorized login again"})
//     }
//     try {
//         const token_decode = jwt.verify(token,process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
        
//     }

// }

// export default authMiddleware;

// import jwt from "jsonwebtoken"

// const authMiddleware = async (req, res, next) => {
//   const { token } = req.headers;

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Not authorized, please log in again"
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id; // 👈 gán vào đúng chỗ
//     next();
//   } catch (error) {
//     console.log("JWT decode error:", error);
//     return res.status(403).json({
//       success: false,
//       message: "Invalid token"
//     });
//   }
// };

// export default authMiddleware;


// import jwt from "jsonwebtoken";

// const authMiddleware = async (req, res, next) => {
//   const { token } = req.headers;

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Not authorized, please log in again"
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded token:", decoded); // Debug nội dung token
//     req.userId = decoded.id; // Gán userId, kiểm tra tên trường (id, _id, userId)
//     next();
//   } catch (error) {
//     console.log("JWT decode error:", error);
//     return res.status(403).json({
//       success: false,
//       message: "Invalid token"
//     });
//   }
// };

// export default authMiddleware;

// middleware/auth.js
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, please log in again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debug nội dung token

    // Kiểm tra và gán req.userId, xử lý các trường hợp tên trường khác nhau
    if (decoded.id) {
      req.userId = decoded.id;
    } else if (decoded._id) {
      req.userId = decoded._id;
    } else if (decoded.userId) {
      req.userId = decoded.userId;
    } else {
      throw new Error("Token does not contain a valid user identifier (id, _id, or userId)");
    }

    console.log("Assigned userId:", req.userId); // Debug userId được gán
    next();
  } catch (error) {
    console.log("JWT decode error:", error.message);
    return res.status(403).json({
      success: false,
      message: "Invalid token",
      error: error.message, // Trả về lỗi chi tiết cho debug
    });
  }
};

export default authMiddleware;