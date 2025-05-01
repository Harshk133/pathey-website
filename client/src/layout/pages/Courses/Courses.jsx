// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   Grid,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useGetCoursesQuery } from "../../../features/apiSlice";

// const Course = ({ theme }) => {
//   const navigate = useNavigate();
//   const { data: courses, isLoading, isError, error } = useGetCoursesQuery();

//   if (isLoading) {
//     return (
//       <Box sx={{ padding: 4 }} style={{ backgroundColor: theme.palette.background.default }}>
//         <Typography variant="h4" gutterBottom align="center">
//           Loading Courses...
//         </Typography>
//       </Box>
//     );
//   }

//   if (isError) {
//     return (
//       <Box sx={{ padding: 4 }} style={{ backgroundColor: theme.palette.background.default }}>
//         <Typography variant="h4" gutterBottom align="center" color="error">
//           {error?.data?.message || "An unexpected error occurred."}
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{ padding: 4 }}
//       style={{
//         backgroundColor: theme.palette.background.default,
//         color: theme.palette.text.primary,
//       }}
//     >
//       <Typography variant="h4" gutterBottom align="center">
//         Available Courses
//       </Typography>
//       <Grid container spacing={4}>
//         {!isError ? courses.map((course) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={course._id}>
//             <Card
//               sx={{
//                 maxWidth: "100%",
//                 borderRadius: 2,
//                 boxShadow: 3,
//                 backgroundColor: theme.palette.background.default,
//                 color: theme.palette.text.primary,
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={course.image} // Use course.coverImage for the image URL
//                 alt={course.title}
//               />
//               <CardContent
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   height: "120px",
//                   overflow: "hidden",
//                 }}
//               >
//                 <Typography gutterBottom variant="h5" component="div" noWrap>
//                   {course.title.length > 100 ? course.title.substring(0, 100) + "..." : course.title}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{
//                     display: "-webkit-box",
//                     overflow: "hidden",
//                     WebkitBoxOrient: "vertical",
//                     WebkitLineClamp: 3,
//                     textOverflow: "ellipsis",
//                     marginBottom: 2,
//                   }}
//                   dangerouslySetInnerHTML={{ __html: course.description }}
//                 >
//                   {course.description}
//                 </Typography>
//               </CardContent>
//               <Button
//                 variant="contained"
//                 sx={{ margin: 2 }}
//                 onClick={() => navigate(`/course/${course._id}`, { state: course })}
//               >
//                 View Details
//               </Button>
//             </Card>
//           </Grid>
//         )) : <Typography variant="h6" gutterBottom align="center" color="error" style={{ width: "100%", margin: "17px" }}>
//           Something Went Wrong!!
//         </Typography>}
//       </Grid>
//     </Box>
//   );
// };

// export default Course;


import React from "react";
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
import { useGetCoursesQuery } from "../../../features/apiSlice";

const Course = ({ theme }) => {
  const navigate = useNavigate();
  const { data: courses, isLoading, isError, error } = useGetCoursesQuery();

  if (isLoading) {
    return (
      <Box sx={{ padding: 4 }} style={{ backgroundColor: theme.palette.background.default }}>
        <Typography variant="h4" gutterBottom align="center">
          Loading Courses...
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
        Available Courses
      </Typography>
      <Grid container spacing={4}>
        {!isError ? courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course._id}>
            <Card
              sx={{
                maxWidth: "100%",
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
                image={course.image} // Use course.coverImage for the image URL
                alt={course.title}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "120px",
                  overflow: "hidden",
                }}
              >
                <Typography gutterBottom variant="h5" component="div" noWrap>
                  {course.title.length > 100 ? course.title.substring(0, 100) + "..." : course.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    textOverflow: "ellipsis",
                    marginBottom: 2,
                  }}
                  dangerouslySetInnerHTML={{ __html: course.description }} // Only use this for raw HTML
                />
              </CardContent>
              <Button
                variant="contained"
                sx={{ margin: 2 }}
                onClick={() => navigate(`/course/${course._id}`, { state: course })}
              >
                View Details
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

export default Course;
