import { ReactNode } from "react";
import { View, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import { ContainerInput, Label, InputRN, styleIcon } from "./styles";

export interface InputProps extends TextInputProps {
  label: string;
  IconLeft?: ReactNode;
}

export function Input({ label, IconLeft, ...rest }: InputProps) {
  const { colors } = useTheme();

  return (
    <ContainerInput>
      <Label>{label}</Label>

      <View style={{ position: "relative" }}>
        {!!IconLeft && <View style={styleIcon}>{IconLeft}</View>}

        <InputRN
          hasIconLeft={!!IconLeft}
          placeholderTextColor={colors.gray500}
          {...rest}
        />
      </View>
    </ContainerInput>
  );
}
