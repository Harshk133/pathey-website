// import React, { useState, Suspense } from "react";
// import "./App.css";
// import { createTheme, ThemeProvider } from "@mui/material";
// import Header from "./layout/common/Header";
// import Footer from "./layout/common/Footer";
// import {
//   createBrowserRouter,
//   Navigate,
//   RouterProvider,
// } from "react-router-dom";
// import Main from "./layout/common/Main";
// import Blog from "./layout/pages/Blogs/Blog";
// import Appointment from "./layout/pages/Appointment/Appointment";
// import BlogPage from "./layout/pages/Blogs/BlogPage";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; 
// import GoogleLogin from "./components/GoogleLogin";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import RefreshHandler from "./components/RefreshHandler";

// function App() {
//   const [mode, setMode] = useState("dark"); // initial mode is light
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const theme = createTheme({
//     palette: {
//       mode: mode,
//       text: {
//         primary: mode === "light" ? "#333" : "#fff",
//         secondary: mode === "light" ? "#666" : "#ccc",
//       },
//     },
//   });

//   const intensity = mode === "dark" ? 1 : 0; // adjust intensity based on theme mode

//   const handleModeChange = () => {
//     setMode(mode === "light" ? "dark" : "light");
//   };

//   const GoogleAuthWrapper = () => {
//     return (
//       <GoogleOAuthProvider clientId="953177745574-fhm6ldcot9sjs1au5sa7544i2c43abfb.apps.googleusercontent.com">
//         <GoogleLogin />
//       </GoogleOAuthProvider>
//     );
//   };

//   const PrivateRoutes = ({ children }) => {
//     return isAuthenticated ? children : <Navigate to="/" />;
//   };

//   // setting up the routings here...
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <>
//           <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
//           <GoogleAuthWrapper />
//         </>
//       ),
//     },
//     {
//       path: "/home",
//       element: (
//         <>
//           <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
//           <PrivateRoutes>
//             <Header mode={mode} onModeChange={handleModeChange} />
//             <Main intensity={intensity} theme={theme} />
//             <Footer theme={theme} />
//           </PrivateRoutes>
//         </>
//       ),
//     },
//     {
//       path: "/blog",
//       element: (
//         <>
//           <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
//           <PrivateRoutes>
//             <Header mode={mode} onModeChange={handleModeChange} />
//             <Blog theme={theme} />
//             <Footer theme={theme} />
//           </PrivateRoutes>
//         </>
//       ),
//     },
//     {
//       path: "/blog/:id",
//       element: (
//         <>
//           <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
//           <PrivateRoutes>
//             <Header mode={mode} onModeChange={handleModeChange} />
//             <BlogPage theme={theme} />
//             <Footer theme={theme} />
//           </PrivateRoutes>
//         </>
//       ),
//     },
//     {
//       path: "/appointment",
//       element: (
//         <>
//           <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
//           <PrivateRoutes>
//             <Header mode={mode} onModeChange={handleModeChange} />
//             <Appointment theme={theme} />
//             <Footer theme={theme} />
//           </PrivateRoutes>
//         </>
//       ),
//     },
//   ]);

//   return (
//     <>
//       <ToastContainer />
//       <ThemeProvider theme={theme}>
//         {/* <Header mode={mode} onModeChange={handleModeChange}  /> */}

//         <RouterProvider router={router} />

//         {/* <PlayLists theme={theme} /> */}

//         {/* <Footer theme={theme} /> */}
//       </ThemeProvider>
//     </>
//   );
// }

// export default App;






import React, { useState, Suspense } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleLogin from "./components/GoogleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import RefreshHandler from "./components/RefreshHandler";

// Importing Page Components
import Main from "./layout/common/Main";
import Blog from "./layout/pages/Blogs/Blog";
import Appointment from "./layout/pages/Appointment/Appointment";
import BlogPage from "./layout/pages/Blogs/BlogPage";

// Importing Layout Components
import Header from "./layout/common/Header";
import Footer from "./layout/common/Footer";

// Private Route Wrapper Component
const PrivateRoutes = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

// Layout Component - Common Header, Footer, and Content
const Layout = ({ children, mode, onModeChange, theme }) => {
  return (
    <>
      <Header mode={mode} onModeChange={onModeChange} />
      <main>{children}</main>
      <Footer theme={theme} />
    </>
  );
};

function App() {
  const [mode, setMode] = useState("light"); // initial mode is light
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const theme = createTheme({
    palette: {
      mode: mode,
      text: {
        primary: mode === "light" ? "#333" : "#fff",
        secondary: mode === "light" ? "#666" : "#ccc",
      },
    },
  });

  const intensity = mode === "dark" ? 1 : 0; // adjust intensity based on theme mode

  const handleModeChange = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_CLIENT_ID}>
        <GoogleLogin />
      </GoogleOAuthProvider>
    );
  };

  // Setting up the routing
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
          <GoogleAuthWrapper />
        </>
      ),
    },
    {
      path: "/home",
      element: (
        <>
          <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
          <PrivateRoutes isAuthenticated={isAuthenticated}>
            <Layout mode={mode} onModeChange={handleModeChange} theme={theme}>
              <Main intensity={intensity} theme={theme} />
            </Layout>
          </PrivateRoutes>
        </>
      ),
    },
    {
      path: "/blog",
      element: (
        <>
          <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
          <PrivateRoutes isAuthenticated={isAuthenticated}>
            <Layout mode={mode} onModeChange={handleModeChange} theme={theme}>
              <Blog theme={theme} />
            </Layout>
          </PrivateRoutes>
        </>
      ),
    },
    {
      path: "/blog/:id",
      element: (
        <>
          <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
          <PrivateRoutes isAuthenticated={isAuthenticated}>
            <Layout mode={mode} onModeChange={handleModeChange} theme={theme}>
              <BlogPage theme={theme} />
            </Layout>
          </PrivateRoutes>
        </>
      ),
    },
    {
      path: "/appointment",
      element: (
        <>
          <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
          <PrivateRoutes isAuthenticated={isAuthenticated}>
            <Layout mode={mode} onModeChange={handleModeChange} theme={theme}>
              <Appointment theme={theme} />
            </Layout>
          </PrivateRoutes>
        </>
      ),
    },
  ]);

  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;


