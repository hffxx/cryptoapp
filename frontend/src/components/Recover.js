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

function Recover() {
  return (
    <Grid container sx={{ padding: "10px" }}>
      <Paper elevation={4} sx={styles.paper}>
        <Typography variant="h2">Recovery</Typography>
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
        <Button variant="contained" sx={styles.item} disableRipple>
          Reset password
        </Button>
        <Divider />
        <Box sx={styles.item}>
          <Typography>
            {"Didn't receive an email? "}
            <Link underline="hover" sx={styles.link}>
              Resend
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Recover;
