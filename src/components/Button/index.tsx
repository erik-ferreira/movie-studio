import { TouchableOpacityProps, ActivityIndicator } from "react-native";

import {
  ContainerButton,
  ContainerButton2,
  TextButton,
  TextButton2,
} from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

export function Button({ title, loading, ...rest }: ButtonProps) {
  return (
    <ContainerButton activeOpacity={0.7} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <TextButton>{title}</TextButton>
      )}
    </ContainerButton>
  );
}

export function Button2({ title, loading, ...rest }: ButtonProps) {
  return (
    <ContainerButton2 activeOpacity={0.7} {...rest}>
      <TextButton2>{title}</TextButton2>
    </ContainerButton2>
  );
}
