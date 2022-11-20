import { ReactNode } from "react";
import { StatusBar, ScrollView } from "react-native";
import styled from "styled-components/native";

interface SafeAreaBackgroundProps {
  children: ReactNode;
}

export function SafeAreaBackground({ children }: SafeAreaBackgroundProps) {
  return (
    <SafeAreaContainer>
      <ScrollView
        style={{
          width: "100%",
        }}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: 32,
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
