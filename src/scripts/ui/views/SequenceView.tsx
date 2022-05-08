import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { paths } from 'ui/paths';
import { confirm } from 'ui/dialog';
import { Page } from 'ui/layout/Page';
import { Heading } from 'ui/common/Heading';
import { Toolbar } from 'ui/common/Toolbar';
import { SongUI } from 'ui/components/SongUI';
import { ButtonRaw } from 'ui/common/ButtonRaw';
import { SequenceUI } from 'ui/components/sequence/SequenceUI';
import { BarSelector } from 'ui/components/selector/BarSelector';
import { SequenceSelector } from 'ui/components/selector/SequenceSelector';

export const SequenceView: React.FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { sequences, song } = useAppSelector((state) => state.project);
    const { setSequenceLength, clearSequence } = projectSlice.actions;

    const sequence = id ? parseInt(id, 10) : 0;
    const { bars } = sequences[sequence];

    const clear = confirm(t('confirmSequenceDelete'), () => dispatch(
        clearSequence(sequence)
    ));

    return (
        <Page>
            <Toolbar>
                <SequenceSelector
                    value={sequence}
                    onChange={(value) => {
                        navigate(paths.SEQUENCE(`${value}`));
                    }}
                />

                <BarSelector
                    value={bars}
                    onChange={(value) => {
                        dispatch(setSequenceLength({
                            sequence,
                            data: value,
                        }));
                    }}
                />

                {'|'}

                <ButtonRaw
                    text={t('clear')}
                    onClick={clear}
                />
            </Toolbar>

            <SequenceUI
                id={sequence}
                data={sequences[sequence]}
            />

            <Heading tag="h2">
                {t('song')}
            </Heading>

            <SongUI song={song} />
        </Page>
    );
};
