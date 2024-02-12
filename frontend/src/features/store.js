import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import dashboard from "./dashboardSlice";
import question from "./questionSlice";
import category from "./categorySlice";

export const store = configureStore({
  reducer: {
    user,
    dashboard,
    question,
    category,
  },
});
