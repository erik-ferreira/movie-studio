import { Alert } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import { MovieDTO } from "../dtos/MovieDTO";

import { getMovieDetails } from "../requests";

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

  async function onLoadMovieDetails() {
    try {
      setLoadingMovieDetails(true);

      const response = await getMovieDetails(movieId.toString());

      if (response.status === 200) {
        setMovieDetails(response.data);
      }
    } catch (error) {
      console.log("error", error);
      Alert.alert("Não foi possível buscar os detalhes do filme");
    } finally {
      setLoadingMovieDetails(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      onLoadMovieDetails();
    }, [movieId])
  );

  return (
    <SafeAreaBackground minimizePadding isScreenMovies>
      {loadingMovieDetails ? (
        <Loading />
      ) : (
        <CardMovieDetails movie={movieDetails} />
      )}
    </SafeAreaBackground>
  );
}
