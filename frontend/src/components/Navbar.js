import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {
  Hidden,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  SwipeableDrawer,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { height } from "@mui/system";
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
  const [open, setOpen] = useState(false);
  const [isLogged, setLogin] = useState(true);
  return (
    <Box
      sx={{
        marginBottom: "20px",
        height: "50px",
      }}
    >
      <AppBar elevation={1} sx={{ backgroundColor: "white" }}>
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

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!isLogged && (
                <Hidden mdDown>
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
              )}
              <Hidden mdUp>
                <IconButton onClick={() => setOpen(true)}>
                  <MenuIcon sx={{ color: "black" }} fontSize="large" />
                </IconButton>
              </Hidden>
            </Box>
          </Toolbar>
        </Container>
        <SwipeableDrawer
          anchor="right"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <IconButton disableRipple onClick={() => setOpen(false)}>
            <ChevronRightIcon sx={{ color: "black" }} fontSize="large" />
          </IconButton>
          <Sidebar />
        </SwipeableDrawer>
      </AppBar>
    </Box>
  );
}

export default Navbar;
