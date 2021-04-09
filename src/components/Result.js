import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import React, { useEffect, useState } from "react";

const Result = () => {
  const searchWords = useSelector((state) => state.searchResult.searchWords);
  const [wordsArr, setWordsArr] = useState("");
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const initialWordsArr = Object.entries(searchWords);
    const initialSum = Object.values(searchWords).reduce(
      (a, b) => a + b.sum,
      0
    );
    setWordsArr(initialWordsArr);
    setSum(initialSum);
  }, [searchWords]);

  const onClickMinusBtn = (e) => {
    const id = e.currentTarget.id;
    const nextWordsArr = wordsArr.filter((word) => word[0] !== id);
    const nextSum = nextWordsArr.reduce((a, b) => a + b[1].sum, 0);
    setWordsArr(nextWordsArr);
    setSum(nextSum);
  };

  return (
    <Accordion>
      <AccordionSummary
        style={{ borderBottom: "1px solid #ededed" }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography
          variant="h5"
          style={{ display: "flex", alignItems: "center" }}
        >
          <DescriptionOutlinedIcon
            fontSize="large"
            style={{ marginRight: "1rem" }}
          />
          검색 결과
        </Typography>
      </AccordionSummary>

      <AccordionDetails style={{ display: "block", marginTop: "2rem" }}>
        {wordsArr.length ? (
          wordsArr.map((word) => (
            <Grid
              container
              spacing={5}
              key={word}
              style={{ alignItems: "center" }}
            >
              <IconButton
                onClick={onClickMinusBtn}
                id={word[0]}
                style={{ marginLeft: "2rem" }}
              >
                <RemoveCircleOutlineIcon color="secondary" fontSize="large" />
              </IconButton>

              <Grid item>
                <TextField
                  value={word[0]}
                  label="검색결과"
                  variant="outlined"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={word[1].sum}
                  label="등장빈도"
                  variant="outlined"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          ))
        ) : (
          <Alert style={{ margin: "0 2rem" }} severity="warning">
            <AlertTitle>
              <strong>아이고난!! 🤣</strong>
            </AlertTitle>
            검색 결과가 없습니다!
          </Alert>
        )}

        <Divider style={{ margin: "2rem" }} />

        <Grid
          container
          style={{ justifyContent: "flex-end", padding: "0 2rem" }}
        >
          <Grid item>
            <TextField
              value={sum}
              label="총합"
              variant="outlined"
              inputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        <Typography
          style={{ marginTop: "3rem", marginLeft: "2rem", fontWeight: "bold" }}
          variant="h6"
        >
          검색어 이전 등장 단어 목록
        </Typography>
        <Box my={1} mx="2rem">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>등장 빈도</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
                <TableCell>5</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>werden</TableCell>
                <TableCell>Heute</TableCell>
                <TableCell>Tag</TableCell>
                <TableCell>guten</TableCell>
                <TableCell>Hallo</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>werden</TableCell>
                <TableCell>Heute</TableCell>
                <TableCell>Tag</TableCell>
                <TableCell>guten</TableCell>
                <TableCell>Hallo</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>werden</TableCell>
                <TableCell>Heute</TableCell>
                <TableCell>Tag</TableCell>
                <TableCell>guten</TableCell>
                <TableCell>Hallo</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>4</TableCell>
                <TableCell>werden</TableCell>
                <TableCell>Heute</TableCell>
                <TableCell>Tag</TableCell>
                <TableCell>guten</TableCell>
                <TableCell>Hallo</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        <Typography
          style={{
            marginTop: "2.5rem",
            marginLeft: "2rem",
            fontWeight: "bold",
          }}
          variant="h6"
        >
          검색어 이후 등장 단어 목록
        </Typography>

        <Box my={1} mx="2rem">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>등장 빈도</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
                <TableCell>5</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>werden</TableCell>
                <TableCell>Heute</TableCell>
                <TableCell>Tag</TableCell>
                <TableCell>guten</TableCell>
                <TableCell>Hallo</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>werden</TableCell>
                <TableCell>Heute</TableCell>
                <TableCell>Tag</TableCell>
                <TableCell>guten</TableCell>
                <TableCell>Hallo</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>werden</TableCell>
                <TableCell>Heute</TableCell>
                <TableCell>Tag</TableCell>
                <TableCell>guten</TableCell>
                <TableCell>Hallo</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>4</TableCell>
                <TableCell>werden</TableCell>
                <TableCell>Heute</TableCell>
                <TableCell>Tag</TableCell>
                <TableCell>guten</TableCell>
                <TableCell>Hallo</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Result;
