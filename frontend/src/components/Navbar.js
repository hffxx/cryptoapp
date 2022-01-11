import React, { useState, useEffect } from "react";
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
import { useAuth } from "./contexts/AuthContext";
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
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser, logout } = useAuth();
  let navigate = useNavigate();
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (e) {
      setError("Failed to logout!");
    }
  };
  const handleClick = (route) => {
    navigate(route);
  };
  useEffect(() => {
    function handleCloseMenu() {
      if (window.innerWidth >= 1536) {
        setOpen(false);
      }
    }
    window.addEventListener("resize", handleCloseMenu);
    return () => window.removeEventListener("resize", handleCloseMenu);
  }, []);

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
              {!currentUser ? (
                <Hidden xlDown>
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
              ) : (
                <>
                  <Typography sx={{ color: "black", margin: "0px 20px" }}>
                    {currentUser.email}
                  </Typography>
                  <Hidden xlDown>
                    <Button
                      sx={styles.register}
                      disableRipple
                      onClick={handleLogout}
                    >
                      Log out
                    </Button>
                  </Hidden>
                </>
              )}
              <Hidden xlUp>
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
          <Sidebar setOpen={setOpen} />
        </SwipeableDrawer>
      </AppBar>
    </Box>
  );
}

export default Navbar;
