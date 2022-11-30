import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { View, FlatList, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MovieDTO } from "../dtos/MovieDTO";

import { CardMovie } from "../components/CardMovie";
import { SafeAreaBackground } from "../components/SafeAreaBackground";

export function Favoritos() {
  const { colors } = useTheme();

  const [moviesFavorites, setMoviesFavorites] = useState<MovieDTO[]>([]);

  async function getMoviesFavorites() {
    const moviesFavorites = await AsyncStorage.getItem(
      "@MOVIE_STUDIO:favorites"
    );

    if (moviesFavorites) {
      setMoviesFavorites(JSON.parse(moviesFavorites));
    }
  }

  async function handleRemoveMovieFavorite(movie: MovieDTO) {
    const listMoviesUpdated = moviesFavorites.filter(
      (movieFavorite) => movieFavorite.id !== movie.id
    );

    setMoviesFavorites(listMoviesUpdated);

    await AsyncStorage.setItem(
      "@MOVIE_STUDIO:favorites",
      JSON.stringify(listMoviesUpdated)
    );
  }

  useEffect(() => {
    getMoviesFavorites();
  }, []);

  return (
    <SafeAreaBackground minimizePadding isScreenMovies>
      <FlatList
        data={moviesFavorites}
        keyExtractor={(movie) => movie?.id?.toString()}
        renderItem={({ item: movie }) => (
          <CardMovie
            movie={movie}
            isMovieFavorite
            onPressFavorite={() => handleRemoveMovieFavorite(movie)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        ItemSeparatorComponent={() => (
          <View style={{ width: "100%", height: 10 }} />
        )}
        ListEmptyComponent={() => (
          <Text
            style={{ color: colors.gray500, fontSize: 16, textAlign: "center" }}
          >
            Você ainda não favoritou nenhum filme!
          </Text>
        )}
      />
    </SafeAreaBackground>
  );
}
