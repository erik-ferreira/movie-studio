import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { SignOut, HeartStraight, CaretLeft } from "phosphor-react-native";

import { auth } from "../../services/firebase";

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
  isButtonBackInLeft?: boolean;
}

export function Header({
  title,
  hideButtonLeft = false,
  hideButtonRight = false,
  isButtonBackInLeft = false,
}: HeaderProps) {
  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToPagesFavorites() {
    navigation.navigate("Favoritos");
  }

  async function handleSignOut() {
    await signOut(auth);
    navigation.navigate("Login");
  }

  return (
    <ContainerHeader>
      <ContentHeader>
        {hideButtonLeft ? (
          <EmptyBoxSpace />
        ) : isButtonBackInLeft ? (
          <ButtonIcon icon={CaretLeft} onPress={handleNavigateBack} />
        ) : (
          <ButtonIcon icon={SignOut} onPress={handleSignOut} />
        )}

        <TitleHeader>{title}</TitleHeader>

        {hideButtonRight ? (
          <EmptyBoxSpace />
        ) : (
          <ButtonIcon
            icon={HeartStraight}
            iconProps={{ weight: "fill" }}
            onPress={handleNavigateToPagesFavorites}
          />
        )}
      </ContentHeader>
    </ContainerHeader>
  );
}
