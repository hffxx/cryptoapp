import React from "react";
import { Grid } from "@mui/material";
import Carousel from "./Carousel/Carousel";
import TableComponent from "./Table/TableComponent";

function Dashboard() {
  return (
    <Grid
      container
      sx={{
        alignItems: "center",
        justifyContent: "center",
        padding: "0px 50px",
      }}
    >
      <Grid item>
        <Carousel />
      </Grid>
      <Grid item lg>
        <TableComponent />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
