import mongoose from 'mongoose'
//db connection
async function db() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected 🛢️");
  } catch (error) {
    console.log("db error", error.message);
  }
}


export default db;
