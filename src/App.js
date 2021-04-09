import { Box, Container, Typography } from "@material-ui/core";
import "./app.css";
import OptionSettingBar from "./components/OptionSettingBar";
import Result from "./components/Result";
import TextInput from "./components/TextInput";

function App() {
  return (
    <Container maxWidth="md">
      <Box my={10}>
        <Typography align="center" variant="h3" component="h1">
          Corpus Search Engine
        </Typography>
      </Box>

      <OptionSettingBar />
      <Result />
      <TextInput />
    </Container>
  );
}

export default App;
