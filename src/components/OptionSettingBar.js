import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSearchWord,
  updateAroundWord,
} from "../features/searchResult/searchResultSlice";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FindInPageOutlinedIcon from "@material-ui/icons/FindInPageOutlined";
import React, { useState } from "react";

const REGEX = /\S[A-Za-z-ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇ]*/gi;

const OptionSettingBar = () => {
  const [word, setWord] = useState("");
  const [range, setRange] = useState(1);
  const text = useSelector((state) => state.textFile.value);
  const dispatch = useDispatch();

  const onChangeWord = (e) => {
    e.preventDefault();
    setWord(e.target.value);
  };

  const onChangeRange = (e) => {
    e.preventDefault();
    setRange(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const lowerText = text.toLowerCase();
    const myWord = word.trim().toLowerCase();
    if (!text) {
      alert("검색할 파일 내용을 복붙하세욧!");
      return;
    }

    if (!word) {
      alert("검색할 단어를 입력하세욨!");
      return;
    }

    const slicedText = lowerText.match(REGEX);
    const sentences = lowerText.split(/[\n|.|?|!]/gi).filter(String);

    const filteredSentence = sentences.filter((sentence) =>
      sentence.includes(myWord)
    );

    const filtered = slicedText.filter((myText) => myText.includes(myWord));

    const hashText = filtered.reduce((acc, cur) => {
      if (acc[cur]) {
        acc[cur].sum++;
      } else acc[cur] = { sum: 1 };

      return acc;
    }, {});

    const result = {
      word,
      text: hashText,
      range: range,
    };

    dispatch(updateAroundWord(filteredSentence));
    dispatch(updateSearchWord(result));
  };

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        style={{ borderBottom: "1px solid #ededed" }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography
          variant="h5"
          style={{ display: "flex", alignItems: "center" }}
        >
          <FindInPageOutlinedIcon
            fontSize="large"
            style={{ marginRight: "1rem" }}
          />
          검색어 설정
        </Typography>
      </AccordionSummary>
      <AccordionDetails style={{ display: "block", marginTop: "2rem" }}>
        <FormControl style={{ margin: "0 2rem" }}>
          <Grid container spacing={3}>
            <Grid item>
              <TextField
                value={word}
                onChange={onChangeWord}
                variant="outlined"
                label="검색할 단어"
                helperText="전치사 + 명사구 등 문장단위 가능"
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="검색 범위"
                helperText="기본범위 1"
                onChange={onChangeRange}
                value={range}
              />
            </Grid>

            <Grid item>
              <Button
                onClick={onSubmit}
                size="large"
                variant="contained"
                color="primary"
              >
                검색
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};

export default OptionSettingBar;
