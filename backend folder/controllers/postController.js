import Post from "../models/Post.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

export const upload = multer({ storage });

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const imageUrl = req.file ? req.file.filename : null;
    const post = await Post.create({
      userId: req.user.id,
      username: req.user.username,
      text,
      imageUrl,
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFeed = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.user.id)) post.likes.push(req.user.id);
  else post.likes = post.likes.filter(id => id !== req.user.id);
  await post.save();
  res.json(post);
};

export const commentPost = async (req, res) => {
  const { text } = req.body;
  const post = await Post.findById(req.params.id);
  post.comments.push({ username: req.user.username, text });
  await post.save();
  res.json(post);
};
