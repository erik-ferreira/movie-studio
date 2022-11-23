import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { Star, HeartStraight } from "phosphor-react-native";

import { MovieDTO } from "../../dtos/MovieDTO";

import { getUrlMovie } from "../../requests";

import { Button } from "../Button";
import { ButtonIcon } from "../ButtonIcon";

import {
  ContainerCardMovieDetails,
  ContentHeaderCard,
  ImageMovie,
  BlockRightHeader,
  Label,
  Value,
  TitleMovie,
  ContentEvaluation,
  TextEvaluation,
} from "./styles";

interface CardMovieDetailsProps {
  // movie: MovieDTO;
  // isMovieFavorite: boolean;
  // onPressFavorite?: () => void;
  // onPressDetails?: () => void;
}

export function CardMovieDetails({}: // movie,
// isMovieFavorite,
// onPressFavorite,
// onPressDetails,
CardMovieDetailsProps) {
  const theme = useTheme();
  const navigation = useNavigation();

  const weightIcon = true ? "fill" : "regular";

  return (
    <ContainerCardMovieDetails>
      <TitleMovie>Adão Negro</TitleMovie>

      <ButtonIcon
        // onPress={onPressFavorite}
        icon={HeartStraight}
        iconProps={{ weight: weightIcon, color: theme.colors.secondary }}
        style={{ position: "absolute", right: 8, top: 8, zIndex: 1 }}
      />

      <ContentHeaderCard>
        <ImageMovie
          source={{
            uri: "https://image.tmdb.org/t/p/w342/9z256FFPDsL7kSVJ9oyLELaN1ph.jpg",
          }}
          resizeMode="contain"
        />

        <BlockRightHeader>
          <Label>Data de lançamento:</Label>
          <Value>20/10/2022</Value>

          <Label>Direção</Label>
          <Value>Jaume</Value>

          <Label>Roteiro:</Label>
          <Value>Adam Sztykiel e Rory Haines</Value>

          <Label>Elenco:</Label>
          <Value>Dwayne Johnson, Aldis Hodge e Pierce Brosman</Value>

          <ContentEvaluation>
            <Label>Avaliação:</Label>

            <TextEvaluation>7.8</TextEvaluation>
            <Star size={20} weight="fill" color={theme.colors.secondary} />
          </ContentEvaluation>
        </BlockRightHeader>
      </ContentHeaderCard>
    </ContainerCardMovieDetails>
  );
}
