import { CaretLeft, Export } from "phosphor-react-native";

import { ButtonIcon } from "../ButtonIcon";

import {
  ContainerHeader,
  ContentHeader,
  TitleHeader,
  EmptyBoxSpace,
} from "./styles";

interface Props {
  title: string;
  showBackButton?: boolean;
  showShareButton?: boolean;
  onShare?: () => void;
}

export function Header({
  title,
  showBackButton = true,
  showShareButton = false,
  onShare,
}: Props) {
  return (
    <ContainerHeader>
      <ContentHeader>
        {showBackButton ? <ButtonIcon icon={CaretLeft} /> : <EmptyBoxSpace />}

        <TitleHeader>{title}</TitleHeader>

        {showShareButton ? (
          <ButtonIcon icon={Export} onPress={onShare} />
        ) : (
          <EmptyBoxSpace />
        )}
      </ContentHeader>
    </ContainerHeader>
  );
}
