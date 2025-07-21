import { Schema, model } from "mongoose";

let tagSchema = new Schema(
  {
    title: {
      type: String,
      required:true,
      unique:true
    },
  },
  { timestamps: true }
);

let Tag = model("Tag", tagSchema);

export default Tag;
