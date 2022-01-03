import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Typography,
  Grid,
  Collapse,
  IconButton,
  Hidden,
  TablePagination,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";

const percentColor = (coin) =>
  coin.price_change_percentage_24h > 0 ? "green" : "red";

const dataMissing = (
  <Typography sx={{ color: "orange" }}>Data missing</Typography>
);

function Row({ coin }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <Hidden xlDown>
          <TableCell>
            <Typography>{coin.market_cap_rank}</Typography>
          </TableCell>
        </Hidden>
        <TableCell component="th" scope="row">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Box component="img" src={coin?.image} sx={{ width: "25px" }}></Box>
            <Typography>{coin.name}</Typography>
            <Typography variant="subtitle2" sx={{ color: "gray" }}>
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
        <Hidden mdDown>
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
            <Box>
              <Typography>{`${
                coin.circulating_supply
              } ${coin.symbol.toUpperCase()}`}</Typography>
              {!!coin.max_supply &&
                coin.circulating_supply !== coin.max_supply && (
                  <Tooltip
                    title={`Percentage: ${(
                      (coin.circulating_supply / coin.max_supply) *
                      100
                    ).toFixed(2)}%`}
                    arrow
                  >
                    <LinearProgress
                      sx={{
                        width: "150px",
                        height: "5px",
                        borderRadius: "2px",
                      }}
                      variant="determinate"
                      value={(coin.circulating_supply / coin.max_supply) * 100}
                      color="inherit"
                    ></LinearProgress>
                  </Tooltip>
                )}
            </Box>
          </TableCell>
        </Hidden>
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
  const rows = data;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const props = {
    page,
    setPage,
    rowsPerPage,
    handleChangeRowsPerPage,
    emptyRows,
    rows,
    handleChangePage,
  };
  return (
    <TableContainer sx={{ overflowX: "auto" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <Hidden xlDown>
              <TableCell>#</TableCell>
            </Hidden>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>24h %</TableCell>
            <Hidden mdDown>
              <TableCell>Market Cap</TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Circulating Supply</TableCell>
            </Hidden>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((coin) => (
              <Row coin={coin} key={coin.id} />
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 75 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePaginationComponent {...props} />
    </TableContainer>
  );
}

function TablePaginationComponent({
  rows,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      count={rows.length}
      component={Paper}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    ></TablePagination>
  );
}

export default TableComponent;
