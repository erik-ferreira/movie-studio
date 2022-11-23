import { TouchableOpacityProps } from "react-native";

import { ContainerButton, ContainerButton2, TextButton, TextButton2  } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <ContainerButton activeOpacity={0.7} {...rest}>
      <TextButton>{title}</TextButton>
    </ContainerButton>
  );
}

export function Button2({ title, ...rest }: ButtonProps) {
  return (
    <ContainerButton2 activeOpacity={0.7} {...rest}>
      <TextButton2>{title}</TextButton2>
    </ContainerButton2>
  );
}
