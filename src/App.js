import { Box, Container, Typography } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import "./app.css";
import OptionSettingBar from "./components/OptionSettingBar";
import Result from "./components/Result";
import TextInput from "./components/TextInput";

const theme = createMuiTheme({
  status: {
    danger: orange[500],
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box my={10}>
          <Typography align="center" variant="h3" component="h1">
            Corpus Search Engine
          </Typography>
          <Typography align="center" variant="h5" component="h1">
            optimized in German (DEUTSCH)
          </Typography>
        </Box>

        <OptionSettingBar />
        <Result />
        <TextInput />
      </Container>
    </ThemeProvider>
  );
}

export default App;
