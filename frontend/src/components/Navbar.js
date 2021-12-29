import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useNavigate } from "react-router-dom";
import { Hidden, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { SwipeableDrawer } from "@mui/material";
import Sidebar from "./Sidebar";

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
      <AppBar elevation={0} position="sticky" sx={{ backgroundColor: "white" }}>
        <Container maxWidth="xxl">
          <Toolbar sx={styles.toolbar} disableGutters>
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
                <IconButton>
                  <MenuIcon sx={{ color: "black" }} fontSize="large" />
                </IconButton>
              </Hidden>
            </Box>
          </Toolbar>
        </Container>
        <SwipeableDrawer anchor="right" open={false}>
          <Sidebar />
        </SwipeableDrawer>
      </AppBar>
    </Box>
  );
}

export default Navbar;
