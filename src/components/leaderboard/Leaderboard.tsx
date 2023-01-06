import React, { ReactElement } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import { visuallyHidden } from "@mui/utils";

import testdata from "./data.json";

interface Data {
  name: string;
  bac: number;
  timestamp: Date;
}

function createData(name: string, bac: number, timestamp: Date): Data {
  return {
    name,
    bac,
    timestamp,
  };
}

// const rows: Data[] = [
//     createData('Grant', .2, new Date("2023-01-10")),
//     createData('Emre', .25, new Date("2023-01-10")),
//     createData('Grant', .3, new Date("2023-01-11")),
//     createData('Emre', .15, new Date("2023-01-12")),
// ];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort<Data>(
  array: readonly Data[],
  comparator: (a: Data, b: Data) => number
) {
  const stabilizedThis = array.map(
    (el, index) => [el, index] as [Data, number]
  );
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | Date },
  b: { [key in Key]: number | string | Date }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  id: keyof Data;
  isNumeric: boolean;
  isDate: boolean;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    isNumeric: false,
    isDate: false,
    label: "Name",
  },
  {
    id: "bac",
    isNumeric: true,
    isDate: false,
    label: "Blood Alcohol Content (BAC)",
  },
  {
    id: "timestamp",
    isNumeric: false,
    isDate: true,
    label: "Date",
  },
];

interface LeaderboardHeadProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}

function LeaderboardHead(props: LeaderboardHeadProps): ReactElement {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function sortRows(rows: Data[], order: Order, orderBy: keyof Data) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  } as const; // what the fuck, why is this necessary
  return stableSort(rows, getComparator(order, orderBy))
    .slice()
    .map((row, index) => {
      const labelId = `leaderboard-${index}`;
      return (
        <TableRow hover tabIndex={-1} key={row.name + labelId}>
          <TableCell component="th" id={labelId} scope="row">
            {row.name}
          </TableCell>
          <TableCell align="left">{row.bac}</TableCell>
          <TableCell align="left">
            {row.timestamp.toLocaleDateString("en-US", options)}
          </TableCell>
        </TableRow>
      );
    });
}

function Leaderboard(): ReactElement {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("timestamp");
  const rows = testdata.map((row) => {
    return createData(row.name, row.bac, new Date(row.timestamp));
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={"medium"}>
            <LeaderboardHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>{sortRows(rows, order, orderBy)}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default Leaderboard;
