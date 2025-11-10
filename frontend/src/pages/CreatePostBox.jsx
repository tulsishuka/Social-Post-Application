import React, { useState } from "react";
import { Card, CardContent, TextField, Box, Button, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import API from "../services/api";

export default function CreatePostBox({ onPosted }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!text && !image) return alert("Enter text or choose an image");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("text", text);
      if (image) fd.append("image", image);
      await API.post("/posts", fd, { headers: { "Content-Type": "multipart/form-data" }});
      setText(""); setImage(null);
      if (onPosted) onPosted();
    } catch (err) {
      console.error(err);
      alert("Could not create post");
    } finally {
      setLoading(false);
    }
  };

  return (
 
     <Card sx={{ mb: 3, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", background: "linear-gradient(145deg, #e1dcdcff, #ffffffff)",p: 2,}}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}><Typography variant="h6" sx={{ fontWeight: 600, color: "#333" }}>Create Post</Typography></Box>

        <TextField fullWidth multiline rows={3} placeholder="What's on your mind?" value={text} onChange={(e) => setText(e.target.value)} variant="outlined"
          sx={{ backgroundColor: "#e1dcdcff", borderRadius: "10px", "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#d8cfcfff" },
              "&:hover fieldset": { borderColor: "#808080ff" },
              "&.Mui-focused fieldset": { borderColor: "#696969ff" },
            },
          }}
        />

        <Box display="flex" alignItems="center" justifyContent="space-between" mt={2} >
          <Button component="label" variant="outlined"sx={{  color: "#8b8b8bff", textTransform: "none", borderRadius: "10px", px: 2, "&:hover": { 
       background: "linear-gradient(45deg, #c5c5c5ff, #cccccdff)",
},}}startIcon={<AddPhotoAlternateIcon />}>Photo
            <input type="file" accept="image/*" hidden onChange={(e) => setImage(e.target.files[0])}/></Button>

          <Button variant="contained" sx={{ background: "linear-gradient(45deg, #c5c5c5ff, #cccccdff)",color: "#fff", textTransform: "none", px: 3,py: 1, borderRadius: "10px",fontWeight: 600,boxShadow: "0 3px 8px rgba(55,202,45,0.3)",}}onClick={handlePost} disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
