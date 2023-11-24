import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const themeConfig: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({ config: themeConfig });
