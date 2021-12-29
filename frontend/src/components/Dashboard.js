import React, { useState } from "react";
import { Grid } from "@mui/material";
import Carousel from "./Carousel/Carousel";
import Sidebar from "./Sidebar";
import { Hidden } from "@mui/material";

function Dashboard() {
  const [isLogged, setLogin] = useState(true);
  return (
    <Grid container>
      <Hidden smDown>{isLogged && <Sidebar />}</Hidden>
      <Carousel />
    </Grid>
  );
}

export default Dashboard;
