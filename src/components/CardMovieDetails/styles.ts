import styled from "styled-components/native";

export const ContainerCardMovieDetails = styled.View`
  width: 100%;
  height: 355px;
  padding: 20px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.gray700};
  position: relative;
`;

export const ContentHeaderCard = styled.View`
  flex-direction: row;
`;

export const ImageMovie = styled.Image`
  width: 160px;
  height: 240px;
`;

export const BlockRightHeader = styled.View`
  flex: 1;
  margin-left: 16px;
`;

export const Label = styled.Text`
  font-size: 12px;
  font-weight: 600;
  font-family: ${(props) => props.theme.fonts.semibold};
  color: ${(props) => props.theme.colors.gray100};
`;

export const Value = styled.Text`
  font-size: 12px;
  font-family: ${(props) => props.theme.fonts.normal};
  color: ${(props) => props.theme.colors.gray300};
  margin-bottom: 4px;
`;

export const TitleMovie = styled.Text`
  font-size: 16px;
  font-weight: 600;
  font-family: ${(props) => props.theme.fonts.semibold};
  color: ${(props) => props.theme.colors.gray100};
  margin-bottom: 8px;
  text-align: center;
`;

export const ContentEvaluation = styled.View`
  flex-direction: row;
  align-items: center;
  /* 
  margin-bottom: 10px; */
`;

export const TextEvaluation = styled.Text`
  font-size: 12px;
  font-weight: 600;
  margin: 0 4px;
  color: ${(props) => props.theme.colors.gray100};
  font-family: ${(props) => props.theme.fonts.semibold};
`;
