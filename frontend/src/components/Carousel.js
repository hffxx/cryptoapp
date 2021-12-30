import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Typography, CircularProgress, Link } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
  item: {
    padding: "20px",
    height: "260px",
  },
  itemTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  itemImage: {
    width: "75px",
    margin: "25px",
  },
  itemInfo: {},
};

function Carousel({ data, title }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [coins, setCoin] = useState([]);
  const maxSteps = coins.length;
  useEffect(() => {
    setCoin(data);
  }, [data]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <Container sx={{ marginBottom: "50px" }}>
      <Typography variant="h3">{title}</Typography>
      {coins.length !== 0 ? (
        <Box sx={{ maxWidth: "320px", flexGrow: 1 }}>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            interval={4000}
          >
            {coins.map((coin, index) => (
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
                      <Link>Buy now</Link>
                    </Box>
                  </Container>
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          {coins.length !== 0 && (
            <MobileStepper
              steps={maxSteps}
              sx={{ justifyContent: "center" }}
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
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
}

export default Carousel;
