import { toVU } from 'ui/typography';
import { DefaultTheme } from 'styled-components';

const borderSize = 1;

const color = {
    white: '#fff',
    black: '#000',
    grey1: '#f0f0f0',
    grey2: '#ccc',
};

declare module 'styled-components' {
    export interface DefaultTheme {
        readonly color: typeof color;
        readonly font: {
            readonly default: string;
        };
        readonly fontSize: {
            readonly default: string;
        };
        readonly lineHeight: {
            readonly default: string;
        };
        readonly breakpoint: {
            readonly small: string;
            readonly medium: string;
            readonly large: string;
        };
        readonly border: {
            readonly size: number;
            readonly default: string;
            readonly grey: string;
        };
        readonly outline: {
            readonly default: string;
            readonly black: string;
        };
        readonly dimensions: {
            readonly page: {
                readonly width: string;
            };
        };
    }
}

export const defaultTheme: DefaultTheme = {
    color,
    font: {
        default: 'RobotoMono, Tahoma, Verdana, Arial, sans-serif',
    },
    fontSize: {
        default: '14px',
    },
    lineHeight: {
        default: toVU(2),
    },
    breakpoint: {
        small: 'screen and (min-width: 576px)',
        medium: 'screen and (min-width: 768px)',
        large: 'screen and (min-width: 992px)',
    },
    border: {
        size: borderSize,
        default: `${borderSize}px solid ${color.black}`,
        grey: `${borderSize}px solid ${color.grey2}`,
    },
    outline: {
        default: `${borderSize}px dotted ${color.white}`,
        black: `${borderSize}px dotted ${color.black}`,
    },
    dimensions: {
        page: {
            width: '1280px',
        },
    },
};
