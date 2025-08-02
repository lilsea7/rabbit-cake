
// import express from "express";
// import { addFood,listFood,removeFood } from "../controllers/foodController.js";
// import multer from "multer";

// const foodRouter = express.Router();

// const storage = multer.diskStorage({
//     destination: "uploads",
//     filename: (req, file, cb) => {
//         return cb(null, `${Date.now()}${file.originalname}`);
//     },
// });

// const upload = multer({ storage: storage });

// foodRouter.post("/add", upload.single("image"), addFood)
// foodRouter.get("/list",listFood)
// foodRouter.post("/remove",removeFood);


// export default foodRouter;

import express from "express";
import { addFood, listFood, removeFood, editFood, getProductById } from "../controllers/foodController.js";
import multer from "multer";

const router = express.Router();

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Định nghĩa các endpoint
router.post("/add", upload.single('image'), addFood); // Thêm sản phẩm
router.get("/list", listFood); // Liệt kê sản phẩm
router.post("/remove", removeFood); // Xóa sản phẩm
router.put("/edit", upload.single('image'), editFood); // Chỉnh sửa sản phẩm
router.get('/products/:id', getProductById); // Thêm endpoint chi tiết

export default router;