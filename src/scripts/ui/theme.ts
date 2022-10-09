import { DefaultTheme } from 'styled-components';

import { toVU } from 'ui/typography';

const borderSize = 1;

/*
    SLSO8
    -------
    #0d2b45
    #203c56 > black
    #544e68
    #8d697a > grey3
    #d08159 > grey2
    #ffaa5e
    #ffd4a3 > grey1
    #ffecd6 > white
*/
const color = {
  white: '#ffecd6',
  black: '#203c56',
  grey1: '#ffd4a3',
  grey2: '#d08159',
  grey3: '#8d697a',
};

declare module 'styled-components' {
  export interface DefaultTheme {
    readonly color: typeof color;
    readonly font: {
      readonly default: string;
    };
    readonly fontSize: {
      readonly default: string;
      readonly small: string;
    };
    readonly lineHeight: {
      readonly default: string;
      readonly small: string;
    };
    readonly breakpoint: {
      readonly small: string;
      readonly medium: string;
      readonly large: string;
    };
    readonly border: {
      readonly size: number;
      readonly default: string;
      readonly dashed: string;
      readonly grey: string;
      readonly transparent: string;
    };
    readonly outline: {
      readonly default: string;
      readonly black: string;
    };
    readonly dimensions: {
      readonly page: {
        readonly width: string;
        readonly height: string;
      };
    };
    readonly animation: {
      readonly duration: {
        readonly default: string;
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
    small: '12px',
  },
  lineHeight: {
    default: toVU(2),
    small: toVU(2),
  },
  breakpoint: {
    small: 'screen and (min-width: 576px)',
    medium: 'screen and (min-width: 768px)',
    large: 'screen and (min-width: 992px)',
  },
  border: {
    size: borderSize,
    default: `${borderSize}px solid ${color.black}`,
    dashed: `${borderSize}px dashed ${color.grey2}`,
    grey: `${borderSize}px solid ${color.grey2}`,
    transparent: `${borderSize}px solid ${color.black}1f`,
  },
  outline: {
    default: `${borderSize}px dotted ${color.white}`,
    black: `${borderSize}px dotted ${color.black}`,
  },
  dimensions: {
    page: {
      width: '1120px',
      height: toVU(68),
    },
  },
  animation: {
    duration: {
      default: '400ms',
    },
  },
};
