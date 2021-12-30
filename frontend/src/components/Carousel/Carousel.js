import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import { Card, Container } from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { Typography, CircularProgress } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
  item: {
    padding: "20px",
    height: "200px",
  },
  itemTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  itemImage: {
    width: "10%",
    margin: "25px",
  },
  itemInfo: {},
};

function Carousel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [trending, setTrending] = useState([]);
  const maxSteps = trending.length;
  const fetchTrendingCoings = async () => {
    const { data } = await axios.get(TrendingCoins());
    setTrending(data);
  };
  useEffect(() => {
    fetchTrendingCoings();
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  console.log(trending);
  return (
    <Box sx={{ maxWidth: "350px", flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={4000}
      >
        {trending.length !== 0 ? (
          trending.map((coin, index) => (
            <div key={coin.id}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Container sx={styles.item}>
                  <Box sx={styles.itemTitle}>
                    <Box
                      sx={styles.itemImage}
                      component="img"
                      src={coin?.image}
                      alt={coin.id}
                    />
                    <Typography variant="h4">{coin.name}</Typography>
                  </Box>
                  <Box sx={styles.itemInfo}>
                    <Typography variant="h5">{`Current price : $${coin.current_price}`}</Typography>
                    <Typography variant="h5">{`24h : ${coin.price_change_percentage_24h}%`}</Typography>
                  </Box>
                </Container>
              ) : null}
            </div>
          ))
        ) : (
          <Box sx={{ display: "flex", padding: "20px" }}>
            <CircularProgress />
          </Box>
        )}
      </AutoPlaySwipeableViews>
      {trending.length !== 0 && (
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
      )}
    </Box>
  );
}

export default Carousel;
