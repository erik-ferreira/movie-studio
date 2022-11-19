import { ReactNode } from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";

interface SafeAreaBackgroundProps {
  children: ReactNode;
}

export function SafeAreaBackground({ children }: SafeAreaBackgroundProps) {
  return <SafeAreaContainer>{children}</SafeAreaContainer>;
}

const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  padding-top: ${StatusBar.currentHeight}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;
