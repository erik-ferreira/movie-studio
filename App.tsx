import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";

import { Login } from "./src/pages/Login";
import { theme } from "./src/theme/default";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Login />
    </ThemeProvider>
  );
}
