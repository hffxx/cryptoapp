import React from "react";
import { Grid, Hidden } from "@mui/material";
import Sidebar from "../Sidebar";

function DashboardPage({ children }) {
  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Hidden xlDown>
        <Grid item md={1.5}>
          <Sidebar />
        </Grid>
      </Hidden>
      <Grid item xs={12} md={12} lg={10.5} marginTop={3}>
        {children}
      </Grid>
    </Grid>
  );
}

export default DashboardPage;
