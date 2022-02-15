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
    }

    @font-face {
        font-family: 'Roboto';
        src: url('/fonts/Roboto-Regular.woff2') format('woff2');
    }
`;
