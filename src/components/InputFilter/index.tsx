import { Text, TextInputProps, View } from "react-native";
import { useTheme } from "styled-components/native";
import { MagnifyingGlass } from "phosphor-react-native";

import { ContainerInputRNFilter, InputRNFilter, styleIcon } from "./styles";

interface InputFilterProps extends TextInputProps {}

export function InputFilter({ ...rest }: InputFilterProps) {
  const theme = useTheme();

  return (
    <ContainerInputRNFilter>
      <MagnifyingGlass
        size={24}
        color={theme.colors.gray500}
        style={styleIcon}
      />

      <InputRNFilter placeholderTextColor={theme.colors.gray500} {...rest} />
    </ContainerInputRNFilter>
  );
}
