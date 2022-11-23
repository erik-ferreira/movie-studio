import { Text } from "react-native";

import { CardMovieDetails } from "../components/CardMovieDetails";
import { SafeAreaBackground } from "../components/SafeAreaBackground";

export function Detalhes() {
  return (
    <SafeAreaBackground minimizePadding isScreenMovies>
      <CardMovieDetails />
    </SafeAreaBackground>
  );
}
