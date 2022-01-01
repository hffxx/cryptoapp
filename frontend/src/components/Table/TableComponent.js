import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Typography } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const percentColor = (coin) =>
  coin.price_change_percentage_24h > 0 ? "green" : "red";

const dataMissing = (
  <Typography sx={{ color: "orange" }}>Data missing</Typography>
);
function TableComponent({ data }) {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>24h %</TableCell>
            <TableCell>Market Cap</TableCell>
            <TableCell>Volume</TableCell>
            <TableCell>Circulating Supply</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((coin) => (
            <TableRow
              key={coin.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <Box
                    component="img"
                    src={coin?.image}
                    sx={{ width: "25px" }}
                  ></Box>
                  <Typography>{coin.name}</Typography>
                  <Typography sx={{ color: "gray" }}>
                    {coin.symbol.toUpperCase()}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                {!!coin.current_price ? (
                  <Typography>{`$${coin.current_price}`}</Typography>
                ) : (
                  dataMissing
                )}
              </TableCell>
              <TableCell>
                {!!coin.price_change_percentage_24h ? (
                  <Box sx={{ display: "flex", color: percentColor(coin) }}>
                    {coin.price_change_percentage_24h > 0 ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                    <Typography>{`${coin.price_change_percentage_24h}%`}</Typography>
                  </Box>
                ) : (
                  dataMissing
                )}
              </TableCell>
              <TableCell>
                <Typography>{`$${coin.market_cap}`}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{`$${coin.total_volume}`}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{`${
                  coin.circulating_supply
                } ${coin.symbol.toUpperCase()}`}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
