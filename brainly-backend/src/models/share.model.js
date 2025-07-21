import { Schema, model } from "mongoose";

let shareSchema = new Schema(
  {
    hash: {
      type: String,
      required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        reference:"User",
        required:true
    }
  },
  { timestamps: true }
);

let Share = model("Tag", shareSchema);

export default Share;
