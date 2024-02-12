import React from "react";
import { Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

export default function SearchBar({
  value,
  onChange,
  placeholder,
  wraperClass,
}) {
  return (
    <Paper
      spacing={2}
      className={`lg:w-[50%] z-10 w-100 border-2 pt-1 rounded-lg flex shadow-none ${wraperClass}`}
    >
      <IconButton
        type="button"
        className="z-10"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        className="w-[90%] z-10"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Paper>
  );
}
