import React from "react";
import { Grid } from "@mui/material";
import Carousel from "./Carousel/Carousel";
import Sidebar from "./Sidebar";
import { Hidden } from "@mui/material";

function Dashboard() {
  return (
    <Grid container>
      <Hidden smDown>
        <Sidebar />
      </Hidden>
      {/* <Carousel /> */}
    </Grid>
  );
}

export default Dashboard;
