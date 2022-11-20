import { ReactNode } from "react";
import { View, TextInputProps, Text } from "react-native";
import { useTheme } from "styled-components/native";
import { Control, Controller } from "react-hook-form";

import { ContainerInput, Label, InputRN, styleIcon, TextError } from "./styles";

export interface InputProps extends TextInputProps {
  label: string;
  IconLeft?: ReactNode;
  control?: Control<any, any>;
  name: string;
  error?: string;
}

export function Input({
  label,
  IconLeft,
  control,
  name,
  error,
  ...rest
}: InputProps) {
  const { colors } = useTheme();

  return (
    <ContainerInput>
      <Label>{label}</Label>

      <View style={{ position: "relative" }}>
        {!!IconLeft && <View style={styleIcon}>{IconLeft}</View>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputRN
              hasIconLeft={!!IconLeft}
              placeholderTextColor={colors.gray500}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              {...rest}
            />
          )}
          name={name}
        />
      </View>

      {!!error && <TextError>{error}</TextError>}
    </ContainerInput>
  );
}
