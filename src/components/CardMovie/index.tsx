import { View, Image, Text } from "react-native";
import { Star } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

import { Button } from "../Button";

import blackAdamImg from "../../assets/black-adam.png";

import {
  ContainerCardMovie,
  ImageMovie,
  TitleMovie,
  ContentEvaluation,
  TextEvaluation,
} from "./styles";

export function CardMovie() {
  const theme = useTheme();

  return (
    <ContainerCardMovie>
      <ImageMovie source={blackAdamImg} />

      <TitleMovie>Adão Negro</TitleMovie>

      <ContentEvaluation>
        <TextEvaluation>8.8</TextEvaluation>
        <Star size={20} weight="fill" color={theme.colors.secondary} />
      </ContentEvaluation>

      <Button title="Detalhes" />
    </ContainerCardMovie>
  );
}
