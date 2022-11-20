import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { TextButton } from "./styles";

interface TextNavigateProps extends TouchableOpacityProps {
  label: string;
}

export function TextNavigate({ label, ...rest }: TextNavigateProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      <TextButton>{label}</TextButton>
    </TouchableOpacity>
  );
}
