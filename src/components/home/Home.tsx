import React, { ReactElement } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "50%",
  },
  center: {
    display: "inline-flex",
    justifyContent: "center",
    width: "100%",
  },
}));

function Home(): ReactElement {
  const classes = useStyles();
  const [name, setName] = React.useState<string>("");
  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setName(event.target.value);
  };
  return (
    <div className={classes.center}>
      <div className={classes.formContainer}>
        <Grid container spacing={2} md={12}>
          <Grid item xs={12}>
            <Typography
              variant={"h4"}
              color={"primary"}
              className={classes.center}
            >
              Enter a name to search
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id={"name_input"}
              label={"name"}
              variant={"filled"}
              color={"primary"}
              className={classes.center}
              onChange={onChange}
            />
            <Grid item xs={12}>
              <Link to={`user/${name}`}>
                <Button
                  color={"primary"}
                  variant={"contained"}
                  style={{ width: "100%" }}
                >
                  Submit
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Home;
