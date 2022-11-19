import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { useTheme } from "styled-components";

interface LoadingProps extends ActivityIndicatorProps {}

export function Loading({ ...rest }: LoadingProps) {
  const { colors } = useTheme();

  return <ActivityIndicator size="large" color={colors.secondary} {...rest} />;
}
