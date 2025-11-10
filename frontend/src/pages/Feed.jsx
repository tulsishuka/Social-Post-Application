import React, { useEffect, useState } from "react";
import PostCard from "../component/PostCard";
import API from "../services/api";
import CreatePostBox from "./CreatePostBox";
import { Box,  Typography,  Dialog,  DialogTitle,  DialogContent,  DialogActions,  TextField,  Button,  Divider,  IconButton,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [commentOpen, setCommentOpen] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [commentText, setCommentText] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts/feed");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (id) => {
    try {
      await API.post(`/posts/like/${id}`);
      fetchPosts();
    } catch (err) { console.error(err); }
  };

  const openComments = (id) => {
    setActivePostId(id);
    setCommentOpen(true);
  };

  const handleCommentSubmit = async () => {
    if (!commentText) return;
    try {
      await API.post(`/posts/comment/${activePostId}`, { text: commentText });
      setCommentText("");
      setCommentOpen(false);
      fetchPosts();
    } catch (err) { console.error(err); }
  };

  return (

  <Box
      sx={{background: "linear-gradient(180deg, #d6d3d3ff, #ffffff)",minHeight: "100vh",py: 4,px: { xs: 2, sm: 5, md: 8 },transition: "0.3s",}}>
      <Box sx={{ textAlign: "center",borderRadius: "16px", color: "white",}}></Box>

 
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          p: 3,
          mb: 4,
        }}
      >
      
        <Divider sx={{ mb: 2 }} />
        <CreatePostBox onPosted={fetchPosts} />
      </Box>

      {/* Feed Section */}
       <Box>
        {posts.length === 0 ? (
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center", mt: 5, color: "#ffffffff" }}
          >
            No posts yet. Be the first to share something! 🌸
          </Typography>
        ) : (
          posts.map((p) => (
            <PostCard
              key={p._id}
              post={p}
              onLike={handleLike}
              onOpenComments={openComments}
            />
          ))
        )}
      </Box>

      {/* Comment Dialog */}
      <Dialog
        open={commentOpen}
        onClose={() => setCommentOpen(false)}
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "20px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            background:
              "linear-gradient(145deg, #ffffffff 0%, #efeaeaff 100%)",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontWeight: 600,
          }}
        >
          Add a Comment
          <IconButton onClick={() => setCommentOpen(false)} color="error">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            multiline
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your thoughts..."
            sx={{
              mt: 1,
              backgroundColor: "#fff",
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#9e9e9eff" },
                "&.Mui-focused fieldset": { borderColor: "#b0b0b0ff" },
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setCommentOpen(false)}
            variant="outlined"
            sx={{
              color: "#666",
              borderColor: "#ccc",
              textTransform: "none",
              "&:hover": { borderColor: "#666", color: "#666" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #666, #666)",
              textTransform: "none",
              borderRadius: "10px",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(45deg, #666, #666)",
              },
            }}
            onClick={handleCommentSubmit}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
