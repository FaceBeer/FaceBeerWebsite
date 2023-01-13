import React, { ReactElement } from "react";
import { Typography } from "@material-ui/core";

function NotFound(): ReactElement {
  return (
    <Typography variant={"h3"} color={"primary"}>
      No data to display for this user. Try again.
    </Typography>
  );
}
export default NotFound;
