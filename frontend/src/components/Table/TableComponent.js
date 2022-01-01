import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
                {coin.name}
              </TableCell>
              <TableCell>{`$${coin.current_price}`}</TableCell>
              <TableCell>{`${coin.price_change_percentage_24h}%`}</TableCell>
              <TableCell>{`$${coin.market_cap}`}</TableCell>
              <TableCell>{`$${coin.total_volume}`}</TableCell>
              <TableCell>{`${
                coin.circulating_supply
              } ${coin.symbol.toUpperCase()}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
