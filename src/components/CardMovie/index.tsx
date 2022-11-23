import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { Star, HeartStraight } from "phosphor-react-native";

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

interface CardMovieProps {
  movie: MovieDTO;
  isMovieFavorite: boolean;
  onPressFavorite?: () => void;
  onPressDetails?: () => void;
}

export function CardMovie({
  movie,
  isMovieFavorite,
  onPressFavorite,
  onPressDetails,
}: CardMovieProps) {
  const theme = useTheme();
  const navigation = useNavigation();

  const weightIcon = isMovieFavorite ? "fill" : "regular";

  function handleNavigateToPageDetails() {
    console.log(movie.id);
    navigation.navigate("Detalhes");
  }

  return (
    <ContainerCardMovie>
      <ButtonIcon
        onPress={onPressFavorite}
        icon={HeartStraight}
        iconProps={{ weight: weightIcon, color: theme.colors.secondary }}
        style={{ position: "absolute", right: 8, top: 8, zIndex: 1 }}
      />

      <ImageMovie source={{ uri: getUrlMovie(movie.poster_path) }} />

      <TitleMovie numberOfLines={1}>{movie.title}</TitleMovie>

      <ContentEvaluation>
        <TextEvaluation>{movie.vote_average}</TextEvaluation>
        <Star size={20} weight="fill" color={theme.colors.secondary} />
      </ContentEvaluation>

      <Button title="Detalhes" onPress={handleNavigateToPageDetails} />
    </ContainerCardMovie>
  );
}
