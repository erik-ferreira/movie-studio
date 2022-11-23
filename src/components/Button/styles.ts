import styled from "styled-components/native";

export const ContainerButton = styled.TouchableOpacity`
  width: 100%;
  height: 42px;
  border-radius: 4px;

  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.colors.secondary};
`;

export const TextButton = styled.Text`
  font-family: ${(props) => props.theme.fonts.semibold};
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};
`;


export const ContainerButton2 = styled.TouchableOpacity`
  width: 100%;
  height: 42px;
  border-radius: 4px;

  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.colors.danger};
`;


export const TextButton2 = styled.Text`
  font-family: ${(props) => props.theme.fonts.semibold};
  font-size: 16px;
  color: ${(props) => props.theme.colors.white};
`;
