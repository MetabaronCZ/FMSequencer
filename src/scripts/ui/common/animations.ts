import { keyframes } from 'styled-components';

export const fadeInAnimation = keyframes`
    from {
        opacity: 0.0;
    }
    to {
        opacity: 1.0;
    }
`;

export const fadeOutAnimation = keyframes`
    from {
        opacity: 1.0;
    }
    to {
        opacity: 0.0;
    }
`;

export const growAnimation = keyframes`
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
`;

export const shrinkAnimation = keyframes`
    from {
        transform: scale(1);
    }
    to {
        transform: scale(0);
    }
`;
