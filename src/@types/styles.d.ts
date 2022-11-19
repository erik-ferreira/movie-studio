import "styled-components";
import { theme } from "../theme/default";

declare module "styled-components" {
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType {}
}
