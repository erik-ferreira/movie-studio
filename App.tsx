import { StatusBar, View, LogBox } from "react-native";
import { ThemeProvider } from "styled-components";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

import { Login } from "./src/pages/Login";
import { Loading } from "./src/components/Loading";

import { theme } from "./src/theme/default";

LogBox.ignoreLogs(["AsyncStorage has been extracted"]);

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {!fontsLoaded ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.primary,
          }}
        >
          <Loading />
        </View>
      ) : (
        <Login />
      )}
    </ThemeProvider>
  );
}
