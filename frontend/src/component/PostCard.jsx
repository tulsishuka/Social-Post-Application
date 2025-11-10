
import React, { useState } from "react";
import { Card, CardContent, Typography, Box, IconButton, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";

export default function PostCard({ post, onLike, onOpenComments, currentUserId }) {
  const [liked, setLiked] = useState(post.likes?.includes(currentUserId));
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);

  const handleLikeClick = async () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    onLike(post._id); // backend call from parent
  };

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 3,
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease",
        "&:hover": { transform: "scale(1.01)" },
      }}
    >
      <CardContent>
        {/* Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
              {post.username?.[0]?.toUpperCase() || "U"}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                {post.username ?? "Unknown"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(post.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Post Content */}
        {post.text && (
          <Typography sx={{ mt: 1.5, mb: 1.5, fontSize: "0.95rem" }}>{post.text}</Typography>
        )}
        {post.imageUrl && (
          <Box sx={{ mt: 1, mb: 1 }}>
            <img
              src={`https://social-post-application-backend.onrender.com/uploads/${post.imageUrl}`}
              alt="post"
              style={{ width: "100%", borderRadius: 10 }}
            />
          </Box>
        )}

        {/* Actions */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={1.5}>
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleLikeClick}>
              {liked ? (
                <FavoriteIcon
                  sx={{
                    color: "red",
                    transition: "transform 0.2s ease",
                    transform: liked ? "scale(1.2)" : "scale(1)",
                  }}
                />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <Typography component="span" variant="body2" sx={{ mr: 2 }}>
              {likeCount}
            </Typography>

            <IconButton onClick={() => onOpenComments(post._id)}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography component="span" variant="body2">
              {post.comments?.length ?? 0}
            </Typography>
          </Box>

          <IconButton>
            <ShareIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
