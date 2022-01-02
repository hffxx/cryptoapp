import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Typography, Grid, Collapse, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const percentColor = (coin) =>
  coin.price_change_percentage_24h > 0 ? "green" : "red";

const dataMissing = (
  <Typography sx={{ color: "orange" }}>Data missing</Typography>
);

function Row({ coin }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow
        key={coin.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Box component="img" src={coin?.image} sx={{ width: "25px" }}></Box>
            <Typography>{coin.name}</Typography>
            <Typography sx={{ color: "gray" }}>
              {coin.symbol.toUpperCase()}
            </Typography>
          </Grid>
        </TableCell>
        <TableCell>
          {!!coin.current_price ? (
            <Grid item>
              <Typography>{`$${coin.current_price}`}</Typography>
            </Grid>
          ) : (
            dataMissing
          )}
        </TableCell>
        <TableCell>
          {!!coin.price_change_percentage_24h ? (
            <Grid item sx={{ display: "flex", color: percentColor(coin) }}>
              {coin.price_change_percentage_24h > 0 ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              )}
              <Typography>{`${coin.price_change_percentage_24h}%`}</Typography>
            </Grid>
          ) : (
            dataMissing
          )}
        </TableCell>
        <TableCell>
          <Grid item>
            <Typography>{`$${coin.market_cap}`}</Typography>
          </Grid>
        </TableCell>
        <TableCell>
          <Grid item>
            <Typography>{`$${coin.total_volume}`}</Typography>
          </Grid>
        </TableCell>
        <TableCell>
          <Grid item>
            <Typography>{`${
              coin.circulating_supply
            } ${coin.symbol.toUpperCase()}`}</Typography>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Test1
              </Typography>
              <Table size="small" aria-label="test">
                <TableHead>
                  <TableRow>
                    <TableCell>Test</TableCell>
                    <TableCell>Test</TableCell>
                    <TableCell align="right">Test</TableCell>
                    <TableCell align="right">Test</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={coin.id}>
                    <TableCell component="th" scope="row">
                      {coin.name}
                    </TableCell>
                    <TableCell>{coin.name}</TableCell>
                    <TableCell align="right">{coin.name}</TableCell>
                    <TableCell align="right">{coin.name}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function TableComponent({ data }) {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
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
            <Row coin={coin} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
