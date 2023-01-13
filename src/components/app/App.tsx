import React, { useEffect } from "react";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Routes, Route, Link } from "react-router-dom";

import type { Data } from "../leaderboard/Leaderboard";
import Copyright from "./Copyright";
import Home from "../home/Home";
import UserLeaderboardPage from "../leaderboard/UserLeaderboardPage";
import AllUserLeaderboardPage from "../leaderboard/AllUserLeaderboardPage";

const theme = responsiveFontSizes(
  createTheme({
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
  })
);

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
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"user/:name"} element={<UserLeaderboardPage />} />
          <Route path={"all"} element={<AllUserLeaderboardPage />} />
        </Routes>
      </div>
      <Copyright />
    </ThemeProvider>
  );
}

export default App;
export type { Data };
