import styled, { css } from "styled-components/native";

export const ContainerCardMovieDetails = styled.View`
  width: 100%;
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

export const ContentSectionButtons = styled.View`
  height: 48px;
  margin-top: 16px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

interface SectionProps {
  isSelected: boolean;
}

export const ButtonSection = styled.TouchableOpacity<SectionProps>`
  width: 50%;
  height: 100%;
  background-color: transparent;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.isSelected &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${(props) => props.theme.colors.secondary};
    `}
`;

export const TextButtonSection = styled.Text<SectionProps>`
  font-size: 14px;
  font-weight: 600;
  font-family: ${(props) => props.theme.fonts.semibold};
  color: ${(props) =>
    props.isSelected
      ? props.theme.colors.secondary
      : props.theme.colors.gray100};
`;
