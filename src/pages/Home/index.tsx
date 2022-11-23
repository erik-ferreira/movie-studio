import { useEffect, useState } from "react";
import { View, FlatList, Alert } from "react-native";

import { MovieDTO } from "../../dtos/MovieDTO";

import { getMoviesUpComing } from "../../requests";

import { CardMovie } from "../../components/CardMovie";
import { InputFilter } from "../../components/InputFilter";
import { SafeAreaBackground } from "../../components/SafeAreaBackground";

export function Home() {
  const list = [1, 2, 3, 4, 5, 6];

  const [movies, setMovies] = useState<MovieDTO[]>([]);

  async function onLoadMoviesUpComing() {
    try {
      const response = await getMoviesUpComing();

      if (response.status === 200) {
        setMovies(response.data.results);
      }
    } catch (error) {
      console.log("error", error);
      Alert.alert("Não foi possível buscar os filmes");
    }
  }

  useEffect(() => {
    onLoadMoviesUpComing();
  }, []);

  return (
    <SafeAreaBackground minimizePadding isScreenMovies>
      <InputFilter placeholder="Pesquisar..." />

      <FlatList
        data={movies}
        keyExtractor={(movie) => movie.id.toString()}
        renderItem={({ item: movie }) => <CardMovie movie={movie} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          marginTop: 10,
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 20,
        }}
        ItemSeparatorComponent={() => (
          <View style={{ width: "100%", height: 10 }} />
        )}
      />
    </SafeAreaBackground>
  );
}
