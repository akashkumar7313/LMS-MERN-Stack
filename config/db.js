import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const MONGODB_URL = process.env.MONGODB_URL;

// mongoDb database connection
const databaseconnect = () => {
  mongoose
    .connect(MONGODB_URL || `mongodb://127.0.0.1:27017/LMS`)
    .then((conn) => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err.message));
};

export default databaseconnect;