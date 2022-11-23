import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { Star, HeartStraight } from "phosphor-react-native";

import { MovieDTO } from "../../dtos/MovieDTO";

import { getUrlMovie } from "../../requests";

import { Button } from "../Button";
import { ButtonIcon } from "../ButtonIcon";

import { fixDateMovie } from "../../utils";

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
  ContentSectionButtons,
  ButtonSection,
  TextButtonSection,
  SinopseText,
} from "./styles";

import { useState } from "react";

interface CardMovieDetailsProps {
  movie: MovieDTO;
  // isMovieFavorite: boolean;
  // onPressFavorite?: () => void;
  // onPressDetails?: () => void;
}

export function CardMovieDetails({ movie }: CardMovieDetailsProps) {
  // isMovieFavorite,
  // onPressFavorite,
  // onPressDetails,

  const theme = useTheme();
  const navigation = useNavigation();

  const weightIcon = true ? "fill" : "regular";
  const release_date = movie?.release_date
    ? fixDateMovie(movie?.release_date)
    : "";
  const formatGenres = movie?.genres?.map((genre) => genre.name).join(", ");
  const formatCompanies = movie?.production_companies
    ?.map((companie) => companie.name)
    .join(", ");

  const [sectionSelected, setSectionSelected] = useState<"sinopse" | "gallery">(
    "sinopse"
  );

  return (
    <ContainerCardMovieDetails>
      <TitleMovie>{movie.title}</TitleMovie>

      <ButtonIcon
        icon={HeartStraight}
        iconProps={{ weight: weightIcon, color: theme.colors.secondary }}
        style={{ position: "absolute", right: 16, top: 16, zIndex: 1 }}
      />

      <ContentHeaderCard>
        <ImageMovie
          source={{
            uri: getUrlMovie(movie.poster_path),
          }}
          resizeMode="contain"
        />

        <BlockRightHeader>
          <Label>Data de lançamento:</Label>
          <Value>{release_date}</Value>

          <Label>Gêneros</Label>
          <Value>{formatGenres}</Value>

          <Label>Empresas:</Label>
          <Value>{formatCompanies}</Value>

          <ContentEvaluation>
            <Label>Avaliação:</Label>

            <TextEvaluation>{movie.vote_average}</TextEvaluation>
            <Star size={20} weight="fill" color={theme.colors.secondary} />
          </ContentEvaluation>
        </BlockRightHeader>
      </ContentHeaderCard>

      <ContentSectionButtons>
        <ButtonSection
          onPress={() => setSectionSelected("sinopse")}
          isSelected={sectionSelected === "sinopse"}
        >
          <TextButtonSection isSelected={sectionSelected === "sinopse"}>
            Sinopse
          </TextButtonSection>
        </ButtonSection>

        <ButtonSection
          onPress={() => setSectionSelected("gallery")}
          isSelected={sectionSelected === "gallery"}
        >
          <TextButtonSection isSelected={sectionSelected === "gallery"}>
            Galeria
          </TextButtonSection>
        </ButtonSection>
      </ContentSectionButtons>

      {sectionSelected === "sinopse" && (
        <SinopseText>{movie.overview}</SinopseText>
      )}
    </ContainerCardMovieDetails>
  );
}