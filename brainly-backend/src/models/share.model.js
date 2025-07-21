import { Schema, model } from "mongoose";

let shareSchema = new Schema(
  {
    hash: {
      type: String,
      required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
  },
  { timestamps: true }
);

let Share = model("Share", shareSchema);

export default Share;
