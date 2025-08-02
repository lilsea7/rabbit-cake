
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }], // Tham chiếu đến model Food
    address: { type: String, required: false }, // Thêm địa chỉ
    phone: { type: String, required: false }, // Thêm số điện thoại
    avatar: { type: String } // Thêm đường dẫn ảnh đại diện, không bắt buộc
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
