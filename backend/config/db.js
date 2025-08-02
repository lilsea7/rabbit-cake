import mongoose  from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://txinh:Nthao01%40@cluster0.dzeaxxl.mongodb.net/rabbit-cake').then(()=>console.log("DB Connected"));
}
