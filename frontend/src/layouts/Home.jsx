/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import links from "../utils/linkTree";
import SidebarItems from "../components/Sidebars/SidebarItems";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../features/userSlice";
import Confirmation from "../components/Modals/Confirmation";

const drawerWidth = 340;

export default function HomeSidebar(props) {
  const { window, children, showNavigation = false } = props;
  const [phoneNumberOpen, setMobileOpen] = React.useState(false),
    [logouts, setLogout] = React.useState(false);
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    handleLogout = () => {
      dispatch(logout());
      navigate("/");
    },
    handleDrawerToggle = () => {
      setMobileOpen(!phoneNumberOpen);
    };

  const drawer = (
    <div>
      <Toolbar>
        <div className="flex items-center mt-3">
          <img
            src={"/logo.png"}
            alt="brand"
            className="shadow"
            height={"130px"}
            width={"60px"}
          />
        </div>
      </Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      ></IconButton>
      <div className="sm:mt-20 pl-7"></div>
      <List>
        {links.map((link, index) => {
          return <SidebarItems {...{ link }} key={index} />;
        })}
      </List>

      <ListItem sx={{ mt: "4em", position: "absolute", bottom: "2em" }}>
        <ListItemButton onClick={() => setLogout(true)}>
          <ListItemIcon>
            <LogoutIcon style={{ color: "white" }} width={"22px"} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={<Typography style={{ color: "white" }}>Logout</Typography>}
          />
        </ListItemButton>
      </ListItem>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        className="shadow-sm"
        position="fixed"
        sx={{
          background: "#fff",
          color: "#000",
          boxShadow: "none",
          py: ".5em",
          zIndex: 20,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {showNavigation && (
            <Box className="text-[#201600] flex">
              <span
                className="flex cursor-pointer items-center"
                onClick={() => navigate(-1)}
              >
                <ArrowBackIosNewIcon
                  color="#201600"
                  className="mx-2"
                  fontSize="small"
                />
                <Typography className="text-[#201600] text-[16px] ">
                  Back
                </Typography>
              </span>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
          "& .MuiDrawer-paper": {
            width: { md: drawerWidth },
            boxSizing: "border-box",
            backgroundColor: "var(--c-primary-0)",
            borderRight: "0px",
          },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={phoneNumberOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on phoneNumber.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "var(--c-primary-0)",
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        className="bg-[#fff]"
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
      <Confirmation
        {...{
          title: "LOG OUT",
          subtitle: "Are you sure you want to logout?",
          open: logouts,
          close: () => setLogout(false),
          handleConfirm: handleLogout,
        }}
      />
    </Box>
  );
}
