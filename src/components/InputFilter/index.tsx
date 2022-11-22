import { Text, TextInput, View } from "react-native";
import { useTheme } from "styled-components/native";
import { MagnifyingGlass } from "phosphor-react-native";

import { ContainerInputRNFilter, InputRNFilter, styleIcon } from "./styles";

export function InputFilter() {
  const theme = useTheme();

  return (
    <ContainerInputRNFilter>
      <MagnifyingGlass
        size={24}
        color={theme.colors.gray500}
        style={styleIcon}
      />

      <InputRNFilter />
    </ContainerInputRNFilter>
  );
}
