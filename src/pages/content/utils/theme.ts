export const lightTheme = {
  colors: {
    primary: '#30B198',
    primaryActive: '#4DA48C',
    background: '#ffffff',
    text: '#161617',
    grey200: '#EEEEEE',
    grey400: '#BDBDBD',
    grey600: '#757575',
    grey700: '#616161',
    grey800: '#424242',
    grey850: '#303030',
    grey900: '#212121',
  },
} as const;

export const darkTheme = {
  colors: {
    primary: '#30B198',
    primaryActive: '#4DA48C',
    background: '#212121',
    text: '#ffffff',
    grey200: '#303030',
    grey400: '#757575',
    grey600: '#BDBDBD',
    grey700: '#EEEEEE',
    grey800: '#161617',
    grey850: '#0A0A0A',
    grey900: '#000000',
  },
} as const;

export type ColorType = keyof typeof lightTheme.colors;
