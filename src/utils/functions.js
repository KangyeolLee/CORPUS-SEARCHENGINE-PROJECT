import { makeREGEXwithInput, REGEX_SENTENCE } from "./regex";

export const filterOriginalText = (text, word, range) => {
  const lowerText = text.toLowerCase();
  const myWord = word.trim().toLowerCase();

  // 입력된 word 가 포함된 문장 선별
  const sentences = lowerText.split(REGEX_SENTENCE).filter(String);
  const filteredSentence = sentences.filter((sentence) =>
    sentence.includes(myWord)
  );

  // 입력된 text 파일에서 주어진 word 가 포함된 단어 등장빈도 측정
  const REGEX_WORD = makeREGEXwithInput(myWord);
  const slicedText = lowerText.match(REGEX_WORD);
  const hashText = slicedText?.reduce((acc, cur) => {
    if (acc[cur]) {
      acc[cur].sum++;
    } else acc[cur] = { sum: 1 };

    return acc;
  }, {});

  const result = {
    word,
    text: hashText,
    range,
  };

  return [filteredSentence, result];
};

export const makeTableData = (range, data) => {
  const ranges = [];
  const hashSetForTableData = {};

  for (let i = 1; i <= range; i++) {
    ranges.push(i);
    hashSetForTableData[i] = {};
  }

  const tableData = Object.values(data);
  const frequencyRange = [];
  // 단어가 등장한 문장에서 주어진 range 범위 내에 어떤 단어가 몇 번의 빈도로 등장하는지에 대한 정보를 저장
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

  if (exceptOneFrequency[0] === 1) exceptOneFrequency.shift(); // 1번 등장한 단어는 테이블 출력에서 제외

  return [ranges, exceptOneFrequency, hashSetForTableData];
};

export const filterTextForTableData = (
  word,
  range,
  sentences,
  wordsInPrev,
  wordsInNext
) => {
  // 입력된 word가 포함된 문장별로 세분화
  const myWord = word.toLowerCase();
  const nospaceWord = myWord.split(" ").join("");

  for (const sentence of sentences) {
    const replacedSentence = sentence.replaceAll(myWord, nospaceWord);
    const splitedSentence = replacedSentence.split(" ").filter(String);
    const indexes = splitedSentence.reduce((acc, cur, idx) => {
      if (cur.includes(nospaceWord)) acc.push(idx);
      return acc;
    }, []);

    // 세분화 된 문장에서 입력된 word의 index를 기준으로 이전/이후 범위 탐색
    for (const idx of indexes) {
      const start = idx - range * 1 >= 0 ? idx - range * 1 : 0;
      const end = idx + range * 1 + 1;
      const prevColumns = splitedSentence.slice(start, idx);
      const nextColumns = splitedSentence.slice(idx + 1, end);

      prevColumns.reverse(); // 이전/이후 컬럼의 데이터 탐색 방향 통일

      // 선택 단어 기준 이전에 위치한 단어들의 정보 생성 => [떨어진 칸 수] : { [단어] : 등장횟수 }
      for (let i = 0; i < prevColumns.length; i++) {
        if (wordsInPrev[i + 1]) {
          wordsInPrev[i + 1].push(prevColumns[i]);
        } else {
          wordsInPrev[i + 1] = [prevColumns[i]];
        }
      }

      // 선택 단어 기준 이후에 위치한 단어들의 정보 생성 => [떨어진 칸 수] : { [단어] : 등장횟수 }
      for (let i = 0; i < nextColumns.length; i++) {
        if (wordsInNext[i + 1]) {
          wordsInNext[i + 1].push(nextColumns[i]);
        } else {
          wordsInNext[i + 1] = [nextColumns[i]];
        }
      }
    }
  }
};
