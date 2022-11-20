import styled from "styled-components/native";

export const TextButton = styled.Text`
  font-size: 14px;
  text-decoration: underline;
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fonts.normal};
`;
