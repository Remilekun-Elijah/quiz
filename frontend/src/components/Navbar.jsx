import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Avatar } from "@mui/material";
import React from "react";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "purple",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={"/logo.png"}
            alt="brand"
            className="shadow"
            height={"130px"}
            width={"60px"}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
