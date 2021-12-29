import React from "react";
import { Container, Typography } from "@mui/material";

const styles = {
  bannerContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  bannerTitle: {
    color: "#ffd434",
    textShadow: "2px 2px black",
  },
};
function Banner() {
  return (
    <Container sx={styles.bannerContent}>
      <Typography variant="h2" sx={styles.bannerTitle}>
        Price tracker
      </Typography>
    </Container>
  );
}

export default Banner;
