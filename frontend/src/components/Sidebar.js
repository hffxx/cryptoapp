import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
  Hidden,
} from "@mui/material";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "./contexts/AuthContext";

function Sidebar({ setOpen }) {
  const [error, setError] = useState(null);
  const { logout } = useAuth();
  let navigate = useNavigate();
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      setOpen(false);
      navigate("/login");
    } catch (e) {
      setError("Failed to logout!");
      console.log(e?.message);
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        width: "200px",
      }}
    >
      <List
        aria-labelledby="dashboard"
        component="nav"
        subheader={
          <ListSubheader component="div" id="dashboard" disableSticky>
            Dashboard
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LineStyleIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="Highscores" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List
        aria-labelledby="inbox"
        component="nav"
        subheader={
          <ListSubheader component="div" id="Coins" disableSticky>
            Coins
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Coins" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="Wallet" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List
        aria-labelledby="inbox"
        component="nav"
        subheader={
          <ListSubheader component="div" id="inbox" disableSticky>
            Inbox
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Hidden xlUp>
        <List
          aria-labelledby="action"
          component="nav"
          subheader={
            <ListSubheader component="div" id="action" disableSticky>
              Action
            </ListSubheader>
          }
        >
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Hidden>
    </Box>
  );
}

export default Sidebar;
