import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import { Paper, Container } from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { Typography } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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
    <Paper sx={{ margin: "25px" }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {trending.map((coin, index) => (
          <div key={coin.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Container sx={{ backgroundColor: "red" }}>
                <Typography variant="h2">{coin.name}</Typography>
                <Box component="img" src={coin?.image} alt={coin.id} />
              </Container>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
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
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Paper>
  );
}

export default Carousel;
