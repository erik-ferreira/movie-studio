import styled from "styled-components/native";

export const Block = styled.View`
  border: 1px solid red;
  width: 100%;
  flex-direction: column;
  gap: 16px;
`;
export const Label = styled.Text`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.semibold};
  color: ${(props) => props.theme.colors.gray100};
`;

export const Input = styled.TextInput`
  border: 1px solid red;
  height: 48px;
  background-color: ${(props) => props.theme.colors.gray700};
`;
