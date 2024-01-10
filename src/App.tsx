import {
  createTheme,
  localStorageColorSchemeManager,
  MantineProvider,
} from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const colorSchemeManager = localStorageColorSchemeManager({
  key: "my-app-color-scheme",
});

function App() {
  return (
    <MantineProvider
      theme={theme}
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme="dark"
    >
      <BrowserRouter basename="/cobbelmon-data-client/">
        <Routes>
          <Route path="/" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
