import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

const BlogPage = ({ theme }) => {
  const location = useLocation();
  const blog = location.state; // Access blog details passed through state
  if (!blog) {
    return <Typography variant="h5">Blog not found!</Typography>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto", // Set height to auto for better handling of varying content lengths
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: "flex",
        justifyContent: "center", // Center content horizontally
        padding: "16px",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "800px", // Restrict maximum width for readability on large screens
          margin: "auto", // Center card horizontally
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <CardMedia
          component="img"
          height="250"
          width="100%"
          image={blog.coverImage}
          alt={blog.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: "1.8rem", sm: "2.4rem" } }}>
            {blog.title}
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" }, // Smaller font size on small screens
              lineHeight: 1.6, // Improve line spacing for readability
              whiteSpace: "pre-line", // Respect new lines in blog content
            }}
          >
            {blog.content}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BlogPage;
