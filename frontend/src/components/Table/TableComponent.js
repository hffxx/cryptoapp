import React, { useState, useEffect } from "react";
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
} from "@mui/material";
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
  useEffect(() => {
    function handleCloseCollapse() {
      if (window.innerWidth >= 1200) {
        setOpen(false);
      }
    }
    window.addEventListener("resize", handleCloseCollapse);
    return () => window.removeEventListener("resize", handleCloseCollapse);
  }, []);
  return (
    <>
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          height: "65px",
        }}
      >
        <Hidden lgUp>
          <TableCell sx={{ width: "px" }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </Hidden>
        <Hidden lgDown>
          <TableCell>
            <Typography>{coin.market_cap_rank}</Typography>
          </TableCell>
        </Hidden>
        <TableCell>
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
        <Hidden lgDown>
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
            <Grid>
              <Typography>
                <NumberFormat
                  displayType="text"
                  suffix={` ${coin.symbol.toUpperCase()}`}
                  value={coin.circulating_supply.toFixed()}
                  thousandSeparator={true}
                ></NumberFormat>
              </Typography>
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
            </Grid>
          </TableCell>
        </Hidden>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ border: 0 }}></TableCell>
                    <TableCell>Market Cap</TableCell>
                    <TableCell>Volume</TableCell>
                    <TableCell sx={{ width: "150px" }}>
                      Circulating Supply
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    key={coin.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell></TableCell>
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
                    <TableCell
                      align="right"
                      sx={{ display: "flex", margin: "0px" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography>
                          <NumberFormat
                            displayType="text"
                            suffix={` ${coin.symbol.toUpperCase()}`}
                            value={coin.circulating_supply.toFixed()}
                            thousandSeparator={true}
                          ></NumberFormat>
                        </Typography>
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
                                value={
                                  (coin.circulating_supply / coin.max_supply) *
                                  100
                                }
                                color="inherit"
                              ></LinearProgress>
                            </Tooltip>
                          )}
                      </Box>
                    </TableCell>
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
    <Box sx={{ display: "flex" }}>
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <Hidden lgUp>
                <TableCell />
              </Hidden>
              <Hidden lgDown>
                <TableCell>#</TableCell>
              </Hidden>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>24h %</TableCell>
              <Hidden lgDown>
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
