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
      </Hidden>
      <Grid item xs={10.5} mt={4} marginTop={0}>
        {children}
      </Grid>
    </Grid>
  );
}

export default DashboardPage;
