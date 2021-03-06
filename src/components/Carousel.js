import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Typography, CircularProgress } from "@mui/material";
import { percentColor } from "./Table";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
  item: {
    paddingTop: "20px",
    height: "220px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  itemTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  itemImage: {
    width: "40px",
    margin: "20px",
  },
  itemInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100px",
  },
};

function Carousel({ coins, title }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = coins.length;

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
    <Box
      sx={{
        marginBottom: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography noWrap variant="h3">
        {title}
      </Typography>
      {coins.length !== 0 ? (
        <Box sx={{ width: "320px" }}>
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
                      <Typography variant="h5">{coin.name}</Typography>
                    </Box>
                    <Box sx={styles.itemInfo}>
                      <Typography variant="h5">{`Current price : $${coin.current_price}`}</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h5">{"24h:"}</Typography>
                        {coin.price_change_percentage_24h > 0 ? (
                          <ArrowDropUpIcon sx={{ color: percentColor(coin) }} />
                        ) : (
                          <ArrowDropDownIcon
                            sx={{ color: percentColor(coin) }}
                          />
                        )}
                        <Typography
                          variant="h5"
                          sx={{ color: percentColor(coin) }}
                        >
                          {`${coin.price_change_percentage_24h.toFixed(2)}%`}
                        </Typography>
                      </Box>
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
                  disableRipple
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
                  disableRipple
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
    </Box>
  );
}

export default Carousel;
