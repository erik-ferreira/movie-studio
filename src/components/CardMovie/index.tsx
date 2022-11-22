import { View, Image, Text } from "react-native";
import { Star, HeartStraight } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

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

export function CardMovie() {
  const theme = useTheme();

  return (
    <ContainerCardMovie>
      <ButtonIcon
        icon={HeartStraight}
        iconProps={{ weight: "fill", color: theme.colors.secondary }}
        style={{ position: "absolute", right: 8, top: 8, zIndex: 1 }}
      />

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
