import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { useGetBlogsQuery } from "../../../features/apiSlice";

const Blog = ({ theme }) => {
  // const [blogs, setBlogs] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { data: blogs, isLoading, isError, error } = useGetBlogsQuery();
  

  useEffect(() => {
    // Fetch the blogs data from the backend
    // const fetchBlogs = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:5000/api/blogs/");
    //     setBlogs(response.data);
    //     setLoading(false);
    //   } catch (err) {
    //     setError("Error fetching blogs");
    //     setLoading(false);
    //     alert("Error fetching blogs");
    //   }
    // };

    // fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ padding: 4 }} style={{ backgroundColor: theme.palette.background.default }}>
        <Typography variant="h4" gutterBottom align="center">
          Loading Blogs...
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ padding: 4 }} style={{ backgroundColor: theme.palette.background.default }}>
        <Typography variant="h4" gutterBottom align="center" color="error">
        {error?.data?.message || "An unexpected error occurred."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{ padding: 4 }}
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Educational Blogs
      </Typography>
      <Grid container spacing={4}>
        {!isError ? blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={blog._id}>
            <Card
              sx={{
                maxWidth: "100%", // Ensure full width
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={blog.coverImage} // Use blog.coverImage for the image URL
                alt={blog.title}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "120px", // Fixed height to keep all cards consistent
                  overflow: "hidden", // Prevent content overflow
                }}
              >
                <Typography gutterBottom variant="h5" component="div" noWrap>
                  {blog.title.length > 100 ? blog.title.substring(0, 100) + "..." : blog.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3, // Truncate the description after 3 lines
                    textOverflow: "ellipsis",
                    marginBottom: 2, // Spacing between description and button
                  }}
                >
                  {blog.description}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                sx={{ margin: 2 }}
                onClick={() => navigate(`/blog/${blog._id}`, { state: blog })}
              >
                Read More
              </Button>
            </Card>
          </Grid>
        )) : <Typography variant="h6" gutterBottom align="center" color="error" style={{ width: "100%", margin: "17px" }}>
          Something Went Wrong!!
        </Typography>}
      </Grid>
    </Box>
  );
};

export default Blog;
