import React, { useState } from "react";
import API from "../services/api";
import { Box, Button, Container, TextField, Typography, Card, CardContent, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function Signup({ onLogin }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      if (onLogin) onLogin();
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
   
    <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  }}
>
  <Card
    sx={{
      width: "100%",
      maxWidth: 420,
      borderRadius: 4,
      backgroundColor: "white",
    }}
  >
    <CardContent sx={{ p: 5 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
   

        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: "#646464ff",
            letterSpacing: "0.5px",
          }}
        >
          Create Your Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit}
         sx={{ width: "100%" }}>
          <TextField label="Username"name="username"
          value={form.username}
          onChange={handleChange} 
           fullWidth 
          margin="normal"     
                requiredvariant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="email"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="password"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

        
          <Button
  type="submit"
  variant="contained"
  fullWidth
  disabled={loading}
  sx={{
    mt: 3,
    py: 1.3,
    fontWeight: 600,
    borderRadius: 3,
    textTransform: "none",
    backgroundColor: "#9e9e9e", 
    color: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    "&:hover": {
      backgroundColor: "#7d7d7d",
    },
    "&.Mui-disabled": {
      backgroundColor: "#cfcfcf",
      color: "#ffffff",
    },
  }}
>
  {loading ? "Creating..." : "Sign Up"}
</Button>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#6c6c6cff", fontWeight: 600, textDecoration: "none" }}>
              Login</Link>
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
</Box>
  );
}
