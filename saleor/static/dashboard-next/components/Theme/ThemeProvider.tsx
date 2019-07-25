// FIXME: https://github.com/mirumee/saleor/issues/4174
import OldMuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import MuiThemeProvider from "@material-ui/styles/ThemeProvider";
import React from "react";

import Baseline from "@ui/styles/Baseline";
import createMuiTheme from "@ui/styles/createTheme";
import { dark, light } from "@ui/styles/exampleThemes";
import MacawProvider from "@ui/styles/MacawProvider";

interface IThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}
export const ThemeContext = React.createContext<IThemeContext>({
  isDark: false,
  toggleTheme: () => undefined
});

interface ThemeProviderProps {
  isDefaultDark?: boolean;
}
const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  isDefaultDark
}) => {
  const [isDark, setDark] = React.useState(isDefaultDark);
  const toggleTheme = () => {
    setDark(!isDark);
    localStorage.setItem("theme", (!isDark).toString());
  };

  const theme = createMuiTheme(isDark ? dark : light);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme
      }}
    >
      <MacawProvider theme={isDark ? dark : light}>
        <OldMuiThemeProvider theme={theme}>
          <MuiThemeProvider theme={theme}>
            <Baseline />
            {children}
          </MuiThemeProvider>
        </OldMuiThemeProvider>
      </MacawProvider>
    </ThemeContext.Provider>
  );
};
ThemeProvider.defaultProps = {
  isDefaultDark: false
};
export default ThemeProvider;
