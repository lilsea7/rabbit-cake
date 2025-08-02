import express from "express"
import { addToCart,removeFromCart,gerCart } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js";


const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware, addToCart)
cartRouter.post("/remove",authMiddleware ,removeFromCart)
cartRouter.post("/get", authMiddleware,gerCart)

export default cartRouter;