import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function TradeModal({ children, coin }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        disableRipple
        sx={{ marginTop: "20px" }}
        onClick={handleOpen}
      >
        {children}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Box component="img" src={coin.image} sx={{ width: "50px" }}></Box>
            <Typography variant="h2">
              {coin.name.length > 8 ? coin.symbol.toUpperCase() : coin.name}
            </Typography>
            <Box component="img" src={coin.image} sx={{ width: "50px" }}></Box>
          </Box>
          <Typography variant="h4">{`$${coin.current_price}`}</Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default TradeModal;
