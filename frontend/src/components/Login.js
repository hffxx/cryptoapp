import React from "react";
import {
  Paper,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
  Grid,
  Button,
  Link,
  Box,
  Divider,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Link as RouterLink } from "react-router-dom";

const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 50px ",
    margin: "20px auto",
  },
  item: {
    margin: "20px",
  },
  link: {
    "&:hover": {
      color: "#ffd434",
      cursor: "pointer",
    },
  },
};

function Login() {
  return (
    <Grid container sx={{ padding: "10px" }}>
      <Paper elevation={4} sx={styles.paper}>
        <Typography variant="h2">Login</Typography>
        <FormControl>
          <TextField
            sx={styles.item}
            label="Login"
            placeholder="Email adress"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </FormControl>
        <FormControl>
          <TextField
            sx={styles.item}
            label="Password"
            placeholder="Password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </FormControl>
        <Button variant="contained" sx={styles.item} disableRipple>
          Login
        </Button>
        <Divider />
        <Box sx={styles.item}>
          <Typography>
            {"Not a member? "}
            <Link
              underline="hover"
              sx={styles.link}
              component={RouterLink}
              to="/signup"
            >
              Register here
            </Link>
          </Typography>
          <Typography>
            {"Forgot your password? "}
            <Link
              underline="hover"
              sx={styles.link}
              component={RouterLink}
              to="/recover"
            >
              Recover account
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Login;
