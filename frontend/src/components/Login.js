import React, { useState } from "react";
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
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";
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
  "auth/wrong-password": "Wrong password",
};

function Login() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "elo@wp.pl",
    password: "123123",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const handleSubmit = async () => {
    try {
      setError(null);
      setLoading(true);
      await login(user.email, user.password);
      navigate("/");
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
  useState(() => {
    return setLoading(false);
  });
  return (
    <UnauthPage>
      <Paper elevation={4} sx={styles.paper}>
        <Typography variant="h2">Login</Typography>
        <FormControl>
          <TextField
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
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
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
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
        {!!error && <Alert severity="error">{error.message}</Alert>}
        <Button
          variant="contained"
          sx={styles.item}
          disableRipple
          onClick={handleSubmit}
          disabled={loading}
        >
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
    </UnauthPage>
  );
}

export default Login;
