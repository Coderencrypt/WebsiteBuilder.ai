// import mongoose from "mongoose"

// const connectDB = async ()=>{
//     try {
//         await mongoose.connect(process.env.MONGODB_URL)
//         console.log("db is connected")
//     } catch (error) {
//         console.log("db error")
//     }
// }

// export default connectDB


import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Log to make sure the environment variable is actually being loaded
        console.log("Attempting to connect to:", process.env.MONGODB_URL); 
        
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB is connected successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error Details:", error.message);
        // Exit the process with failure so your app doesn't try to handle requests without a DB
        process.exit(1); 
    }
};

export default connectDB;