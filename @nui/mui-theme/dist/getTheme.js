/* eslint-disable */

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getTheme = getTheme;
exports.getThemeBase = getThemeBase;
exports.getMuiOverrides = getMuiOverrides;

var _styles = require("@mui/material");

var _polished = require("polished");

var _materialColors = _interopRequireDefault(require("./material-colors"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var defaultPalette = {
  primary: {
    main: getColor(_materialColors.default, "primary", 500),
  },
  secondary: {
    main: getColor(_materialColors.default, "secondary", 700),
  },
  error: {
    main: _materialColors.default.error,
  },
};

function getTheme(themeObject) {
  return (0, _styles.createTheme)(getThemeBase(themeObject));
}

function getThemeBase() {
  var _ref;

  var themeObject =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var palette = _objectSpread({}, defaultPalette, {}, themeObject.palette);

  var themeVariables = getThemeVariables(
    themeObject,
    palette,
    _materialColors.default
  );
  var muiOverrides =
    (_ref =
      themeObject === null || themeObject === void 0
        ? void 0
        : themeObject.overrides) !== null && _ref !== void 0
      ? _ref
      : {};
  return {
    palette: palette,
    components: getMuiOverrides(palette, themeVariables, muiOverrides),
    props: {
      MuiButton: {
        color: "primary",
      },
      MuiAppBar: {
        color: "default",
      },
      MuiTabs: {
        textColor: "primary",
        indicatorColor: "primary",
      },
      MuiSlider: {
        color: "secondary",
      },
    },
    initialThemeVariableValues: themeVariables,
  };
}

function getMuiOverrides(palette, themeVariables, muiOverrides) {
  return _objectSpread(
    {
      MuiButton: {
        styleOverrides: {
          textPrimary: {
            color: themeVariables.primaryButtonColor,
            "&:hover": {
              backgroundColor: (0, _polished.rgba)(
                themeVariables.primaryButtonColor,
                0.08
              ),
            },
          },
          outlined: {
            borderColor: "rgba(0, 0, 0, .12)",
          },
          outlinedPrimary: {
            color: themeVariables.primaryButtonColor,
            borderColor: "rgba(0, 0, 0, .12)",
            "&:hover": {
              backgroundColor: (0, _polished.rgba)(
                themeVariables.primaryButtonColor,
                0.08
              ),
              borderColor: "rgba(0, 0, 0, .12)",
            },
          },
          outlinedSecondary: {
            borderColor: "rgba(0, 0, 0, .12)",
            "&:hover": {
              borderColor: "rgba(0, 0, 0, .12)",
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&$selected": {
              backgroundColor: themeVariables.tableRowSelectedColor,
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            "&$selected, &$selected:hover": {
              backgroundColor: (0, _polished.rgba)(palette.primary.main, 0.16),
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            borderBottom: "1px solid rgba(0, 0, 0, .12)",
            backgroundColor: "#fff",
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          underline: {
            "&:not($disabled):not($error)::after": {
              borderColor: themeVariables.inputColor,
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          underline: {
            "&:not($disabled):not($error)::after": {
              borderColor: themeVariables.inputColor,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&$focused:not($disabled):not($error) $notchedOutline": {
              borderColor: themeVariables.inputColor,
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            "&$focused:not($disabled):not($error)": {
              color: themeVariables.inputColor,
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          textColorPrimary: {
            "&$selected": {
              color: themeVariables.primaryTabColor,
            },
          },
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            "&$selected": {
              color: themeVariables.primaryTabColor,
            },
          },
        },
      },
    },
    muiOverrides
  );
}

function getThemeVariables(themeObject, palette, defaultColors) {
  var _ref2,
    _themeObject$themeVar,
    _ref3,
    _themeObject$themeVar2,
    _ref4,
    _themeObject$themeVar3,
    _ref5,
    _themeObject$themeVar4,
    _ref6,
    _themeObject$themeVar5;

  var inputColor =
    (_ref2 =
      (_themeObject$themeVar = themeObject.themeVariableOverrides) === null ||
      _themeObject$themeVar === void 0
        ? void 0
        : _themeObject$themeVar.inputColor) !== null && _ref2 !== void 0
      ? _ref2
      : palette.secondary.main;
  var primaryButtonColor =
    (_ref3 =
      (_themeObject$themeVar2 = themeObject.themeVariableOverrides) === null ||
      _themeObject$themeVar2 === void 0
        ? void 0
        : _themeObject$themeVar2.primaryButtonColor) !== null &&
    _ref3 !== void 0
      ? _ref3
      : getColor(defaultColors, "primary", 800);
  var drawerBackgroundColor =
    (_ref4 =
      (_themeObject$themeVar3 = themeObject.themeVariableOverrides) === null ||
      _themeObject$themeVar3 === void 0
        ? void 0
        : _themeObject$themeVar3.drawerBackgroundColor) !== null &&
    _ref4 !== void 0
      ? _ref4
      : getColor(defaultColors, "neutral", 100);
  var tableRowSelectedColor =
    (_ref5 =
      (_themeObject$themeVar4 = themeObject.themeVariableOverrides) === null ||
      _themeObject$themeVar4 === void 0
        ? void 0
        : _themeObject$themeVar4.tableRowSelectedColor) !== null &&
    _ref5 !== void 0
      ? _ref5
      : getColor(defaultColors, "secondary", 50);
  var primaryTabColor =
    (_ref6 =
      (_themeObject$themeVar5 = themeObject.themeVariableOverrides) === null ||
      _themeObject$themeVar5 === void 0
        ? void 0
        : _themeObject$themeVar5.primaryTabColor) !== null && _ref6 !== void 0
      ? _ref6
      : getColor(defaultColors, "primary", 800);
  return {
    inputColor: inputColor,
    primaryButtonColor: primaryButtonColor,
    drawerBackgroundColor: drawerBackgroundColor,
    tableRowSelectedColor: tableRowSelectedColor,
    primaryTabColor: primaryTabColor,
  };
}

function getColor(palette, hue, shade) {
  return palette[hue][shade];
}
