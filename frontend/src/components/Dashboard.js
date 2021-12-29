import React from "react";
import { Grid } from "@mui/material";
import Carousel from "./Carousel/Carousel";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <Grid container>
      <Sidebar />
      <Carousel />
    </Grid>
  );
}

export default Dashboard;
