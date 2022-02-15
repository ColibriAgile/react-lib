# NUI MUI Theme

This theme is intended to work with [Material UI](https://material-ui.com).

**Note** Material UI and Material Design Components are two separate libraries. The NUI theme will _not_ look exactly the same between them.

## Install

Make sure the CXD NPM repository is added as a regsitry:

```
npm config set @nui:registry http://nexuspro.ncr.com/nexus/content/repositories/cxd-npm
```

Install via npm:

```
npm i @nui/mui-theme
```

## Usage

Pass the NUI MUI theme into the MUI Theme Provider

```js
import { ThemeProvider } from "@mui/material/styles";
import theme from "@nui/mui-theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app"></div>
    </ThemeProvider>
  );
}
```

Or use the getTheme function to pass in overrides

```js
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "@nui/mui-theme/dist/getTheme";

function App() {
  const theme = getTheme({
    palette: {},
    themeVariableOverrides: {},
    overrides: {},
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="app"></div>
    </ThemeProvider>
  );
}
```

Please see MUI docs for theme usage.
