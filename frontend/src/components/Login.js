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
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 50px 50px 50px",
    height: "30vh",
    maxWidth: "400px",
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
    <Grid>
      <Paper square elevation={4} sx={styles.paper}>
        <Typography variant="h2">Sign Up</Typography>
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
            placeholder="Enter your password"
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
        <Button variant="contained" sx={styles.item}>
          Login
        </Button>
        <Box sx={styles.item}>
          <Typography>
            Not a member?{" "}
            <Link underline="none" sx={styles.link}>
              Signup now
            </Link>
          </Typography>
          <Typography>
            Password lost?{" "}
            <Link underline="none" sx={styles.link}>
              Recover Account
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Login;
