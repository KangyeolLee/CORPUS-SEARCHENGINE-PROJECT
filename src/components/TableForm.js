import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { v4 as uuid } from "uuid";

const TableForm = ({ range, data }) => {
  const ranges = [];
  const hashSetForTableData = {};
  for (let i = 1; i <= range; i++) {
    ranges.push(i);
    hashSetForTableData[i] = {};
  }

  const tableData = Object.values(data);
  const frequencyRange = [];
  for (let i = 0; i < tableData.length; i++) {
    for (const keyword of tableData[i]) {
      hashSetForTableData[i + 1][keyword] = hashSetForTableData[i + 1][keyword]
        ? hashSetForTableData[i + 1][keyword] + 1
        : 1;
    }
    frequencyRange.push(
      ...[...new Set(Object.values(hashSetForTableData[i + 1]))]
    );
  }

  frequencyRange.sort((a, b) => a - b);
  const exceptOneFrequency = [...new Set(frequencyRange)];
  // exceptOneFrequency.shift();
  const appearance = exceptOneFrequency;

  // console.log(appearance);

  // console.log("데이터 칸 수 : ", Object.values(hashSetForTableData));
  // console.log("등장빈도 : ", appearance);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>등장 빈도</TableCell>
          {ranges.length > 0 &&
            ranges.map((num) => <TableCell key={uuid()}>{num}칸</TableCell>)}
        </TableRow>
      </TableHead>
      <TableBody>
        {appearance.length > 0 &&
          appearance.map((num) => (
            <TableRow key={uuid()}>
              <TableCell>{num}</TableCell>
              {Object.values(hashSetForTableData).length > 0 &&
                Object.values(hashSetForTableData).map((tbcell) => {
                  const tbcInfo = Object.entries(tbcell);
                  let strs = "";
                  for (const [keyword, count] of tbcInfo) {
                    if (num === count) {
                      strs += keyword + " ";
                    }
                  }
                  return (
                    <TableCell key={uuid()}>
                      {strs.split(" ").map((line) => (
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
  );
};

export default TableForm;
