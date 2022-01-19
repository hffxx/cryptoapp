import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

function Spinner() {
  return (
    <Box
      sx={{
        height: "60vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      <Typography variant="h5">Data loading..</Typography>
      <CircularProgress />
    </Box>
  );
}

export default Spinner;
