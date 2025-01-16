import { IconButton, Typography } from "@mui/material";
import { Email, Instagram, LinkedIn, WhatsApp } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ theme }) => {
  return (
    <div
      style={{
        maxWidth: "100vw",
        margin: 0,
        padding: "10px 0",
        width: "100%",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <b>{import.meta.env.VITE_APP_NAME}</b> &copy; {new Date().getFullYear()} Copyright. All Rights
        Reserved.
      </Typography>

      {/* Contact and Social Media */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <div
          className="email-holder"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <IconButton 
          component="a"
          href={import.meta.env.VITE_APP_EMAIL_LINK}
          target="_blank"
          >
            <Email fontSize="small" sx={{ color: "#ffd890" }} />
          </IconButton>
          <p style={{ margin: 0 }}>patheycareers@gmail.com</p>
        </div>

        <div
          className="whatsapp-number-holder"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <IconButton
          component="a"
          href={import.meta.env.VITE_APP_WHATSAPP_CHANNEL_LINK}
          target="_blank"
          >
            <WhatsApp fontSize="small" sx={{ color: "green" }} />
          </IconButton>
          <p style={{ margin: 0 }}>95796 86602</p>
        </div>

        <div
          className="social-icons"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Link
            to="https://instagram.com/"
            target="_blank"
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
            }}
          >
            <IconButton
            component="a"
            href={import.meta.env.VITE_APP_INSTAGRAM_LINK}
            target="_blank"
            >
              <Instagram sx={{ color: "#e90b7a" }} fontSize="small" />
            </IconButton>
          </Link>
          {/* <Link
            to="https://linkedin.com/"
            target="_blank"
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
            }}
          >
            <IconButton>
              <LinkedIn color="primary" fontSize="small" />
            </IconButton>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
