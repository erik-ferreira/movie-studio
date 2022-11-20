import styled from "styled-components/native";

export const ContainerHeader = styled.View`
  width: 100%;
  height: 94px;
  background-color: ${(props) => props.theme.colors.gray700};
  padding: 0 20px 20px;
`;

export const ContentHeader = styled.View`
  width: 100%;
  align-items: center;
  /* flex-direction: row; */
  justify-content: space-between;
`;

export const TitleHeader = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  text-align: center;
`;

export const EmptyBoxSpace = styled.View`
  width: 24px;
  height: 24px;
`;
