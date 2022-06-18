import React from 'react';
import styled from 'styled-components';

import { Text } from 'ui/common/Text';
import { OnClick, clickOnly } from 'ui/event';
import { toVU } from 'ui/typography';

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

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: ${({ theme }) => `${theme.color.white}d0`};
`;

const ModalBox = styled.div`
  width: ${toVU(50)};
  z-index: 1;
  border: ${({ theme }) => theme.border.grey};
  background: ${({ theme }) => `${theme.color.grey1}`};
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${toVU(1)};
`;

const ModalTitle = styled.div`
  ${Text.Default};
  flex: 1;
  font-weight: bold;
  text-transform: uppercase;
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

interface Props {
  readonly title: string;
  readonly onClose: OnClick;
}

export const Modal: React.FC<Props> = ({ title, onClose, children }) => (
  <Container>
    <Overlay onClick={clickOnly(onClose)} />

    <ModalBox>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>

        <ModalClose type="button" onClick={clickOnly(onClose)}>
          &times;
        </ModalClose>
      </ModalHeader>

      <ModalBody>{children}</ModalBody>
    </ModalBox>
  </Container>
);
