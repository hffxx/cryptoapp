import React, { useState, useEffect, useCallback, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Typography,
  Grid,
  Hidden,
  TablePagination,
  tablePaginationClasses,
  Tooltip,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LinearProgress from "@mui/material/LinearProgress";
import NumberFormat from "react-number-format";
import InfoIcon from "@mui/icons-material/Info";

export const percentColor = (coin) =>
  coin.price_change_percentage_24h > 0 ? "green" : "red";

const dataMissing = (
  <Typography sx={{ color: "orange" }}>Data missing</Typography>
);

const StyledTooltip = ({ children, tooltipText }) => {
  return (
    <Tooltip
      enterTouchDelay={0}
      leaveTouchDelay={20000}
      title={tooltipText}
      componentsProps={{
        tooltip: {
          sx: {
            padding: "10px 20px",
            color: "#626f86",
            backgroundColor: "white",
            fontSize: "14px",
            boxShadow:
              "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

const Infoheader = ({ tooltipText, text }) => {
  return (
    <TableCell>
      <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Typography variant="string" noWrap>
          {text}
        </Typography>
        <StyledTooltip tooltipText={tooltipText}>
          <InfoIcon
            fontSize="string"
            color="disabled"
            sx={{
              display: "inline-block",
              position: "relative",
              padding: "1em",
              margin: "-1em",
            }}
          />
        </StyledTooltip>
      </Box>
    </TableCell>
  );
};

function Row({ coin, width }) {
  const coinFormat = (amount) => {
    if (amount / 1000000000 > 1 && width <= 1200) {
      return `$${(amount / 1000000000).toFixed(2)}B`;
    } else if (amount / 1000000 > 1 && width <= 1200) {
      return `$${(amount / 1000000).toFixed(2)}M`;
    } else {
      return (
        <NumberFormat
          displayType="text"
          prefix="$"
          value={amount.toFixed()}
          thousandSeparator={true}
        ></NumberFormat>
      );
    }
  };
  return (
    <>
      <TableRow sx={{ height: "70px" }}>
        <Hidden mdDown>
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
              "@media (max-width: 599px)": {
                flexDirection: "column",
                gap: "0px",
              },
            }}
          >
            <Hidden mdUp smDown>
              <Typography>{`${coin.market_cap_rank}.\u00A0`}</Typography>
            </Hidden>
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
            <Typography>{coinFormat(coin.market_cap)}</Typography>
          </Grid>
        </TableCell>
        <TableCell>
          <Grid item>
            <Typography>{coinFormat(coin.total_volume)}</Typography>
          </Grid>
        </TableCell>
        <TableCell>
          <Grid item sx={{ display: "flex" }}>
            {!!coin.max_supply &&
            coin.circulating_supply !== coin.max_supply ? (
              <Box sx={{ width: "175px" }}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  sx={{ gap: "10px" }}
                >
                  <Typography>
                    <NumberFormat
                      displayType="text"
                      suffix={` ${coin.symbol.toUpperCase()}`}
                      value={coin.circulating_supply.toFixed()}
                      thousandSeparator={true}
                    ></NumberFormat>
                  </Typography>
                  <StyledTooltip
                    tooltipText={
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <Typography variant="string">{`Percentage: ${(
                          (coin.circulating_supply / coin.max_supply) *
                          100
                        ).toFixed(2)}%`}</Typography>
                        <LinearProgress
                          sx={{
                            height: "5px",
                            borderRadius: "2px",
                          }}
                          variant="determinate"
                          value={
                            (coin.circulating_supply / coin.max_supply) * 100
                          }
                          color="inherit"
                        ></LinearProgress>
                        <Typography variant="string">
                          {`Circulating Supply: `}{" "}
                          <NumberFormat
                            displayType="text"
                            value={coin.circulating_supply.toFixed()}
                            thousandSeparator={true}
                          ></NumberFormat>
                          {` ${coin.symbol.toUpperCase()}`}
                        </Typography>
                        <Typography variant="string">
                          {`Max Supply: `}{" "}
                          <NumberFormat
                            displayType="text"
                            value={coin.max_supply}
                            thousandSeparator={true}
                          ></NumberFormat>
                          {` ${coin.symbol.toUpperCase()}`}
                        </Typography>
                      </Box>
                    }
                    arrow
                  >
                    <InfoIcon
                      fontSize="string"
                      color="disabled"
                      sx={{
                        display: "inline-block",
                        position: "relative",
                        padding: "1em",
                        margin: "-1em",
                      }}
                    />
                  </StyledTooltip>
                </Box>
                <LinearProgress
                  sx={{
                    height: "5px",
                    borderRadius: "2px",
                  }}
                  variant="determinate"
                  value={(coin.circulating_supply / coin.max_supply) * 100}
                  color="inherit"
                ></LinearProgress>
              </Box>
            ) : (
              <Typography>
                <NumberFormat
                  displayType="text"
                  suffix={` ${coin.symbol.toUpperCase()}`}
                  value={coin.circulating_supply.toFixed()}
                  thousandSeparator={true}
                ></NumberFormat>
              </Typography>
            )}
          </Grid>
        </TableCell>
      </TableRow>
    </>
  );
}

function TableComponent({ data }) {
  const rows = data;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let tableRef = useRef();
  const handleWindowResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
    window.scrollTo({
      behavior: "smooth",
      top: tableRef.current?.offsetTop,
    });
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
      <TableContainer ref={tableRef}>
        <Table
          aria-label="simple table"
          size={windowWidth < 1200 ? "small" : "medium"}
        >
          <TableHead>
            <TableRow>
              <Hidden mdDown>
                <TableCell sx={{ width: "10px" }}>#</TableCell>
              </Hidden>
              <TableCell
                align={windowWidth <= 600 ? "center" : "left"}
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
              <Infoheader
                text="Market Cap"
                tooltipText="The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market. Market Cap = Current Price x Circulating Supply."
              />
              <Infoheader
                text="Volume(24h)"
                tooltipText="A measure of how much of a cryptocurrency was traded in the last null."
              />
              <Infoheader
                text="Circulating Supply"
                tooltipText="The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market."
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((coin) => (
                <Row coin={coin} key={coin.id} width={windowWidth} />
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
        margin: "0px",
        position: "sticky",
        left: "0px",
        overflow: "hidden",
        [`& .${tablePaginationClasses.spacer}`]: {
          display: "none",
        },
        [`& .${tablePaginationClasses.toolbar}`]: {
          justifyContent: "center",
        },
      }}
      rowsPerPageOptions={[
        10,
        25,
        50,
        100,
        { label: "All", value: rows.length },
      ]}
      component="div"
      count={rows.length}
      labelRowsPerPage={"Coins"}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    ></TablePagination>
  );
}

export default TableComponent;
