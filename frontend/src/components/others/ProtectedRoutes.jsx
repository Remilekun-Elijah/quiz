import { Outlet, useNavigate } from "react-router-dom";
import Storage from "../../utils/storage";
import config from "../../utils/config";
import { useEffect } from "react";
import React from "react";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const nav = Storage.get(config.authProps[0]);
  useEffect(() => {
    if (nav === null) navigate("/");
  }, []);
  return <>{nav && <Outlet />}</>;
}
