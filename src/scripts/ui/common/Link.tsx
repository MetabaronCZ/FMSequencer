import styled from 'styled-components';

export const Link = styled.a`
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }

  &:focus {
    outline: ${({ theme }) => theme.outline.black};
  }
`;
