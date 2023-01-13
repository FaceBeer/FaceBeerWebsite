import React, { ReactElement, useEffect } from "react";
import { Data, Leaderboard } from "./Leaderboard";

function createData(name: string, bac: number, timestamp: Date): Data {
  return {
    name,
    bac,
    timestamp,
  };
}

function AllUserLeaderboardPage(): ReactElement {
  const [rows, setRows] = React.useState<Data[]>([]);
  const base_url = "http://api.facebeer.net:8000/get_all_users";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log("Requested server!");
    fetch(base_url)
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
export default AllUserLeaderboardPage;
