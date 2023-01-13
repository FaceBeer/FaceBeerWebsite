import React, { ReactElement, useEffect } from "react";
import { Data, Leaderboard } from "./Leaderboard";
import { useParams } from "react-router-dom";

function createData(name: string, bac: number, timestamp: Date): Data {
  return {
    name,
    bac,
    timestamp,
  };
}

function LeaderboardPage(): ReactElement {
  const [rows, setRows] = React.useState<Data[]>([]);
  const base_url = "http://api.facebeer.net:8000/user";
  const { name } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log("Requested server!");
    fetch(`${base_url}/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setRows(
          data["message"].map((row: Data) => {
            return createData(row.name, row.bac, new Date(row.timestamp));
          })
        );
      });
  };

  return <Leaderboard rows={rows} />;
}

export default LeaderboardPage;
