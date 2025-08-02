// import foodModel from "../models/foodModel.js";
// import fs from "fs";

// // add food item
// const addFood = async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: "Không có tệp nào được tải lên" });
//     }

//     const image_filename = `${req.file.filename}`;
//     console.log("Image filename:", image_filename); // Debug

//     const food = new foodModel({
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         category: req.body.category,
//         image: image_filename
//     });

//     try {
//         await food.save();
//         res.json({ success: true, message: "Cake Added" });
//     } catch (error) {
//         console.log("Error saving food:", error);
//         res.status(500).json({ success: false, message: "Error saving food" });
//     }
// };

// // all food list
// const listFood = async (req, res) => {
//     try {
//         const foods = await foodModel.find({});
//         res.json({ success: true, data: foods });
//     } catch (error) {
//         console.log("Error listing foods:", error);
//         res.status(500).json({ success: false, message: "Error listing foods" });
//     }
// };

// // remove food item
// const removeFood = async (req, res) => {
//     try {
//         const food = await foodModel.findById(req.body.id);
//         if (!food) {
//             return res.status(404).json({ success: false, message: "Food not found" });
//         }

//         // Xóa file image nếu tồn tại
//         if (food.image) {
//             fs.unlink(`uploads/${food.image}`, (err) => {
//                 if (err) console.log("Error deleting file:", err);
//             });
//         }

//         await foodModel.findByIdAndDelete(req.body.id);
//         res.json({ success: true, message: "Cake Removed" });
//     } catch (error) {
//         console.log("Error removing food:", error);
//         res.status(500).json({ success: false, message: "Error removing food" });
//     }
// };

// export { addFood, listFood, removeFood };

import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Không có tệp nào được tải lên" });
    }

    const image_filename = `${req.file.filename}`;
    console.log("Image filename:", image_filename);

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
        quantity: req.body.quantity || 0 // Thêm quantity
    });

    try {
        await food.save();
        res.json({ success: true, message: "Cake Added" });
    } catch (error) {
        console.log("Error saving food:", error);
        res.status(500).json({ success: false, message: "Error saving food" });
    }
};

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log("Error listing foods:", error);
        res.status(500).json({ success: false, message: "Error listing foods" });
    }
};

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        if (food.image) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.log("Error deleting file:", err);
            });
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Cake Removed" });
    } catch (error) {
        console.log("Error removing food:", error);
        res.status(500).json({ success: false, message: "Error removing food" });
    }
};

// edit food item
const editFood = async (req, res) => {
    try {
        const { id, name, description, price, category, quantity } = req.body;
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        let updatedImage = food.image;
        if (req.file) {
            if (food.image) {
                fs.unlink(`uploads/${food.image}`, (err) => {
                    if (err) console.log("Error deleting old file:", err);
                });
            }
            updatedImage = req.file.filename;
        }

        food.name = name || food.name;
        food.description = description || food.description;
        food.price = price || food.price;
        food.category = category || food.category;
        food.quantity = quantity || food.quantity; // Cập nhật quantity
        food.image = updatedImage;

        await food.save();
        res.json({ success: true, message: "Cake Updated", data: food });
    } catch (error) {
        console.log("Error editing food:", error);
        res.status(500).json({ success: false, message: "Error editing food" });
    }
};

// foodController.js
const getProductById = async (req, res) => {
  try {
    const product = await foodModel.findById(req.params.id);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching product" });
  }
};

export { addFood, listFood, removeFood, editFood, getProductById };