import React from "react";
import { Container, Typography } from "@mui/material";
import CarouselComponent from "./CarouselComponent";

const styles = {
  bannerContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  bannerTitle: {
    color: "black",
    backgroundColor: "#ffd434",
    borderRadius: "10px",
    marginBottom: "50px",
    marginTop: "30px",
  },
};
function Banner() {
  return (
    <Container sx={styles.bannerContent}>
      <Typography variant="h2" sx={styles.bannerTitle}>
        Price tracker
      </Typography>
      <CarouselComponent />
    </Container>
  );
}

export default Banner;
