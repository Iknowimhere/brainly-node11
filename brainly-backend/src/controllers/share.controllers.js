import Content from "../models/content.model.js";
import Share from "../models/share.model.js";
// const { createHmac } = require('node');

import { createHmac } from "crypto";

const secret = "mySecret";
const hash = createHmac("sha256", secret)
  .update("I love cupcakes")
  .digest("hex");

const shareContent = async (req, res, next) => {
  try {
    let existingShare = await Share.findOne({ userId: req.userId });
    if (req.body.share) {
      if (existingShare) {
        res.status(200).json({ hash: existingShare.hash });
        return;
      }
      let newShare = await Share.create({
        userId: req.userId,
        hash: hash,
      });
      res.status(200).json({
        hash: newShare.hash,
      });
    } else {
      //   let existingShare = await Share.findOne({ userId: req.userId });
      if (!existingShare) {
        res.status(200).json({ message: "Share link doesn't exist" });
        return;
      }
      await Share.findOneAndDelete({ userId: req.userId });
      res.status(200).json({ message: "Link deleted" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
let getContentForLink = async (req, res, next) => {
  let { hash } = req.params;
  try {
    //verify hash
    let share = await Share.findOne({ hash }).populate(
      "userId",
      "-password -confirmPassword"
    );
    if (!share) {
      res.status(200).json({ message: "Link expired" });
    }
    let content = await Content.find({ userId: share.userId });

    res.json({ content, username: share.userId.username });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { shareContent, getContentForLink };
