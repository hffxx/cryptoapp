import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar() {
  return (
    <Box>
      <List
        aria-labelledby="dashboard"
        component="nav"
        subheader={
          <ListSubheader component="div" id="dashboard">
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
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="Wallet" />
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
          <ListSubheader component="div" id="inbox">
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
      <List
        aria-labelledby="action"
        component="nav"
        subheader={
          <ListSubheader component="div" id="action">
            Action
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;
