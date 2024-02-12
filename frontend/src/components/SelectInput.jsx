/* eslint-disable react/prop-types */
import React from "react";
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SelectInput = ({
  name,
  label,
  value,
  handleChange,
  handleBlur,
  handleFocus,
  error,
  options,
  helperText,
  bg = "transparent",
  required,
  ...other
}) => {
  const {
    className,
    handleSearch,
    searchLoading,
    readOnly = false,
    loading,
  } = other;
  error = helperText ? true : false;
  return (
    <FormControl
      required={required}
      className="w-full"
      {...{ error, className }}
    >
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        id={name}
        value={value}
        label={label}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        disabled={other.disabled}
        required={required}
        readOnly={readOnly}
        sx={{ background: bg, textTransform: "capitalize" }}
        endAdornment={
          loading && (
            <div>
              <CircularProgress
                sx={{ background: "white" }}
                color="inherit"
                size={16}
              />
            </div>
          )
        }
      >
        {handleSearch && (
          <ListSubheader>
            <TextField
              size="small"
              // Autofocus on textfield
              value={other.searchValue}
              autoFocus
              placeholder="Type to search..."
              fullWidth
              style={{ textTransform: "capitalize" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchLoading && (
                  <React.Fragment>
                    <CircularProgress color="inherit" size={20} />
                  </React.Fragment>
                ),
              }}
              onChange={handleSearch}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  // Prevents autoselecting item while typing (default Select behaviour)
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
        )}

        {}

        {loading ? (
          <p style={{ fontWeight: 500, padding: "0 1em", width: "100%" }}>
            Loading...
          </p>
        ) : (
          options?.map?.((data, key) => {
            if (data instanceof Object)
              return (
                <MenuItem
                  {...{
                    style: { textTransform: "capitalize" },
                    value: data?.id,
                    key,
                  }}
                >
                  {" "}
                  {data.value || "No record found"}{" "}
                </MenuItem>
              );
            else
              return (
                <MenuItem
                  {...{
                    style: { textTransform: "capitalize" },
                    value: data,
                    key,
                  }}
                >
                  {" "}
                  {data}{" "}
                </MenuItem>
              );
          })
        )}
      </Select>
      {error && (
        <FormHelperText sx={{ fontSize: "0.875rem !important" }}>
          {helperText || ""}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectInput;
