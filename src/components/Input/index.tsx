import { ReactNode, useState } from "react";
import { View, TextInputProps, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { Control, Controller } from "react-hook-form";
import { Eye, EyeSlash } from "phosphor-react-native";

import {
  ContainerInput,
  Label,
  InputRN,
  styleIconLeft,
  styleIconRight,
  TextError,
} from "./styles";

export interface InputProps extends TextInputProps {
  label: string;
  IconLeft?: ReactNode;
  isPassword?: boolean;
  control?: Control<any, any>;
  name: string;
  error?: string;
}

export function Input({
  label,
  IconLeft,
  isPassword,
  control,
  name,
  error,
  ...rest
}: InputProps) {
  const { colors } = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword((prevState) => !prevState);
  }

  return (
    <ContainerInput>
      <Label>{label}</Label>

      <View style={{ position: "relative" }}>
        {!!IconLeft && <View style={styleIconLeft}>{IconLeft}</View>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputRN
              hasIconLeft={!!IconLeft}
              placeholderTextColor={colors.gray500}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry={!!isPassword && !showPassword}
              {...rest}
            />
          )}
          name={name}
        />

        {!!isPassword && (
          <TouchableOpacity
            style={styleIconRight}
            activeOpacity={0.7}
            onPress={toggleShowPassword}
          >
            {showPassword ? (
              <Eye size={24} color={colors.gray500} />
            ) : (
              <EyeSlash size={24} color={colors.gray500} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {!!error && <TextError>{error}</TextError>}
    </ContainerInput>
  );
}
