import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";
import axios from "axios";

function Banner({ title, apiFunc }) {
  const [data, setData] = useState([]);
  const fetchCoins = async () => {
    const { data } = await axios.get(apiFunc());
    setData(data);
  };
  useEffect(() => {
    fetchCoins();
  }, []);
  return (
    <Container>
      <Typography variant="h3">{title}</Typography>
      <Carousel data={data} />
    </Container>
  );
}

export default Banner;
