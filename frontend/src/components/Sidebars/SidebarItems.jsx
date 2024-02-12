/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getRole } from "../../utils/helper";

const SidebarItems = ({ link }) => {
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false),
    dropdownActive = link?.dropdown?.find(({ url }) =>
      url === pathname ? true : pathname.indexOf(url) > -1 ? true : false
    ),
    activeLink = pathname === link.url;

  React.useEffect(() => {
    setOpen(dropdownActive ? true : false);
  }, []);
  return (
    <>
      {(link.authorizedUsers.includes(getRole()) ||
        link.authorizedUsers.includes("all")) && (
        <ListItem
          disablePadding
          sx={{
            mt: ".5em",
            background: (open || activeLink) && "white",
            color: open || activeLink ? "purple" : "white",
          }}
          onClick={() => setOpen(!open)}
        >
          <ListItemButton
            component={link.url && Link}
            to={link.url}
            className=""
          >
            <ListItemIcon
              className={open || activeLink ? "text-[#D70900]" : "text-white"}
            >
              {
                <link.icon
                  width={"22px"}
                  className={
                    open || activeLink
                      ? "mx-3 text-[purple]"
                      : "text-white mx-3"
                  }
                />
              }
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={<Typography>{link.name}</Typography>}
            />
          </ListItemButton>
        </ListItem>
      )}
    </>
  );
};

export default SidebarItems;
