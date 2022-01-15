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
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useAuth } from "./contexts/AuthContext";

const StyledItemIcon = ({ children }) => {
  return (
    <ListItemIcon sx={{ justifyContent: "center" }}>{children}</ListItemIcon>
  );
};

function Sidebar({ setOpen }) {
  const [error, setError] = useState(null);
  const { logout } = useAuth();
  let navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(route);
    setOpen(false);
  };
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
    <Box>
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
          <ListItemButton onClick={() => handleNavigate("/")}>
            <StyledItemIcon>
              <LineStyleIcon />
            </StyledItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <StyledItemIcon>
              <TrendingUpIcon />
            </StyledItemIcon>
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
            <StyledItemIcon>
              <MonetizationOnIcon />
            </StyledItemIcon>
            <ListItemText primary="Trade" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <StyledItemIcon>
              <AccountBalanceWalletIcon />
            </StyledItemIcon>
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
          <ListItemButton onClick={() => handleNavigate("/messages")}>
            <StyledItemIcon>
              <SendIcon />
            </StyledItemIcon>
            <ListItemText primary="Messages" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List
        aria-labelledby="account"
        component="nav"
        subheader={
          <ListSubheader component="div" id="account" disableSticky>
            Account
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigate("/settings")}>
            <StyledItemIcon>
              <ManageAccountsIcon />
            </StyledItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
      <Hidden xlUp>
        <Divider />
        <List
          aria-labelledby="action"
          component="nav"
          subheader={
            <ListSubheader component="div" id="action" disableSticky>
              Actions
            </ListSubheader>
          }
        >
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <StyledItemIcon>
                <LogoutIcon />
              </StyledItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Hidden>
    </Box>
  );
}

export default Sidebar;
