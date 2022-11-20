import styled from "styled-components/native";
import { StyleProp, ViewStyle } from "react-native";

export const ContainerInput = styled.View`
  width: 100%;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.semibold};
  color: ${(props) => props.theme.colors.gray100};
  margin-bottom: 12px;
`;

interface InputRNProps {
  hasIconLeft?: boolean;
}

export const InputRN = styled.TextInput<InputRNProps>`
  height: 48px;
  font-size: 16px;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fonts.normal};
  background-color: ${(props) => props.theme.colors.gray700};
  padding: 0 16px 0 ${(props) => (props.hasIconLeft ? "56px" : "16px")};
`;

export const styleIcon: StyleProp<ViewStyle> = {
  position: "absolute",
  top: 12,
  left: 16,
  zIndex: 1,
};

export const TextError = styled.Text`
  font-size: 12px;
  margin-top: 12px;
  color: ${(props) => props.theme.colors.danger};
  font-family: ${(props) => props.theme.fonts.semibold};
`;
