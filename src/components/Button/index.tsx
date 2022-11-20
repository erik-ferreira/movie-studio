import { TouchableOpacityProps } from "react-native";

import { ContainerButton, TextButton } from "./styles";

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
