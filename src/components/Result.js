import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import React, { useEffect, useState } from "react";
import TableForm from "./TableForm";

const Result = () => {
  const sentences = useSelector((state) => state.searchResult.aroundWords);
  const { word, text, range } = useSelector(
    (state) => state.searchResult.searchWords
  );
  const [wordsArr, setWordsArr] = useState("");
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const initialWordsArr = text ? Object.entries(text) : "";
    const initialSum = text
      ? Object.values(text).reduce((a, b) => a + b.sum, 0)
      : 0;
    setWordsArr(initialWordsArr);
    setSum(initialSum);
  }, [text]);

  const wordsInPrev = {};
  const wordsInNext = {};

  for (const sentence of sentences) {
    const splitedSentence = sentence.split(" ").filter(String);
    const indexes = splitedSentence.reduce((acc, cur, idx) => {
      if (cur.includes(word)) acc.push(idx);
      return acc;
    }, []);

    for (const idx of indexes) {
      const start = idx - range * 1 >= 0 ? idx - range * 1 : 0;
      const end = idx + range * 1 + 1;
      const prevColumns = splitedSentence.slice(start, idx);
      const nextColumns = splitedSentence.slice(idx + 1, end);

      prevColumns.reverse();

      for (let i = 0; i < prevColumns.length; i++) {
        if (wordsInPrev[i + 1]) {
          wordsInPrev[i + 1].push(prevColumns[i]);
        } else {
          wordsInPrev[i + 1] = [prevColumns[i]];
        }
      }

      for (let i = 0; i < nextColumns.length; i++) {
        if (wordsInNext[i + 1]) {
          wordsInNext[i + 1].push(nextColumns[i]);
        } else {
          wordsInNext[i + 1] = [nextColumns[i]];
        }
      }
    }
  }

  console.log(wordsInPrev);

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
          <TableForm range={range} data={wordsInPrev} />
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
          <TableForm range={range} data={wordsInNext} />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Result;
