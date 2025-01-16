import { Container, Typography } from "@mui/material";
import React from "react";

const About = ({ theme }) => {
  return (
    <>
      <Container
        maxWidth={false} // Prevents any predefined width constraints
        disableGutters // Removes default padding
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stacks on mobile, aligns side-by-side on larger screens
          gap: "22px",
          padding: "0 37px",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <div className="content-holder" style={{ padding: "0 27px" }}>
          <Typography variant="h3">About</Typography>
          <Typography variant="body1">
            <p>
                The aim is to work in the education sector for bringing social
              change. For this purpose, focusing on multiple dimensions of
              education is necessary. Through Pathey Educational Consultancy we are focusing on domains like Professional Development of Teachers,
              School Leadership Development, Student Learning Outcomes, as well
              as student's appropriate career choices. 
            </p>
          </Typography>
        </div>
        {/* Image Section */}
        {/* <center> */}
        <div className="image-holder" style={{ flex: 1 }}>
          <img
            src="patheya tai.jpg"
            alt="Image"
            style={{
              width: "100%", // Ensures the image takes full width of its container
              maxWidth: "250px", // Limits the image width for large screens
              height: "auto", // Keeps the aspect ratio of the image intact
              objectFit: "cover", // Ensures the image covers the available space without distortion
              borderRadius: "8px", // Optional: Adds rounded corners to the image
            }}
          />
        </div>
        {/* </center> */}
      </Container>
    </>
  );
};

export default About;
