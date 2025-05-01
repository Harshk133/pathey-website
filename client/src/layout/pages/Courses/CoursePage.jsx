// import React from "react";
// import { useLocation } from "react-router-dom";
// import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

// const CoursePage = ({ theme }) => {
//   const location = useLocation();
//   const course = location.state; // Access course details passed through state

//   if (!course) {
//     return <Typography variant="h5">Course not found!</Typography>;
//   }

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "auto",
//         backgroundColor: theme.palette.background.default,
//         color: theme.palette.text.primary,
//         display: "flex",
//         justifyContent: "center",
//         padding: "16px",
//       }}
//     >
//       <Card
//         sx={{
//           width: "100%",
//           maxWidth: "800px",
//           margin: "auto",
//           boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//           borderRadius: "8px",
//         }}
//       >
//         <CardMedia
//           component="img"
//           height="250"
//           width="100%"
//           image={course.image} // Use course image
//           alt={course.title}
//         />
//         <CardContent>
//           <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: "1.8rem", sm: "2.4rem" } }}>
//             {course.title}
//           </Typography>
//           <Typography
//             variant="body1"
//             paragraph
//             sx={{
//               fontSize: { xs: "1rem", sm: "1.1rem" },
//               lineHeight: 1.6,
//               whiteSpace: "pre-line",
//             }}
//             dangerouslySetInnerHTML={{ __html: course.description }}
//           >
//             {course.description}
//           </Typography>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default CoursePage;


import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

const BlogPage = ({ theme }) => {
  const location = useLocation();
  const blog = location.state; // This contains blog.title, blog.description, blog.coverImage, etc.

  if (!blog) {
    return <Typography variant="h5">Blog not found!</Typography>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: "flex",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "800px",
          margin: "auto",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={blog.image}
          alt={blog.title}
        />
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontSize: { xs: "1.8rem", sm: "2.4rem" } }}
          >
            {blog.title}
          </Typography>

          {/* ✅ Only use dangerouslySetInnerHTML */}
          <Box
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              lineHeight: 1.6,
            }}
            dangerouslySetInnerHTML={{ __html: blog.description }} // Use only this to inject HTML content
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default BlogPage;
