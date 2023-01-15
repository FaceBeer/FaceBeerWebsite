import React, { ReactElement } from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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
  button: {
    textDecoration: "none",
  },
}));
function Header(): ReactElement {
  const classes = useStyles();
  return (
    <>
      <AppBar position={"static"} title={"FaceBeer"} color={"primary"}>
        <Toolbar>
          <Link to={"/"} className={classes.button}>
            <Button color={"secondary"}>Home</Button>
          </Link>
          <Link to={"all"} className={classes.button}>
            <Button color={"secondary"}>Everyone</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Typography className={classes.title} variant={"h1"} color={"primary"}>
        FaceBeer
      </Typography>
    </>
  );
}

export default Header;
