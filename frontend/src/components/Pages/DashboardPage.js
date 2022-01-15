import React from "react";
import { Grid, Hidden } from "@mui/material";
import Sidebar from "../Sidebar";

function DashboardPage({ children }) {
  return (
    <Grid container sx={{ justifyContent: "center" }} marginTop={2}>
      <Hidden xlDown>
        <Grid item xs={1.5}>
          <Sidebar />
        </Grid>
        <Grid item xs={10.5} mt={4} marginTop={2}>
          {children}
        </Grid>
      </Hidden>
      <Hidden xlUp>
        <Grid item xs={12} mt={4} marginTop={2}>
          {children}
        </Grid>
      </Hidden>
    </Grid>
  );
}

export default DashboardPage;
