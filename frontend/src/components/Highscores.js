import React from "react";
import DashboardPage from "./Pages/DashboardPage";
import { useAuth } from "./contexts/AuthContext";
import { Typography } from "@mui/material";
function Highscores() {
  const { userList } = useAuth();
  console.log(userList);
  const highscores = userList.sort((a, b) => {
    return b.balance - a.balance;
  });
  return (
    <DashboardPage>
      <Typography variant="h2" mb={5}>
        Highscores! (Testing)
      </Typography>
      {userList.map((user) => {
        return (
          <div key={user.id}>{`Player ${user.nick} has $${user.balance}!`}</div>
        );
      })}
    </DashboardPage>
  );
}

export default Highscores;
