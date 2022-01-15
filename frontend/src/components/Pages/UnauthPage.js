import React from "react";
import { Grid } from "@mui/material";

function UnauthPage({ children }) {
  return (
    <Grid
      container
      sx={{ padding: "10px", display: "flex", alignItems: "flex-start" }}
    >
      {children}
    </Grid>
  );
}

export default UnauthPage;
