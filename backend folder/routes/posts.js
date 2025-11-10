import express from "express";
import multer from "multer";
import path from "path";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// multer setup to write files into /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// CREATE POST (auth)
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { text } = req.body;
    const imageUrl = req.file ? req.file.filename : null;

    const user = await User.findById(req.user.id).select("username");
    if (!user) return res.status(400).json({ msg: "User not found" });

    const post = new Post({
      user: user._id,
      username: user.username,
      text,
      imageUrl
    });
    await post.save();

    const newPost = await Post.findById(post._id).populate("user", "username");
    res.json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// FEED
router.get("/feed", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// LIKE / UNLIKE
router.post("/like/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const exists = post.likes.find(uid => uid.toString() === req.user.id);
    if (exists) {
      post.likes = post.likes.filter(uid => uid.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// COMMENT
router.post("/comment/:id", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ msg: "Comment text required" });

    const user = await User.findById(req.user.id).select("username");
    if (!user) return res.status(400).json({ msg: "User not found" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    post.comments.push({ user: user._id, username: user.username, text });
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
