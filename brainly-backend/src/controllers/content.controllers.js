import Content from "../models/content.model.js";
import Tag from "../models/tag.model.js";

let createContent = async (req, res, next) => {
  let { link, title, tag, type } = req.body;
  try {
    let existingTag = await Tag.findOne({ title: tag });
    let newTag;
    if (!existingTag) {
      newTag = await Tag.create({ title: tag });
    }

    let content = await Content.create({
      title,
      link,
      type,
      userId: req.userId,
    });
    if (existingTag) {
      content.tag.push(existingTag._id);
    } else {
      content.tag.push(newTag._id);
    }
    await content.save();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getContent = async (req, res, next) => {
  try {
    let contentList = await Content.find({ userId: req.userId });
    if (!contentList) {
      res.status(200).json({ message: "No content created yet" });
      return;
    }
    res.status(200).json(contentList);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteContent = async (req, res, next) => {
  let { id } = req.params;
  try {
    let content = await Content.findOneAndDelete({_id:id,userId:req.userId});
    if (!content) {
      res.status(200).json({ message: "Can't delete the content" });
      return;
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { createContent, getContent, deleteContent };
