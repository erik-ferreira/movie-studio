import { View, Image, Text } from "react-native";
import { Star, HeartStraight } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

import { MovieDTO } from "../../dtos/MovieDTO";

import { getUrlMovie } from "../../requests";

import { Button } from "../Button";
import { ButtonIcon } from "../ButtonIcon";

import blackAdamImg from "../../assets/black-adam.png";

import {
  ContainerCardMovie,
  ImageMovie,
  TitleMovie,
  ContentEvaluation,
  TextEvaluation,
} from "./styles";

interface CardMovieProps {
  movie: MovieDTO;
}

export function CardMovie({ movie }: CardMovieProps) {
  const theme = useTheme();

  return (
    <ContainerCardMovie>
      <ButtonIcon
        icon={HeartStraight}
        iconProps={{ weight: "fill", color: theme.colors.secondary }}
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
