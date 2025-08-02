// import express from "express"
// import cors from "cors"
// import { connectDB } from "./config/db.js"
// import foodRouter from "./routes/foodRouter.js"
// import userRouter from "./routes/userRoute.js"
// import'dotenv/config.js'
// import cartRouter from "./routes/cartRoute.js"
// import orderRouter from "./routes/orderRoute.js"


// //app config
// const app = express()
// const port = 4000

// //middleware
// app.use(express.json())
// app.use(express.urlencoded({ extended: true })); // Cho form-data
// app.use(cors())

// //db connection
// connectDB();

// //api endpoints
// app.use("/api/food",foodRouter)
// app.use("/images",express.static('uploads'))
// app.use("/api/user",userRouter)
// app.use("/api/cart",cartRouter)
// app.use("/api/order",orderRouter)


// app.get("/",(req,res)=>{
//     res.send("API Working")
// })

// app.listen(port,()=>{
//     console.log(`Server Started on http://localhost:${port}`)
// })

// // mongodb+srv://txinh:Nthao01%40@cluster0.dzeaxxl.mongodb.net/?

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRouter.js";
import userRouter from "./routes/userRoute.js";
import dotenv from 'dotenv/config.js'; // Sửa lỗi cú pháp import dotenv
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import multer from "multer"; // Thêm multer
import favoritesRoutes from './routes/favoritesRoutes.js'

// app config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Cho form-data
app.use(cors());

// Cấu hình multer để xử lý upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter); // Đã bao gồm foodRouter
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use('/api/favorites', favoritesRoutes);

// Test endpoint
app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});