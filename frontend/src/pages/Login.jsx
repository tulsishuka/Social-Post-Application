import { useState } from "react";
import API from "../services/api";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      if (onLogin) onLogin();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{justifyContent: "center", alignItems: "center",p: 2,}}>
      <Card
        sx={{display: "flex",flexDirection: { xs: "column", md: "row", padding:3 },         width: "100%",maxWidth: 900,borderRadius: "20px",boxShadow: "0 8px 24px rgba(0,0,0,0.15)",overflow: "hidden",}}>
        <Box sx={{flex: 1,display: { xs: "none", md: "block" },backgroundImage: `url('https://wallpaperaccess.com/full/13756.jpg')`,backgroundSize: "cover",backgroundPosition: "center",}}/><CardContent
          sx={{
            flex: 1,
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "linear-gradient(180deg, #ffffff 0%, #f9fff9 100%)",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: "#606060ff",
                mb: 2,
                width: 56,
                height: 56,
                boxShadow: "0 4px 12px rgba(119, 119, 119, 0.3)",
              }}
            >
              <LockOpenIcon fontSize="medium" />
            </Avatar>

            <Typography
              variant="h5"
              sx={{
                mb: 1,
                fontWeight: 700,
                color: "#333",
                letterSpacing: 0.5,
              }}
            >
              Login Your Account
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
              <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.3,
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                  background: "linear-gradient(45deg, #979797ff, #898989ff)",
                  boxShadow: "0 4px 12px rgba(128, 128, 128, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #686868ff, #616161ff)",
                  },
                }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Typography variant="body2" align="center" sx={{ mt: 3, color: "#555" }}>
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: "#1e1e1eff",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Sign Up
                </Link>
              </Typography>

              <Typography
                variant="caption"
                display="block"
                align="center"
                sx={{ mt: 2, color: "text.secondary" }}
              >
                Demo Login: <strong>user@example.com</strong> /{" "}
                <strong>012345</strong>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
