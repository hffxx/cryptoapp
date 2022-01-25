import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

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
  const [amount, setAmount] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button
        variant="contained"
        color="success"
        disableRipple
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
              {coin.name.length > 6 ? coin.symbol.toUpperCase() : coin.name}
            </Typography>
            <Box component="img" src={coin.image} sx={{ width: "50px" }}></Box>
          </Box>
          {coin.name.length > 6 && (
            <Typography variant="subtitle1" color="gray">
              {coin.name}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Typography
              noWrap
              variant="h6"
            >{`Price: 💲${coin.current_price.toFixed(2)}`}</Typography>
            <TextField
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            ></TextField>
            <Button variant="contained">{`Buy ${amount} ${coin.symbol}`}</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default TradeModal;
