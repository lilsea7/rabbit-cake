import userModel from "../models/userModel.js";

// Add item to user cart
const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId || req.body.userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userData._id, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Remove item from user cart
const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId || req.body.userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(userData._id, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get user cart data
const gerCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId || req.body.userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error in gerCart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { addToCart, removeFromCart, gerCart };
