import { ReactNode } from "react";
import { StatusBar, ScrollView } from "react-native";
import styled from "styled-components/native";

interface SafeAreaBackgroundProps {
  children: ReactNode;
  minimizePadding?: boolean;
  isScreenMovies?: boolean;
}

export function SafeAreaBackground({
  children,
  isScreenMovies,
  minimizePadding,
}: SafeAreaBackgroundProps) {
  if (isScreenMovies) {
    return (
      <SafeAreaContainer
        style={{
          paddingHorizontal: 16,
        }}
      >
        {children}
      </SafeAreaContainer>
    );
  }

  return (
    <SafeAreaContainer>
      <ScrollView
        style={{
          width: "100%",
        }}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: minimizePadding ? 16 : 32,
          paddingVertical: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaContainer>
  );
}

const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  padding-top: ${StatusBar.currentHeight}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
`;
