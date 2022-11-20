import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { IconProps } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

interface Props extends TouchableOpacityProps {
  icon: React.FC<IconProps>;
}

export function ButtonIcon({ icon: Icon, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity {...rest}>
      <Icon color={colors.gray500} size={24} />
    </TouchableOpacity>
  );
}
