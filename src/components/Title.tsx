import { TextProps } from "react-native";
import styled from "styled-components/native";

interface TitleProps extends TextProps {
  text: string;
}

export function Title({ text, ...rest }: TitleProps) {
  return <ContainerTitle {...rest}>{text}</ContainerTitle>;
}

const ContainerTitle = styled.Text`
  align-self: flex-start;
  font-size: 24px;
  font-weight: 600;
  font-family: ${(props) => props.theme.fonts.semibold};
  color: ${(props) => props.theme.colors.gray100};
  margin: 16px 0;
`;
