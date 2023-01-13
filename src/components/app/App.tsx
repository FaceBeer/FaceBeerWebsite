import React from "react";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Routes, Route } from "react-router-dom";

import type { Data } from "../leaderboard/Leaderboard";
import Copyright from "../home/Copyright";
import Home from "../home/Home";
import UserLeaderboardPage from "../leaderboard/UserLeaderboardPage";
import AllUserLeaderboardPage from "../leaderboard/AllUserLeaderboardPage";
import Header from "../home/Header";
import NotFound from "../home/NotFound";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      text: {
        primary: "#000000",
        secondary: "#ffffff",
      },
      primary: {
        main: "#ffffff",
      },
      background: {
        default: "#3a60f1",
      },
      secondary: {
        main: "#3a60f1",
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
      <CssBaseline />
      <div>
        <Header />
        <div className={classes.root}>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"user/:name"} element={<UserLeaderboardPage />} />
            <Route path={"user/"} element={<NotFound />} />
            <Route path={"all"} element={<AllUserLeaderboardPage />} />
          </Routes>
        </div>
        <Copyright />
      </div>
    </ThemeProvider>
  );
}

export default App;
export type { Data };
