

// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import foodModel from "../models/foodModel.js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECERT_KEY);

// // Đặt hàng từ frontend
// const placeOrder = async (req, res) => {
//   const frontend_url = "http://localhost:5174";

//   try {
//     const newOrder = new orderModel({
//       userId: req.userId,
//       items: req.body.items,
//       amount: req.body.amount,
//       address: req.body.address,
//     });
//     await newOrder.save();

//     await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//     const line_items = req.body.items.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100, // Chuyển sang cent
//       },
//       quantity: item.quantity,
//     }));

//     line_items.push({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: "Delivery Charges",
//         },
//         unit_amount: 200, // 2 USD
//       },
//       quantity: 1,
//     });

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       locale: "vi",
//       mode: "payment",
//       line_items: line_items,
//       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//     });

//     res.json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.log("Stripe error:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Đặt hàng COD
// const placeOrderCOD = async (req, res) => {
//   try {
//     const newOrder = new orderModel({
//       userId: req.userId,
//       items: req.body.items,
//       amount: req.body.amount,
//       address: req.body.address,
//       payment: false, // Chưa thanh toán, thanh toán khi nhận hàng
//     });
//     await newOrder.save();

//     await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//     // Cập nhật số lượng sản phẩm trong kho (tương tự verifyOrder)
//     for (const item of req.body.items) {
//       await foodModel.findByIdAndUpdate(
//         item._id,
//         { $inc: { quantity: -item.quantity } },
//         { new: true }
//       );
//     }

//     res.json({ success: true, message: "Đặt hàng thành công, thanh toán khi nhận hàng!" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Lỗi khi đặt hàng COD" });
//   }
// };

// // Xác minh đơn hàng
// const verifyOrder = async (req, res) => {
//   const { orderId, success } = req.body;
//   try {
//     if (success === "true") {
//       const order = await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true });
      
//       for (const item of order.items) {
//         await foodModel.findByIdAndUpdate(
//           item._id,
//           { $inc: { quantity: -item.quantity } },
//           { new: true }
//         );
//       }

//       res.json({ success: true, message: "Paid" });
//     } else {
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({ success: false, message: "Not Paid" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// const userOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({ userId: req.userId });
//     res.json({ success: true, data: orders });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// const listOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({});
//     res.json({ success: true, data: orders });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// const updateStatus = async (req, res) => {
//   try {
//     await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
//     res.json({ success: true, message: "Status updated" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// const getProducts = async (req, res) => {
//   try {
//     const products = await foodModel.find({});
//     res.json({ success: true, data: products });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, getProducts, placeOrderCOD };

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECERT_KEY);

// Đặt hàng từ frontend (thanh toán trực tuyến)
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";

  try {
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Chuyển sang cent
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200, // 2 USD
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      locale: "vi",
      mode: "payment",
      line_items: line_items,
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("Stripe error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Đặt hàng COD
const placeOrderCOD = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false, // Chưa thanh toán, thanh toán khi nhận hàng
    });
    await newOrder.save();

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Giảm số lượng sản phẩm trong kho
    for (const item of req.body.items) {
      const food = await foodModel.findById(item._id);
      if (!food) {
        return res.status(404).json({ success: false, message: `Sản phẩm với ID ${item._id} không tồn tại` });
      }
      if (food.quantity < item.quantity) {
        return res.status(400).json({ success: false, message: `Số lượng không đủ cho sản phẩm ${food.name}` });
      }
      food.quantity -= item.quantity;
      await food.save();
    }

    res.json({ success: true, message: "Đặt hàng thành công, thanh toán khi nhận hàng!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Lỗi khi đặt hàng COD" });
  }
};

// Xác minh đơn hàng (thanh toán trực tuyến)
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      const order = await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true });
      if (!order) {
        return res.status(404).json({ success: false, message: "Đơn hàng không tồn tại" });
      }

      // Giảm số lượng sản phẩm trong kho
      for (const item of order.items) {
        const food = await foodModel.findById(item._id);
        if (!food) {
          return res.status(404).json({ success: false, message: `Sản phẩm với ID ${item._id} không tồn tại` });
        }
        if (food.quantity < item.quantity) {
          return res.status(400).json({ success: false, message: `Số lượng không đủ cho sản phẩm ${food.name}` });
        }
        food.quantity -= item.quantity;
        await food.save();
      }

      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await foodModel.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, getProducts, placeOrderCOD };