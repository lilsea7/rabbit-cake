// import mongoose from "mongoose";

// const foodSchema = new mongoose.Schema({
//     name: {type:String,requied:true},
//     description: {type:String,requied:true},
//     price: {type:Number,requied:true},
//     image: {type:String,requied:true},
//     category: {type:String,requied:true}
// })

// const foodModel = mongoose.models.food || mongoose.model("food",foodSchema);

// export default foodModel;

//them quantity
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true } // Thêm thuộc tính số lượng
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;