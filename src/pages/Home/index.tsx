import { useEffect, useState, useCallback } from "react";
import { View, FlatList, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MovieDTO } from "../../dtos/MovieDTO";

import { getMoviesUpComing } from "../../requests";

import { CardMovie } from "../../components/CardMovie";
import { InputFilter } from "../../components/InputFilter";
import { SafeAreaBackground } from "../../components/SafeAreaBackground";

export function Home() {
  const [movies, setMovies] = useState<MovieDTO[]>([]);
  const [moviesFavorites, setMoviesFavorites] = useState<MovieDTO[]>([]);
  const idsMoviesFavorites = moviesFavorites.map((movie) => movie.id);

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

  async function toggleMovieFavorite(movie: MovieDTO) {
    const movieIsFavorite = moviesFavorites.some(
      (movieFavorite) => movieFavorite.id === movie.id
    );
    let listMoviesUpdated: MovieDTO[] = [];
    if (movieIsFavorite) {
      listMoviesUpdated = moviesFavorites.filter(
        (movieFavorite) => movieFavorite.id !== movie.id
      );
    } else {
      listMoviesUpdated = [...moviesFavorites, movie];
    }

    setMoviesFavorites(listMoviesUpdated);
    await AsyncStorage.setItem(
      "@MOVIE_STUDIO:favorites",
      JSON.stringify(listMoviesUpdated)
    );
  }

  async function getMoviesFavorites() {
    const moviesFavorites = await AsyncStorage.getItem(
      "@MOVIE_STUDIO:favorites"
    );
    if (moviesFavorites) {
      setMoviesFavorites(JSON.parse(moviesFavorites));
    }
  }

  useFocusEffect(
    useCallback(() => {
      onLoadMoviesUpComing();
      getMoviesFavorites();
    }, [])
  );

  return (
    <SafeAreaBackground minimizePadding isScreenMovies>
      <InputFilter placeholder="Pesquisar..." />

      <FlatList
        data={movies}
        keyExtractor={(movie) => movie.id.toString()}
        renderItem={({ item: movie }) => (
          <CardMovie
            movie={movie}
            isMovieFavorite={idsMoviesFavorites.includes(movie.id)}
            onPressFavorite={() => toggleMovieFavorite(movie)}
          />
        )}
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
