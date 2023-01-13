import React, { ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    padding: "2%",
    position: "relative",
  },
  title: {
    display: "inline-flex",
    justifyContent: "center",
    width: "100%",
    padding: "2%",
  },
}));
function Home(): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.titleContainer}>
      <Typography className={classes.title} variant={"h1"} color={"primary"}>
        FaceBeer
      </Typography>
    </div>
  );
}

export default Home;
