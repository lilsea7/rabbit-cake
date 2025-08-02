import express from "express";
import { addToFavorites, removeFromFavorites, getFavorites } from "../controllers/favoritesController.js";
import authMiddleware from "../middleware/auth.js";

const favoritesRouter = express.Router();

favoritesRouter.post("/add", authMiddleware, addToFavorites);
favoritesRouter.post("/remove", authMiddleware, removeFromFavorites);
favoritesRouter.get("/get", authMiddleware, getFavorites);

export default favoritesRouter;