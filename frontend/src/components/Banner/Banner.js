import React from "react";
import { Container } from "@mui/material";

const styles = {
  bannerContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "100vh",
  },
};
function Banner() {
  return <Container sx={styles.bannerContent}>Carousel</Container>;
}

export default Banner;
