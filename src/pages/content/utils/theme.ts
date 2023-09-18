export const lightTheme = {
  colors: {
    default: '#161617',
    white: '#ffffff',
    black: '#000000',
  },
  background: {
    default: '#ffffff',
  },
  button: {
    primary: '#30B198',
    active: '#4DA48C',
    disabled: '#BDBDBD',
  },
  palette: {
    grey200: '#EEEEEE',
    grey400: '#BDBDBD',
    grey600: '#757575',
    grey700: '#616161',
    grey800: '#424242',
    grey850: '#303030',
    grey900: '#212121',
  },
  toast: {
    success: '#30B198',
    delete: '#E53E3E',
    error: '#FFF8B5',
  },
} as const;

export const darkTheme = {
  colors: {
    default: '#ffffff',
    white: '#ffffff',
    black: '#000000',
  },
  background: {
    default: '#404040',
  },
  button: {
    primary: '#30B198',
    active: '#4DA48C',
    disabled: '#BDBDBD',
  },
  palette: {
    grey200: '#EEEEEE',
    grey400: '#BDBDBD',
    grey600: '#757575',
    grey700: '#616161',
    grey800: '#424242',
    grey850: '#303030',
    grey900: '#212121',
  },
  toast: {
    success: '#30B198',
    delete: '#E53E3E',
    error: '#FFF8B5',
  },
} as const;

export type ColorType = keyof typeof lightTheme.colors;
export type BackgroundColorType = keyof typeof lightTheme.background;
export type ButtonColorType = keyof typeof lightTheme.button;
export type PaletteColorType = keyof typeof lightTheme.palette;
export type ToastColorType = keyof typeof lightTheme.toast;
