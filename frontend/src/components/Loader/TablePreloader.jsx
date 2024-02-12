import { Skeleton, Table, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import "../table/Table.css";

const TablePreloader = () => {
  const length = React.useMemo(
    (_) => {
      return window.innerWidth < 992 ? 4 : 6;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [window.innerWidth]
  );

  return (
    <Stack overflow="auto">
      <Table
        sx={{ overflowX: "auto" }}
        className="border-separate border-spacing-y-2"
      >
        <thead style={{ backgroundColor: "#eee" }}>
          <tr>
            {Array(length)
              .fill("")
              .map((_, i) => (
                <th key={i}>
                  {" "}
                  <Typography
                    sx={{ mx: length === 6 ? "1em" : ".3em" }}
                    variant="h6"
                  >
                    {" "}
                    <Skeleton />{" "}
                  </Typography>{" "}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {Array(3)
            .fill("")
            .map((_, i) => (
              <tr
                key={i}
                style={{
                  background: "white",
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "19px",
                  marginTop: "10px",
                  height: "60px",
                }}
              >
                {Array(length)
                  .fill("")
                  .map((_, i) => (
                    <td key={i}>
                      {" "}
                      <Typography
                        sx={{ mx: length === 6 ? "1em" : ".3em" }}
                        variant="h6"
                        fontSize={"18px"}
                      >
                        {" "}
                        <Skeleton animation="wave" />{" "}
                      </Typography>{" "}
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </Table>
    </Stack>
  );
};

export default TablePreloader;
