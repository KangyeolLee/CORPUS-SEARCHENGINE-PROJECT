import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { update } from "../features/textFile/textFileSlice";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import React, { useEffect, useState } from "react";

const TextInput = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(update(text));
  }, [dispatch, text]);

  const onChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const onPaste = (e) => {
    setText(e.clipboardData.getData("Text"));
    dispatch(update(text));
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
          <FileCopyOutlinedIcon
            fontSize="large"
            style={{ marginRight: "1rem" }}
          />
          검색 파일 업로드
        </Typography>
      </AccordionSummary>
      <AccordionDetails style={{ display: "block", marginTop: "2rem" }}>
        <TextField
          value={text}
          onChange={onChange}
          onPaste={onPaste}
          fullWidth
          rows={15}
          label="텍스트"
          placeholder="검사할 텍스트를 붙여넣으세요."
          multiline
          variant="filled"
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default TextInput;
