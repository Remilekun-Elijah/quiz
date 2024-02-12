import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Pages from "./pages/Index";
import { Button } from "@mui/material";
import ProtectedRoutes from "./components/others/ProtectedRoutes";
import Login from "./pages/Login";
import config from "./utils/config";

function App() {
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
          <Route path={config.routes.home} element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            {Pages.map((p, i) => (
              <Route key={i} {...p} />
            ))}
          </Route>
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
