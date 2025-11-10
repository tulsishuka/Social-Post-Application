import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

export default function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static" sx={{ background: "#868484ff" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Social Post Application</Typography>
          {loggedIn ? (
            <>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Signup onLogin={() => { setLoggedIn(true); navigate("/feed"); }} />} />
          <Route path="/signup" element={<Signup onLogin={() => { setLoggedIn(true); navigate("/feed"); }} />} />
          <Route path="/login" element={<Login onLogin={() => { setLoggedIn(true); navigate("/feed"); }} />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </Container>
    </>
  );
}
