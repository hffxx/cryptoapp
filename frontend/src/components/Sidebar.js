import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
} from "@mui/material";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar() {
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
    </Box>
  );
}

export default Sidebar;
