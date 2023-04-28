// theme.js

// 1. import `extendTheme` function
import { theme as proTheme } from '@chakra-ui/pro-theme'
import { extendTheme, theme as baseTheme } from '@chakra-ui/react'
import '@fontsource/inter/variable.css'

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
  fonts: {
    caveat: `'Caveat', sans-serif`,
  },
};

// 3. extend the theme
const theme = extendTheme({
  colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
},
  proTheme);

export default theme;

