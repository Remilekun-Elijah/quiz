import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Pages from "./pages/Index";
import config from "./utils/config";
// import ProtectedRoutes from "./components/others/ProtectedRoutes";
// import Home from "./pages/Home";
// import StylishMouseMovent from "./components/others/StylishMouseMovement";
import { Button } from "@mui/material";
// import Dashboard from "./pages/Dashboard";
// import GiftList from "./pages/GiftList";

function App() {
  const { routes } = config;

  function ScrollToTop() {
    const { pathname } = useLocation();

    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <BrowserRouter>
      <div className="">
        <Routes>
          {/* {config.appUser === "user" && (
            <>
              <Route
                {...{
                  path: routes.home,
                  element: <Home />,
                }}
              />
            </>
          )} */}
          {config.appUser === "admin" && (
            <>
              {Pages.map((p, i) => (
                <Route key={i} {...p} />
              ))}
            </>
          )}

          <Route
            path="*"
            element={
              <div className="flex flex-col items-center mt-20">
                <img
                  src="/404.svg"
                  style={{ width: "300px", height: "250px" }}
                  alt="Not found"
                />
                <h1 className="text-2xl">PAGE NOT FOUND</h1>
                <Button
                  wrapperClass={"mt-10"}
                  width={"260px"}
                  value={"Go Back Home"}
                  onClick={() => (window.location.href = "/")}
                />
              </div>
            }
          />
        </Routes>
        <ScrollToTop />
      </div>
    </BrowserRouter>
  );
}

export default App;
