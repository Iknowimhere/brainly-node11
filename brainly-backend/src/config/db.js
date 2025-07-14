import mongoose from 'mongoose'
//db connection
async function db() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/brainlyDB");
    console.log("db connected 🛢️");
  } catch (error) {
    console.log("db error", error.message);
  }
}


export default db;
