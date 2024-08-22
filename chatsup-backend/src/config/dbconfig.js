import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log("db connected successfully");
    } catch (error) {
        console.log("failed to connect");
    }
}

export default connectDB;