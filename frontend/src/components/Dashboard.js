import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import TableComponent from "./Table/TableComponent";
import Carousel from "./Carousel";
import { TrendingCoins } from "../config/api";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState([]);
  const fetchCoins = async () => {
    const { data } = await axios.get(TrendingCoins());
    setData(data);
  };
  useEffect(() => {
    fetchCoins();
  }, []);
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        padding: "0px 50px",
      }}
    >
      <Grid item>
        <Carousel title="🔥 Top Coins" data={data} />
        <Carousel title="💪 Top Gainers" data={data} />
        <Carousel title="🕓 New Coins" data={data} />
      </Grid>
      <Grid item lg>
        <TableComponent />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
