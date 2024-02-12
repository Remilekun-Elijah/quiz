import config from "../utils/config";
import Dashboard from "./Dashboard";
import Question from "./Questions";
import Login from "./Login";
import Category from "./Category";
import React from "react";

const { routes } = config;
const Pages = [
  {
    path: routes.dashboard,
    element: <Dashboard />,
  },
  {
    path: routes.questions,
    element: <Question />,
  },
  {
    path: routes.categories,
    element: <Category />,
  },
];

export default Pages;
