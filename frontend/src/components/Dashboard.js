import React from "react";
import { Grid } from "@mui/material";
import TableComponent from "./Table/TableComponent";
import Banner from "./Carousel/Banner";
import { TrendingCoins } from "../config/api";

function Dashboard() {
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        padding: "0px 50px",
      }}
    >
      <Grid item>
        <Banner title="Top coins 🔥" apiFunc={TrendingCoins} />
      </Grid>
      <Grid item lg>
        <TableComponent />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
