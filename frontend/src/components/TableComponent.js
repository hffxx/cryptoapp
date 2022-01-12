import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
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
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import NumberFormat from "react-number-format";

export const percentColor = (coin) =>
  coin.price_change_percentage_24h > 0 ? "green" : "red";

const dataMissing = (
  <Typography sx={{ color: "orange" }}>Data missing</Typography>
);

function Row({ coin }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
      // onClick={() => {
      //   window.innerWidth <= 1200 && setOpen(!open);
      // }}
      >
        <Hidden smDown>
          <TableCell>
            <Typography>{coin.market_cap_rank}</Typography>
          </TableCell>
        </Hidden>
        <TableCell
          sx={{
            position: "sticky",
            left: "0px",
            zIndex: "100",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              "@media (max-width: 600px)": {
                flexDirection: "column",
                gap: "0px",
              },
            }}
          >
            <Box component="img" src={coin?.image} sx={{ width: "25px" }}></Box>
            <Box sx={{ display: "flex" }}>
              <Hidden smUp>
                <Typography>{`${coin.market_cap_rank}.\u00A0`}</Typography>
              </Hidden>
              <Typography sx={{ textAlign: "center" }}>
                {coin.name.length > 8 ? coin.symbol.toUpperCase() : coin.name}
              </Typography>
            </Box>
            <Hidden smDown>
              <Typography variant="subtitle2" sx={{ color: "gray" }}>
                {coin.symbol.toUpperCase()}
              </Typography>
            </Hidden>
          </Box>
        </TableCell>
        <TableCell>
          {!!coin.current_price ? (
            <Typography>
              <NumberFormat
                displayType="text"
                prefix="$"
                value={coin.current_price}
                thousandSeparator={true}
              ></NumberFormat>
            </Typography>
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
              <Typography>{`${coin.price_change_percentage_24h.toFixed(
                2
              )}%`}</Typography>
            </Grid>
          ) : (
            dataMissing
          )}
        </TableCell>
        <TableCell>
          <Grid item>
            <Typography>
              <NumberFormat
                displayType="text"
                prefix="$"
                value={coin.market_cap.toFixed()}
                thousandSeparator={true}
              ></NumberFormat>
            </Typography>
          </Grid>
        </TableCell>
        <TableCell>
          <Grid item>
            <Typography>
              <NumberFormat
                displayType="text"
                prefix="$"
                value={coin.total_volume.toFixed()}
                thousandSeparator={true}
              ></NumberFormat>
            </Typography>
          </Grid>
        </TableCell>
        <TableCell>
          <Grid item>
            <Typography>
              <NumberFormat
                displayType="text"
                suffix={` ${coin.symbol.toUpperCase()}`}
                value={coin.circulating_supply.toFixed()}
                thousandSeparator={true}
              ></NumberFormat>
            </Typography>
            {!!coin.max_supply && coin.circulating_supply !== coin.max_supply && (
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
          </Grid>
        </TableCell>
      </TableRow>
      {/* <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        onClick={() => setOpen(false)}
      ></Collapse> */}
    </>
  );
}

function TableComponent({ data }) {
  const rows = data;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

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
    <Box
      sx={{
        padding: "20px",
        "@media (max-width: 600px)": {
          padding: "0px",
        },
      }}
    >
      <TableContainer>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <Hidden smDown>
                <TableCell sx={{ width: "10px" }}>#</TableCell>
              </Hidden>
              <TableCell
                sx={{
                  position: "sticky",
                  left: "0px",
                  backgroundColor: "white",
                  zIndex: 100,
                }}
              >
                Name
              </TableCell>
              <TableCell>Price</TableCell>
              <TableCell>24h %</TableCell>
              <TableCell>Market Cap</TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Circulating Supply</TableCell>
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
    </Box>
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
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0px",
        position: "sticky",
        left: "0px",
      }}
      rowsPerPageOptions={[10, 25, 50, 100, 250]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    ></TablePagination>
  );
}

export default TableComponent;
