import { Alert } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MovieDTO, ImageProps } from "../dtos/MovieDTO";

import { getMovieDetails, getImagesMovie } from "../requests";

import { Loading } from "../components/Loading";
import { CardMovieDetails } from "../components/CardMovieDetails";
import { SafeAreaBackground } from "../components/SafeAreaBackground";

interface RouteParams {
  movieId: number;
}

export function Detalhes() {
  const route = useRoute();
  const { movieId } = route.params as RouteParams;

  const [movieDetails, setMovieDetails] = useState<MovieDTO>({} as MovieDTO);
  const [loadingMovieDetails, setLoadingMovieDetails] = useState(false);

  const [imagesMovie, setImagesMovie] = useState<ImageProps[]>([]);

  const [moviesFavorites, setMoviesFavorites] = useState<MovieDTO[]>([]);
  const idsMoviesFavorites = moviesFavorites.map((movie) => movie.id);

  async function onLoadMovieDetails() {
    try {
      setLoadingMovieDetails(true);

      const response = await getMovieDetails(movieId.toString());
      const responseImages = await getImagesMovie(movieId.toString());

      if (response.status === 200) {
        setMovieDetails(response.data);
      }

      if (responseImages.status === 200) {
        setImagesMovie(responseImages.data?.backdrops);
      }
    } catch (error) {
      console.log("error", error);
      Alert.alert("Não foi possível buscar os detalhes do filme");
    } finally {
      setLoadingMovieDetails(false);
    }
  }

  async function getMoviesFavorites() {
    const moviesFavorites = await AsyncStorage.getItem(
      "@MOVIE_STUDIO:favorites"
    );
    if (moviesFavorites) {
      setMoviesFavorites(JSON.parse(moviesFavorites));
    }
  }

  async function toggleMovieFavorite() {
    const movieIsFavorite = moviesFavorites.some(
      (movieFavorite) => movieFavorite.id === movieDetails.id
    );
    let listMoviesUpdated: MovieDTO[] = [];
    if (movieIsFavorite) {
      listMoviesUpdated = moviesFavorites.filter(
        (movieFavorite) => movieFavorite.id !== movieDetails.id
      );
    } else {
      listMoviesUpdated = [...moviesFavorites, movieDetails];
    }

    setMoviesFavorites(listMoviesUpdated);
    await AsyncStorage.setItem(
      "@MOVIE_STUDIO:favorites",
      JSON.stringify(listMoviesUpdated)
    );
  }

  useFocusEffect(
    useCallback(() => {
      onLoadMovieDetails();
      getMoviesFavorites();
    }, [movieId])
  );

  return (
    <SafeAreaBackground minimizePadding>
      {loadingMovieDetails ? (
        <Loading />
      ) : (
        <CardMovieDetails
          movie={movieDetails}
          imagesMovie={imagesMovie}
          isMovieFavorite={idsMoviesFavorites.includes(movieDetails?.id)}
          onPressFavorite={toggleMovieFavorite}
        />
      )}
    </SafeAreaBackground>
  );
}
