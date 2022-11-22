import styled from "styled-components/native";

export const ContainerCardMovie = styled.View`
  width: 48.5%;
  padding: 20px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.gray700};
  align-items: center;
`;

export const ImageMovie = styled.Image`
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
`;

export const TitleMovie = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: ${(props) => props.theme.fonts.semibold};
  color: ${(props) => props.theme.colors.gray100};
`;

export const ContentEvaluation = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const TextEvaluation = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-right: 4px;
  color: ${(props) => props.theme.colors.gray100};
  font-family: ${(props) => props.theme.fonts.semibold};
`;
