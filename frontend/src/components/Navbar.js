import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const styles = {
  appBar: {
    marginLeft: "16px",
    marginRight: "16px",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  },
  register: {
    backgroundColor: "#ffd434",
    color: "black",
    "&:hover": {
      opacity: "0.9",
      backgroundColor: "#ffd434",
    },
  },
  login: {
    marginLeft: "20px",
    color: "black",
    "&:hover": {
      color: "#ffd434",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
};

function Navbar() {
  return (
    <Box sx={styles.appBar}>
      <AppBar>
        <Toolbar sx={styles.toolbar}>
          <Typography variant="h6" component="div" sx={styles.logo}>
            <MonetizationOnIcon />
            Crypto Game
          </Typography>
          <Box>
            <Button sx={styles.register}>Register</Button>
            <Button sx={styles.login} disableRipple={true}>
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
