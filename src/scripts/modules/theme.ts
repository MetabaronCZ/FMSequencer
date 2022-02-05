import { toVU } from 'modules/typography';
import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        readonly color: {
            readonly white: string;
            readonly black: string;
        };
        readonly font: {
            readonly default: string;
        };
        readonly fontSize: {
            readonly largest: string;
            readonly larger: string;
            readonly large: string;
            readonly default: string;
            readonly small: string;
            readonly smaller: string;
            readonly smallest: string;
        };
        readonly lineHeight: {
            readonly largest: string;
            readonly larger: string;
            readonly large: string;
            readonly default: string;
            readonly small: string;
            readonly smaller: string;
            readonly smallest: string;
        };
        readonly breakpoint: {
            readonly small: string;
            readonly medium: string;
            readonly large: string;
        };
    }
}

export const defaultTheme: DefaultTheme = {
    color: {
        white: '#fff',
        black: '#000',
    },
    font: {
        default: 'Tahoma, Verdana, Arial, sans-serif',
    },
    fontSize: {
        largest: '32px',
        larger: '24px',
        large: '18px',
        default: '16px',
        small: '14px',
        smaller: '12px',
        smallest: '10px',
    },
    lineHeight: {
        largest: toVU(5),
        larger: toVU(4),
        large: toVU(3),
        default: toVU(3),
        small: toVU(3),
        smaller: toVU(2),
        smallest: toVU(2),
    },
    breakpoint: {
        small: 'screen and (min-width: 576px)',
        medium: 'screen and (min-width: 768px)',
        large: 'screen and (min-width: 992px)',
    },
};
