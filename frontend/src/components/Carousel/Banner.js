import React from "react";
import { Paper, Typography, Container } from "@mui/material";
import Carousel from "./Carousel";

const styles = {
  bannerContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
};
function Banner() {
  return (
    <Container sx={styles.bannerContent}>
      <Carousel />
    </Container>
  );
}

export default Banner;
