import React, { ReactElement, useEffect } from "react";
import { Data, Leaderboard } from "./Leaderboard";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";

function createData(name: string, bac: number, timestamp: Date): Data {
  return {
    name,
    bac,
    timestamp,
  };
}

function LeaderboardPage(): ReactElement {
  const [rows, setRows] = React.useState<Data[]>([]);
  const { name } = useParams();
  const requestURL = `http://api.facebeer.net:8000/user/${name}`;

  useEffect(() => {
    if (name !== undefined) {
      fetchData(requestURL);
    }
  }, [name, requestURL]);

  const fetchData = (url: string) => {
    console.log("Requested server!");
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRows(
          data["message"].map((row: Data) => {
            return createData(row.name, row.bac, new Date(row.timestamp));
          })
        );
      });
  };

  return rows.length > 0 ? (
    <Leaderboard rows={rows} />
  ) : (
    <Typography>No data to display for this user. Try again.</Typography>
  );
}

export default LeaderboardPage;
