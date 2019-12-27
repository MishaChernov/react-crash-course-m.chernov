import React from 'react';

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
    imageShadow: 'rgba(0, 0, 0, 0.5)'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
    imageShadow: 'rgba(255, 255, 255, 0.5)'
  },
};

const withTheme = React.createContext(themes.light);

export default withTheme;