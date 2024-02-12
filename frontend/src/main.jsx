import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./features/store";
import { ThemeProvider, createTheme } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));

// const theme = createTheme({
//   typography: {
//     fontFamily: [
//       "sofiaPro",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//   },
// });

root.render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}> */}
    <Provider {...{ store }}>
      <App />
    </Provider>
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
