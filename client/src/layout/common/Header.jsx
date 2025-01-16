import React, { useState } from "react";
import {
  DarkMode,
  LightMode,
  Menu,
  Instagram,
  LinkedIn,
  Email,
  WhatsApp,
  AccountCircle,
  Close,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Menu as MuiMenu,
  MenuItem,
  Switch,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ mode, onModeChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Function to handle navigation and close the drawer in mobile
  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false); // Close the drawer when a menu item is clicked
  };

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        {/* Hamburger Menu for Mobile */}
        {isMobile && (
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <Menu />
          </IconButton>
        )}

        {/* Brand Logo */}
        <img
          src={import.meta.env.VITE_APP_LOGO}
          alt="Brand Logo"
          style={{
            width: "50px",
            height: "50px",
            margin: "0 10px",
          }}
        />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {import.meta.env.VITE_APP_NAME}
        </Typography>

        {/* Second Toolbar for Navigation Links */}
        {!isMobile && (
          <Toolbar
            sx={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/blog")}>
              Blog
            </Button>
            <Button color="inherit" onClick={() => navigate("/appointment")}>
              Appointments
            </Button>
            <Button
              color="inherit"
              href="https://patheycareer.edumilestones.com/"
              target="_blank"
            >
              For Aptitude Testing
            </Button>
          </Toolbar>
        )}

        {/* Drawer for Mobile Menu */}
        {isMobile && (
          <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
            <List>
              <ListItem>
                <IconButton onClick={handleDrawerToggle}>
                  <Close />
                </IconButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton onClick={() => handleNavigation("/")}>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleNavigation("/blog")}>
                  <ListItemText primary="Blog" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => handleNavigation("/appointment")}
                >
                  <ListItemText primary="Appointments" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  component="a"
                  href="https://patheycareer.edumilestones.com/"
                  target="_blank"
                >
                  <ListItemText primary="Testing & Counselling" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    localStorage.removeItem("user-info");
                    navigate("/");
                  }}
                >
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
        )}

        {/* Social Media Icons for Desktop */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link
              to={import.meta.env.VITE_APP_EMAIL_LINK}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <IconButton>
                <Email fontSize="large" sx={{ color: "#ffd890" }} />
              </IconButton>
            </Link>
            <Link
              to={import.meta.env.VITE_APP_INSTAGRAM_LINK}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <IconButton>
                <Instagram sx={{ color: "#e90b7a" }} fontSize="large" />
              </IconButton>
            </Link>
            <Link
              to={import.meta.env.VITE_APP_WHATSAPP_CHANNEL_LINK}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <IconButton>
                <WhatsApp sx={{ color: "#25D366" }} fontSize="large" />
              </IconButton>
            </Link>
          </div>
        )}

        {/* Theme Toggle and Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Switch
            checked={mode === "dark"}
            onChange={() => onModeChange(mode === "light" ? "dark" : "light")}
            color="primary"
          />
          <IconButton onClick={handleMenuClick}>
            <Avatar>
              {(() => {
                const userInfo = JSON.parse(localStorage.getItem("user-info"));
                const userImage = userInfo?.image;
                // Check if the userImage exists and is not an empty string
                if (userImage && userImage.trim() !== "") {
                  return <img src={userImage} alt="user profile picture" />;
                } else {
                  return <AccountCircle />;
                }
              })()}
            </Avatar>

            {/* <img src={JSON.parse(localStorage.getItem("user-info")).image} alt="" /> */}
          </IconButton>
          <MuiMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {/* <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem> */}
            <MenuItem
              onClick={() => {
                localStorage.removeItem("user-info");
                navigate("/");
              }}
            >
              Logout
            </MenuItem>
          </MuiMenu>
        </div>
      </Toolbar>

      {/* Drawer for Mobile Menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem>
            <IconButton onClick={handleDrawerToggle}>
              <Close />
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton onClick={() => handleNavigation("/")}>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => handleNavigation("/blog")}>
              <ListItemText primary="Blog" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => handleNavigation("/appointment")}>
              <ListItemText primary="Book An Appointment" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              component="a"
              href="https://patheycareer.edumilestones.com/"
              target="_blank"
            >
              <ListItemText primary="Aptitude Testing & Counselling" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <Typography variant="subtitle1" sx={{ margin: "10px" }}>
            Follow Us
          </Typography>
          <ListItem>
            <IconButton
              component="a"
              href={import.meta.env.VITE_APP_EMAIL_LINK}
              target="_blank"
            >
              <Email />
            </IconButton>
            <IconButton
              component="a"
              href={import.meta.env.VITE_APP_INSTAGRAM_LINK}
              target="_blank"
            >
              <Instagram sx={{ color: "#e90b7a" }} />
            </IconButton>
            <IconButton
              component="a"
              href={import.meta.env.VITE_APP_WHATSAPP_CHANNEL_LINK}
              target="_blank"
            >
              <WhatsApp sx={{ color: "#25D366" }} />
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
