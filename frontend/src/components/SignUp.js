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
  grid: {
    padding: "50px",
  },
  paper: {
    display: "flex",
    minWidth: "350px",
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

function SignUp() {
  return (
    <Grid container sx={styles.grid}>
      <Paper square elevation={4} sx={styles.paper}>
        <Typography variant="h2">Register</Typography>
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
            label="Set password"
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
        <FormControl>
          <TextField
            sx={styles.item}
            label="Confirm password"
            placeholder="Confirm password"
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
          Register
        </Button>
        <Divider />
        <Box sx={styles.item}>
          <Typography>
            {"Already registered? "}
            <Link
              underline="hover"
              sx={styles.link}
              component={RouterLink}
              to="/login"
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}

export default SignUp;
