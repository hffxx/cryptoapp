import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
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
  Alert,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

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

const errorsConf = {
  "auth/invalid-email": "Invalid email format",
  "auth/user-not-found": "Email not registered",
};

function Recover() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const { resetPassword } = useAuth();
  const handleSubmit = async () => {
    if (!email) {
      return setError({ message: "Please provide email" });
    }
    try {
      setError(null);
      setSuccess("");
      setLoading(true);
      await resetPassword(email);
      setLoading(false);
      setSuccess("Recover link sent");
    } catch (e) {
      if (errorsConf[e.code]) {
        setError({
          message: errorsConf[e.code],
        });
      }
    }
    setLoading(false);
  };
  return (
    <Grid container sx={{ padding: "10px" }}>
      <Paper elevation={4} sx={styles.paper}>
        <Typography variant="h2">Recovery</Typography>
        <FormControl>
          <TextField
            sx={styles.item}
            label="Login"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        {!!success && <Alert severity="success">{success}</Alert>}
        {!!error && <Alert severity="error">{error.message}</Alert>}
        <Button
          variant="contained"
          sx={styles.item}
          onClick={handleSubmit}
          disableRipple
          disabled={loading}
        >
          Reset password
        </Button>
      </Paper>
    </Grid>
  );
}

export default Recover;
