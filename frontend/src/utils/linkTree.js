/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import config from "./config.js";
import EventNoteIcon from "@mui/icons-material/EventNote";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";

const { routes } = config;

const links = [
  {
    authorizedUsers: ["all"],
    name: "Dashboard",
    url: routes.dashboard,
    icon: DashboardIcon,
  },

  {
    authorizedUsers: ["all"],
    name: "Questions",
    url: routes.questions,
    icon: EventNoteIcon,
  },

  {
    authorizedUsers: ["all"],
    name: "Categories",
    url: routes.categories,
    icon: GroupIcon,
  },
];

export default links;
