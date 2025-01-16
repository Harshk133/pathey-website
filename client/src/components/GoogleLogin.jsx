import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';

const GoogleLogin = () => {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        const { email, name, image } = result.data.user;
        const token = result.data.token;
        const obj = {
          email, name, image, token
        };
        localStorage.setItem("user-info", JSON.stringify(obj));
        navigate("/home");
      }
    } catch (error) {
      console.error("Error while requesting google oauth: ", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
    // redirectUri: "https://server-patheya.onrender.com/home"
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        flexDirection: "column",
        gap: "20px",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login to Patheya 
      </Typography>
      <Button
        onClick={googleLogin}
        variant="contained"
        sx={{
          backgroundColor: "#4285F4", // Google blue color
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          "&:hover": {
            backgroundColor: "#357ae8",
          },
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <GoogleIcon />
        Login with Google
      </Button>
    </Box>
  );
};

export default GoogleLogin;
