import { useTheme } from "styled-components/native";
import { Star, HeartStraight } from "phosphor-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MovieDTO } from "../../dtos/MovieDTO";

import { getUrlMovie } from "../../requests";

import { Button } from "../Button";
import { ButtonIcon } from "../ButtonIcon";

import {
  ContainerCardMovie,
  ImageMovie,
  TitleMovie,
  ContentEvaluation,
  TextEvaluation,
} from "./styles";
import { useState } from "react";

interface CardMovieProps {
  movie: MovieDTO;
}

export function CardMovie({ movie }: CardMovieProps) {
  const theme = useTheme();

  const [idsMoviesFavorites, setIdsMoviesFavorites] = useState<number[]>([]);

  function toggleMovieFavorite() {
    const movieId = movie.id;
    const movieIsFavorite = idsMoviesFavorites.includes(movieId);

    if (movieIsFavorite) {
      const newIdsMoviesFavorites = idsMoviesFavorites.filter(
        (movie) => movie !== movieId
      );

      setIdsMoviesFavorites(newIdsMoviesFavorites);
    } else {
      setIdsMoviesFavorites((prevState) => [...prevState, movieId]);
    }
  }
  const weightIcon = idsMoviesFavorites.includes(movie.id) ? "fill" : "regular";

  return (
    <ContainerCardMovie>
      <ButtonIcon
        onPress={toggleMovieFavorite}
        icon={HeartStraight}
        iconProps={{ weight: weightIcon, color: theme.colors.secondary }}
        style={{ position: "absolute", right: 8, top: 8, zIndex: 1 }}
      />

      <ImageMovie source={{ uri: getUrlMovie(movie.backdrop_path) }} />

      <TitleMovie numberOfLines={1}>{movie.title}</TitleMovie>

      <ContentEvaluation>
        <TextEvaluation>{movie.vote_average}</TextEvaluation>
        <Star size={20} weight="fill" color={theme.colors.secondary} />
      </ContentEvaluation>

      <Button title="Detalhes" />
    </ContainerCardMovie>
  );
}
