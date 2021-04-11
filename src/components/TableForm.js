import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";
import { v4 as uuid } from "uuid";
import { makeTableData } from "../utils/functions";

const useStyles = makeStyles({
  table: {
    "& td, & th": {
      textAlign: "center",
    },
  },
  tbcMain: {
    width: "70px",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#ededed",
  },
  tbcAppearance: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    textAlign: "center",
    backgroundColor: "#ededed",
  },
});

const TableForm = ({ range, data }) => {
  const classes = useStyles();
  const [ranges, appearance, hashSetForTableData] = makeTableData(range, data);

  return (
    <>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tbcMain}>등장 빈도</TableCell>
            {ranges.length > 0 &&
              ranges.map((num) => <TableCell key={uuid()}>{num}칸</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {appearance.length > 0 &&
            appearance.map((num) => (
              <TableRow key={uuid()}>
                <TableCell className={classes.tbcAppearance}>{num}</TableCell>
                {Object.values(hashSetForTableData).length > 0 &&
                  Object.values(hashSetForTableData).map((tbcell) => {
                    const tbcInfo = Object.entries(tbcell);
                    let strs = "";
                    for (const [keyword, count] of tbcInfo) {
                      if (num === count) {
                        strs += keyword + "\n";
                      }
                    }
                    return (
                      <TableCell key={uuid()}>
                        {strs.split("\n").map((line) => (
                          <span key={uuid()}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </TableCell>
                    );
                  })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {!appearance.length && (
        <Alert style={{ margin: "2rem 0" }} severity="warning">
          <AlertTitle>
            <strong>아이고난!! 🤣</strong>
          </AlertTitle>
          검색 결과가 없습니다!
        </Alert>
      )}
    </>
  );
};

export default TableForm;
