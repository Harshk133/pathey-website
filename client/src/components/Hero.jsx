import React, { Suspense, useState, useEffect } from "react";
import HoverCard from "./HoverCard";
import { IconButton, CircularProgress } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import "../Slider.css";
import { useGetCardsQuery } from "../features/apiSlice";

const Hero = ({ intensity, theme }) => {
  // const [cardData, setCardData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [loading, setLoading] = useState(true);

  const { data: cardData, isLoading: loading } = useGetCardsQuery();

  // useEffect(() => {
  //   const fetchCardData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/cards/");
  //       setCardData(response.data); // Assuming the API returns an array of cards
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching card data:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchCardData();
  // }, []);

  const handlePrev = () => {
    if (!cardData || cardData.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cardData.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    if (!cardData || cardData.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === cardData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <Suspense fallback={<center>Loading...</center>}>
        <div
          style={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            display: "flex",
            flexDirection: "column", // Stacks on mobile
            alignItems: "center",
            justifyContent: "center",
            height: "100vh", // Take full viewport height
            maxWidth: "100%",
            width: "100%",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          {/* Text Section */}
          <div
            style={{
              flex: "1",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)", // Responsive font size
                fontWeight: "bolder",
                letterSpacing: "0.1px",
                margin: 0,
                width: "100%",
                textAlign: "center",
              }}
            >
              {/* {import.meta.env.VITE_APP_MAIN_HEADING} */}
              <b style={{ color: "#0147a1" }}>पाथेय</b>&nbsp;<span style={{ color: "#da2d79" }}>Educational Consultancy</span>
            </p>
          </div>

          {/* Slider Section */}
          <div
            style={{
              flex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              position: "relative", // For positioning prev/next buttons
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : cardData.length > 0 ? (
              <div className="slider-container" style={{ width: "100%" }}>
                {cardData.length > 1 && (
                  <IconButton
                    onClick={handlePrev}
                    className="slider-button"
                    sx={{
                      position: "absolute",
                      left: "10px",
                      zIndex: 1, // Ensure it is above other elements
                      display: { xs: "block", sm: "block" }, // Ensure it appears on all screen sizes
                    }}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                )}

                <div className="slider-content" style={{ width: "100%" }}>
                  <HoverCard
                    imageUrl={cardData[currentIndex].imageUrl}
                    title={cardData[currentIndex].title}
                    description={cardData[currentIndex].description}
                    linkUrl={cardData[currentIndex].linkUrl}
                  />
                </div>

                {cardData.length > 1 && (
                  <IconButton
                    onClick={handleNext}
                    className="slider-button"
                    sx={{
                      position: "absolute",
                      right: "10px",
                      zIndex: 1, // Ensure it is above other elements
                      display: { xs: "block", sm: "block" }, // Ensure it appears on all screen sizes
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                )}
              </div>
            ) : (
              <HoverCard
                imageUrl={import.meta.env.VITE_APP_LOGO}
                title={import.meta.env.VITE_APP_NAME} 
                description={import.meta.env.VITE_APP_MAIN_HEADING}
                linkUrl={"https://patheycareer.edumilestones.com/"}
              />
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Hero;
