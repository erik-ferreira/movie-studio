import { useNavigation } from "@react-navigation/native";
import { SignOut, HeartStraight } from "phosphor-react-native";

import { ButtonIcon } from "../ButtonIcon";

import {
  ContainerHeader,
  ContentHeader,
  TitleHeader,
  EmptyBoxSpace,
} from "./styles";

interface HeaderProps {
  title: string;
  hideButtonLeft?: boolean;
  hideButtonRight?: boolean;
}

export function Header({
  title,
  hideButtonLeft = false,
  hideButtonRight = false,
}: HeaderProps) {
  const navigation = useNavigation();

  return (
    <ContainerHeader>
      <ContentHeader>
        {hideButtonLeft ? <EmptyBoxSpace /> : <ButtonIcon icon={SignOut} />}

        <TitleHeader>{title}</TitleHeader>

        {hideButtonRight ? (
          <EmptyBoxSpace />
        ) : (
          <ButtonIcon icon={HeartStraight} iconProps={{ weight: "fill" }} />
        )}
      </ContentHeader>
    </ContainerHeader>
  );
}
