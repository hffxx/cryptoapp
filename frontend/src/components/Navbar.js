import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useNavigate } from "react-router-dom";
import { Hidden } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const styles = {
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    color: "black",
    "&:hover": {
      cursor: "pointer",
    },
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
  let navigate = useNavigate();
  const handleClick = (route) => {
    navigate(route);
  };
  return (
    <Box>
      <AppBar elevation={0} position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar sx={styles.toolbar}>
          <Typography
            variant="h6"
            component="div"
            sx={styles.logo}
            onClick={() => handleClick("/")}
          >
            <MonetizationOnIcon />
            Crypto Game
          </Typography>

          <Box>
            <Hidden smDown>
              <Button
                sx={styles.register}
                onClick={() => handleClick("/signup")}
                disableRipple
              >
                Register
              </Button>
              <Button
                sx={styles.login}
                onClick={() => handleClick("/login")}
                disableRipple
              >
                Login
              </Button>
            </Hidden>
            <Hidden smUp>
              <MenuIcon sx={{ color: "black" }} fontSize="large" />
            </Hidden>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
