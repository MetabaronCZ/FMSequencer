import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { Link } from 'ui/common/Link';
import { clickOnly, OnClick } from 'ui/event';
import { ProjectSaveData } from 'ui/layout/Header';

const Container = styled.div`
    position: absolute;
    top: calc(100% + ${toVU(1)});
    left: ${toVU(2)};
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: ${toVU(1)};
    width: ${toVU(30)};
    padding: ${toVU(1)};
    z-index: 100;
    background: ${({ theme }) => theme.color.grey1};
    border: ${({ theme }) => theme.border.default};
`;

const Ico = styled.div`
    ${Text.Default};
    font-weight: bold;
    text-align: center;
    border-radius: 100%;
    color: ${({ theme }) => theme.color.grey1};
    background: ${({ theme }) => theme.color.black};
    width: ${({ theme }) => theme.lineHeight.default};
`;

const Content = styled.div`
    ${Text.Default};
    flex: 1;
`;

const CloseButton = styled.button`
    ${Text.Default};
    font-size: 20px;
    width: ${({ theme }) => theme.lineHeight.default};
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.color.grey3};
    }

    &:focus {
        outline: ${({ theme }) => theme.outline.black};
    }
`;

interface Props {
    readonly name: string;
    readonly data: ProjectSaveData;
    readonly onClose?: OnClick;
}

export const InfoBox: React.FC<Props> = ({ name, data, onClose }) => {
    const { t } = useTranslation();
    const fileName = `${name}.json`;
    return (
        <Container>
            <Ico>i</Ico>

            <Content>
                {t('saveToDisk1')}
                {' '}
                <Link
                    href={data.data}
                    download={fileName}
                    onClick={onClose}
                >
                    {t('saveToDisk2')}
                </Link>
                {' '}
                ({data.timestamp}) {t('saveToDisk3')}.
            </Content>

            {!!onClose && (
                <CloseButton type="button" onClick={clickOnly(onClose)}>
                    &times;
                </CloseButton>
            )}
        </Container>
    );
};
