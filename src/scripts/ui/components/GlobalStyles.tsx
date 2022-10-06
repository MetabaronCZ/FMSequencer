import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  * {
    margin: 0;
    padding: 0;
    user-select: none;
  }

  canvas {
    display: block;
  }

  @font-face {
    font-family: 'RobotoMono';
    src: url('/fonts/RobotoMono-Regular.woff') format('woff');
  }
`;
