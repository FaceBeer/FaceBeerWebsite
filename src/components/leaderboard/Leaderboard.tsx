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
import { FormControlLabel, FormGroup, Switch } from "@material-ui/core";

type Order = "asc" | "desc";

interface Data {
  name: string;
  bac: number;
  timestamp: Date;
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

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

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

interface LeaderboardProps {
  rows: Data[];
}

function Leaderboard(props: LeaderboardProps): ReactElement {
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("timestamp");
  const [last12, setLast12] = React.useState<boolean>(false);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <FormGroup style={{ float: "right" }}>
        <FormControlLabel
          control={<Switch checked={last12} />}
          label="Last 12 hours"
          onClick={() => setLast12(!last12)}
          labelPlacement={"start"}
        />
      </FormGroup>
      <TableContainer>
        <Table aria-labelledby="facebeertable" size={"medium"}>
          <LeaderboardHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {sortRows(
              props.rows.filter(
                (row) =>
                  !last12 ||
                  Math.abs(new Date().getTime() - row.timestamp.getTime()) /
                    (1000 * 60 * 60) <
                    12
              ),
              order,
              orderBy
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export type { Data };
export { Leaderboard };
