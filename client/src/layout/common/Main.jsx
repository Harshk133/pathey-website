import React from "react";
import Hero from "../../components/Hero";
import Blog from "../pages/Blogs/Blog";
import About from "../../components/About";
import ContactForm from "./ContactForm";

const Main = ({ theme, intensity }) => {
  return (
    <>
      {/* <Hero intensity={intensity} theme={theme} /> */}
      <center>
      <img src="latestLogo-removebg-preview.png" alt="Brand Logo" style={{width: "70%", height: "70%", margin: "0 auto"}} />
      </center>

      <About theme={theme} />

      {/* <PlayLists theme={theme} /> */}
      <Blog theme={theme} />

      <ContactForm theme={theme} />
    </>
  );
};

export default Main;
