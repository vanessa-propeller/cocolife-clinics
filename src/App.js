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
import { cocolifeClinics } from "./data/cocolife-clinics-2024-06-trial";
// import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        padding: "4vh 8vw",
    },

    textfield: {
        paddingTop: "2em",
    },

    cardsContainer: {
        padding: "2vh 0vh",
    },
    card: {
        // padding: "2em",
        // margin: "1em 0em",
        // width: "36vw",
        // width: "100%",
        // height: "28vh",
    },

    keys: {
        fontWeight: "bold",
    },
}));

function App() {
    const classes = useStyles();

    const [search, setSearch] = useState("");
    console.log(search);

    const customIcon = new Icon({
        iconUrl: require("./assets/location.png"),
        iconSize: [32, 32],
    });

    return (
        <Grid
            className={classes.mainContainer}
            alignItems="center"
            justifyContent="center"
        >
            {/* HEADERS */}
            <Grid item>
                <Typography
                    variant="h3"
                    align="center"
                    fontFamily="Nunito Sans"
                    fontWeight="medium"
                >
                    Cocolife Accredited Clinics
                </Typography>
                <Typography
                    variant="h6"
                    align="center"
                    fontFamily="Nunito Sans"
                    fontWeight="light"
                >
                    As of June 2024
                </Typography>
                <Typography
                    variant="h6"
                    align="center"
                    fontFamily="Nunito Sans"
                    fontWeight="light"
                    fontSize="14px"
                >
                    Source: https://www.cocolife.com/healthcare-providers/
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
                    InputLabelProps={{
                        sx: {
                            fontFamily: "Nunito Sans",
                        },
                    }}
                />
            </Grid>

            {/* INTERACTIVE MAP */}
            <MapContainer center={[14.5995, 120.9842]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

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
                                  row.city
                                      .toLowerCase()
                                      .includes(search.toLowerCase());
                    })
                    .map((row) => (
                        <Marker position={row.location} icon={customIcon}>
                            <Popup>
                                <p class="p">{row.providerName}</p>
                                <p>{row.contactInfo}</p>
                                <p>{row.address}</p>
                            </Popup>
                        </Marker>
                    ))}
            </MapContainer>

            <Grid
                item
                container
                justifyContent="space-between"
                spacing={8}
                className={classes.cardsContainer}
            >
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
                                  row.city
                                      .toLowerCase()
                                      .includes(search.toLowerCase());
                    })
                    .map((row) => (
                        <Grid item xs={12} md={6} className={classes.card}>
                            {/* <Paper className={classes.card}> */}
                            <Paper
                                sx={{ height: "100%", padding: "18px 24px" }}
                            >
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="flex-end"
                                >
                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            fontFamily="Nunito Sans"
                                            sx={{ marginBottom: "8px" }}
                                        >
                                            <span className={classes.keys}>
                                                Provider Name:{" "}
                                            </span>
                                            {row.providerName}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            fontFamily="Nunito Sans"
                                            sx={{ marginBottom: "8px" }}
                                        >
                                            <span className={classes.keys}>
                                                Contact Info:{" "}
                                            </span>
                                            {row.contactInfo}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            fontFamily="Nunito Sans"
                                            sx={{ marginBottom: "8px" }}
                                        >
                                            <span className={classes.keys}>
                                                Address:{" "}
                                            </span>
                                            {row.address}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            fontFamily="Nunito Sans"
                                            sx={{ marginBottom: "8px" }}
                                        >
                                            <span className={classes.keys}>
                                                Region:{" "}
                                            </span>
                                            {row.region}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            fontFamily="Nunito Sans"
                                            sx={{ marginBottom: "8px" }}
                                        >
                                            <span className={classes.keys}>
                                                Province:{" "}
                                            </span>
                                            {row.province}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            fontFamily="Nunito Sans"
                                            sx={{ marginBottom: "8px" }}
                                        >
                                            <span className={classes.keys}>
                                                City:{" "}
                                            </span>
                                            {row.city}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            fontFamily="Nunito Sans"
                                            sx={{ marginBottom: "8px" }}
                                        >
                                            <span className={classes.keys}>
                                                Provider Code:{" "}
                                            </span>
                                            {row.providerCode}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                {/* </Paper> */}
                            </Paper>
                        </Grid>
                    ))}
            </Grid>
        </Grid>
    );
}

export default App;
