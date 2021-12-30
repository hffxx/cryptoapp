import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import Carousel from "./Carousel/Carousel";
import Sidebar from "./Sidebar";
import { Hidden } from "@mui/material";

function Dashboard() {
  const [isLogged, setLogin] = useState(true);
  return (
    <Grid container>
      <Carousel />
    </Grid>
  );
}

export default Dashboard;
