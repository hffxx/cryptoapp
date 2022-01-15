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
  "auth/weak-password": "Password too short",
  "auth/email-already-in-use": "Email already in use",
};

function SignUp() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const handleSubmit = async () => {
    const { email, password, confirmPassword } = newUser;
    if (password !== confirmPassword) {
      return setError({ message: "Password do not match!" });
    }
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      setNewUser({ email: "", password: "", confirmPassword: "" });
      setSuccess("Account created");
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
    }
    setLoading(false);
  };

  return (
    <UnauthPage>
      <Paper elevation={4} sx={styles.paper}>
        <Typography variant="h2">Sign up</Typography>
        <FormControl>
          <TextField
            value={newUser.email}
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
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <TextField
            sx={styles.item}
            value={newUser.password}
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
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <TextField
            sx={styles.item}
            value={newUser.confirmPassword}
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
            onChange={(e) =>
              setNewUser({ ...newUser, confirmPassword: e.target.value })
            }
          />
        </FormControl>
        {!!error && <Alert severity="error">{error.message}</Alert>}
        {!!success && <Alert severity="success">{success}</Alert>}
        <Button
          variant="contained"
          sx={styles.item}
          disableRipple
          onClick={handleSubmit}
          disabled={loading}
        >
          Sign up
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
    </UnauthPage>
  );
}

export default SignUp;
