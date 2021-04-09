# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Corpus Search Engine Project

코퍼스(Corpus)란?

- 언어학에서 코퍼스 또는 텍스트 코퍼스는 크고 구조화 된 텍스트 집합으로 구성된 언어 리소스로,
  통계 분석 및 가설 테스트, 특정 언어 영역 내에서 발생을 확인하거나 언어 규칙을 검증하는데 사용
  (출처: [위키백과](https://en.wikipedia.org/wiki/Text_corpus))

간단한 텍스트 파일을 대상으로, 사용자가 원하는 옵션으로 텍스트 코퍼스를 검색할 수 있는 웹 사이트

## Features

- React CRA 환경으로 Frontend 구성
- Redux Toolkit으로 전역 상태 관리
- Material UI 사용

## 필수기능

1. 검색하고자 하는 단어 입력 (전치사 + 명사의 전명구 단위도 입력 가능)
2. 검색 단어 기준으로 입력된 범위 내에 존재하는 단어들 모두 검색
3. 검색된 단어를 등장 빈도 수와 해당 단어가 등장한 범위를 테이블 형태로 출력

## Update 내역

### 04.09 Update

1. 검색할 단어 비교 시 기존 100% 일치에서 포함여부로 로직 변경

- 기존 : impfstoff 단어 검색 시 impfstoffe / impfstoffes / -impfstoff 등은 검색 불가
- 변경 : impfstoff 가 포함된 모든 단어 검색 가능

2. 1번과 관련해 상관관계가 적은 단어 목록은 사용자가 직접 제거할 수 있는 기능 추가
