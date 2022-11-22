import styled from "styled-components/native";
import { StyleProp, ViewStyle } from "react-native";

export const ContainerInputRNFilter = styled.View`
  position: relative;
  width: 100%;
`;

export const InputRNFilter = styled.TextInput`
  height: 32px;
  font-size: 16px;
  border-radius: 50px;
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fonts.normal};
  background-color: ${(props) => props.theme.colors.gray700};
  padding-left: 56px;
`;

export const styleIcon: StyleProp<ViewStyle> = {
  position: "absolute",
  top: 4,
  left: 16,
  zIndex: 1,
};
