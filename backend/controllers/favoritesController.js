// controllers/favoritesController.js
import userModel from "../models/userModel.js";

const addToFavorites = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId || req.body.userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const favorites = userData.favorites || [];

    if (!favorites.includes(req.body.itemId)) {
      favorites.push(req.body.itemId);
      await userModel.findByIdAndUpdate(userData._id, { favorites });
    }

    res.json({ success: true, message: "Added to Favorites" });
  } catch (error) {
    console.error("Error in addToFavorites:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId || req.body.userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let favorites = userData.favorites || [];

    favorites = favorites.filter((id) => id.toString() !== req.body.itemId);

    await userModel.findByIdAndUpdate(userData._id, { favorites });
    res.json({ success: true, message: "Removed from Favorites" });
  } catch (error) {
    console.error("Error in removeFromFavorites:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    console.log("UserId:", req.userId); // Debug userId
    const userData = await userModel.findById(req.userId).populate('favorites');
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    console.log("Favorites data:", userData.favorites); // Debug dữ liệu
    const favorites = userData.favorites || [];
    res.json({ success: true, favorites });
  } catch (error) {
    console.error("Error in getFavorites:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export { addToFavorites, removeFromFavorites, getFavorites };