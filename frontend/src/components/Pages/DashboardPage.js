import React from "react";
import { Grid, Hidden } from "@mui/material";
import Sidebar from "../Sidebar";

function DashboardPage({ children }) {
  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Hidden lgDown>
        <Grid item xs={1.5}>
          <Sidebar />
        </Grid>
      </Hidden>
      <Grid item xs={10.5} mt={4}>
        {children}
      </Grid>
    </Grid>
  );
}

export default DashboardPage;
