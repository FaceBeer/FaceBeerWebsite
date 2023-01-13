import React, { ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

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
  copyright: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },
}));
function Copyright(): ReactElement {
  const classes = useStyles();
  return (
    <Paper className={classes.copyright} elevation={3}>
      <Typography variant={"body1"} align="center">
        Copyright FaceBeer {new Date().getFullYear().toString()}
      </Typography>
    </Paper>
  );
}

export default Copyright;
