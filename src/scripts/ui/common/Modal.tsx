import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styled, { css } from 'styled-components';

import { Text } from 'ui/common/Text';
import {
  fadeInAnimation,
  fadeOutAnimation,
  growAnimation,
  shrinkAnimation,
} from 'ui/common/animations';
import { OnClick, clickOnly } from 'ui/event';
import { toVU } from 'ui/typography';

const closeTimeout = 250; // in ms

interface StyledProps {
  readonly $closing: boolean;
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div<StyledProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: ${({ theme }) => `${theme.color.white}d0`};

  ${({ theme, $closing }) =>
    $closing
      ? css`
          animation-name: ${fadeOutAnimation};
          animation-duration: ${closeTimeout}ms;
        `
      : css`
          animation-name: ${fadeInAnimation};
          animation-duration: ${theme.animation.duration.default};
        `}
`;

const ModalBox = styled.div<StyledProps>`
  width: ${toVU(50)};
  z-index: 1;
  border: ${({ theme }) => theme.border.grey};
  background: ${({ theme }) => `${theme.color.grey1}`};

  ${({ theme, $closing }) =>
    $closing
      ? css`
          animation-name: ${shrinkAnimation};
          animation-duration: ${closeTimeout}ms;
        `
      : css`
          animation-name: ${growAnimation};
          animation-duration: ${theme.animation.duration.default};
        `}
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${toVU(1)};
`;

const ModalTitle = styled.div`
  ${Text.Heading};
  flex: 1;
`;

const ModalClose = styled.button`
  ${Text.Default};
  font-size: 24px;
  width: ${({ theme }) => theme.lineHeight.default};
  margin-left: ${toVU(2)};
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.white};
  }

  &:focus {
    outline: ${({ theme }) => theme.outline.black};
  }
`;

const ModalBody = styled.div`
  ${Text.Default};
  padding: ${toVU(1)};
  background-color: ${({ theme }) => theme.color.white};
`;

interface Props extends PropsWithChildren {
  readonly title: string;
  readonly onClose: OnClick;
}

export const Modal: React.FC<Props> = ({ title, onClose, children }) => {
  const [isClosing, setClosing] = useState(false);

  const close = useCallback((): void => {
    if (isClosing) {
      return;
    }
    setClosing(true);

    setTimeout(() => {
      onClose();
    }, closeTimeout);
  }, [isClosing, onClose]);

  useEffect(() => {
    const escKeyHandler = (e: KeyboardEvent): void => {
      if ('Escape' === e.key) {
        close();
      }
    };
    document.addEventListener('keyup', escKeyHandler);

    return () => {
      document.removeEventListener('keyup', escKeyHandler);
    };
  }, [close]);

  return (
    <Container>
      <Overlay $closing={isClosing} onClick={clickOnly(close)} />

      <ModalBox $closing={isClosing}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>

          <ModalClose type="button" onClick={clickOnly(close)}>
            &times;
          </ModalClose>
        </ModalHeader>

        <ModalBody>{children}</ModalBody>
      </ModalBox>
    </Container>
  );
};
