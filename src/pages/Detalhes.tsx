import { Alert } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";

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

  useFocusEffect(
    useCallback(() => {
      onLoadMovieDetails();
    }, [movieId])
  );

  return (
    <SafeAreaBackground minimizePadding>
      {loadingMovieDetails ? (
        <Loading />
      ) : (
        <CardMovieDetails movie={movieDetails} imagesMovie={imagesMovie} />
      )}
    </SafeAreaBackground>
  );
}
