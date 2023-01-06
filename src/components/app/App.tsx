import React from "react";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { CssBaseline, Typography } from "@material-ui/core";

import Leaderboard from "../leaderboard/Leaderboard";
import { Box, Paper } from "@mui/material";

const theme = createTheme({
  palette: {
    text: {
      primary: "#ffffff",
    },
    primary: {
      main: "#ffffff",
    },
    background: {
      default: "#3a60f1",
    },
    secondary: {
      main: "#8aa0f1",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2%",
  },
  title: {
    display: "inline-flex",
    justifyContent: "center",
    width: "100%",
    padding: "2%",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Typography className={classes.title} variant={"h1"} color={"primary"}>
          FaceBeer
        </Typography>

        <Leaderboard />
      </div>
      <Box
        component="img"
        sx={{
          height: 300,
          width: 300,
          position: "fixed",
          bottom: 0,
          left: 0,
        }}
        alt="FaceBeer logo"
        src={require("./facebeer.jpg")}
      />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Typography variant={"body1"} align="center">
          Copyright FaceBeer {new Date().getFullYear().toString()}
        </Typography>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
