import React, { useState } from "react";
import {
  Paper,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
  Button,
  Link,
  Box,
  Divider,
  Alert,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import UnauthPage from "./Pages/UnauthPage";

const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 50px ",
    margin: "20px auto",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    margin: "20px",
    gap: "10px",
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
      } else {
        setError({
          message: e.code,
        });
      }
      setLoading(false);
    }
  };
  return (
    <UnauthPage>
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
            {"Password recovered? "}
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
    </UnauthPage>
  );
}

export default Recover;
