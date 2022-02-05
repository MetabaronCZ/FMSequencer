import styled from 'styled-components';
import { getImagePath, toVU } from 'modules/typography';

const loadersize = toVU(4);
const img = getImagePath('loader.gif');

export const Loader = styled.div`
    height: ${loadersize};
    background-image: url(${img});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: ${loadersize} ${loadersize};
`;
