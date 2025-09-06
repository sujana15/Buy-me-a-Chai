import mongoose from 'mongoose'
const connectDb = async () => {
  try {
      const conn=await mongoose.connect(`mongodb://localhost:27017/dashboard`,{
      useNewUrlParser: true,
    });
    console.log("MongoDB connected ")
  } catch (err) {
    console.error("MongoDB connection error", err)
    process.exit(1)

  }
}

export default connectDb;
