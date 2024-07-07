import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  AppBar,
  TablePagination,
} from "@mui/material";
import { cocolifeClinics } from "./data/cocolife-clinics-2024-06";
// import "./App.css";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: "0vh 8vw",
  },

  textfield: {
    paddingTop: "2em",
  },

  tableHeaders: {
    fontWeight: "bold",
  },
}));

function App() {
  const classes = useStyles();

  const [search, setSearch] = useState("");
  console.log(search);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tableHeaders = [
    "Provider Name",
    "Contact Information",
    "Address",
    "Region",
    "Province",
    "City",
    "Provider Code",
  ];

  return (
    <Grid
      container
      className={classes.mainContainer}
      alignItems="center"
      justifyContent="center"
      rowSpacing={3}
      columns={1}
    >
      {/* HEADER */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "white",
          color: "black",
          paddingTop: "4em",
          paddingBottom: "1em",
        }}
      >
        <Grid item>
          <Typography
            variant="h3"
            align="center"
            fontFamily="Nunito Sans"
            fontWeight="medium"
          >
            Cocolife Accredited Clinics
          </Typography>
          <Typography variant="h6" align="center" fontFamily="Nunito Sans">
            As of June 2024
          </Typography>
        </Grid>
        {/* SEARCH FIELD */}
        <Grid item className={classes.textfield} xs={12}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            fullWidth
            // margin="normal"
            defaultValue=""
            onChange={(e) => setSearch(e.target.value)}
            inputProps={{ sx: { fontFamily: "Nunito Sans" } }}
            InputLabelProps={{ sx: { fontFamily: "Nunito Sans" } }}
          />
        </Grid>
      </AppBar>
      {/* TABLE */}
      <Grid item sx={{ overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell
                    sx={{ fontWeight: "bold", fontFamily: "Nunito Sans" }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cocolifeClinics
                .filter((row) => {
                  return search.toLowerCase() === ""
                    ? row
                    : row.providerName
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                        row.address
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        row.region
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        row.province
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        row.city.toLowerCase().includes(search.toLowerCase());
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {[
                      row.providerName,
                      row.contactInfo,
                      row.address,
                      row.region,
                      row.province,
                      row.city,
                      row.providerName,
                    ].map((item) => (
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontFamily: "Nunito Sans" }}
                      >
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={cocolifeClinics.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
}

export default App;
