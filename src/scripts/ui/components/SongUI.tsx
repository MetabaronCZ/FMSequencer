import React from 'react';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import { SEQUENCE_LENGTH_MIN, SEQUENCE_REPEAT_MAX, SONG_LENGTH_MAX } from 'modules/project/config';

import { confirm } from 'ui/dialog';
import { getSelection } from 'ui/event';
import { Select } from 'ui/common/Select';
import { Selector } from 'ui/common/Selector';
import { ButtonRaw } from 'ui/common/ButtonRaw';
import { Table, TableItem, TableRow } from 'ui/common/Table';
import { SongData } from 'modules/project/song';
import { SequenceData } from 'modules/project/sequence';

const repeats = createRange(SEQUENCE_LENGTH_MIN, SEQUENCE_REPEAT_MAX);

const repeatValues = getSelection(repeats, (val) => ({
    label: toFixedLength(val, 3),
    value: val,
}));

interface Props {
    readonly song: SongData;
    readonly sequences: SequenceData[];
}

export const SongUI: React.FC<Props> = ({ song, sequences }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const {
        setSongSequence, setSongSequenceRepeat,
        addSongSequence, removeSongSequence, moveSongSequence,
    } = projectSlice.actions;

    const sequenceValues = getSelection(sequences, (seq, i) => ({
        label: seq.name,
        value: i,
    }));

    const moveSequence = (id: number, dir: 1 | -1): void => {
        dispatch(
            moveSongSequence({
                slot: id,
                data: id + dir,
            })
        );
    };

    const deleteSequence = confirm(t('confirmSongSequenceDelete'), (id: number) => {
        dispatch(
            removeSongSequence({
                slot: id,
                data: null,
            })
        );
    });

    return (
        <>
            <Table>
                {song.sequences.map(({ sequence, repeat }, i) => (
                    <TableRow key={i}>
                        <TableItem>
                            {toFixedLength(i + 1, 3, '0')}
                        </TableItem>

                        <TableItem>
                            <Select
                                value={sequence}
                                values={sequenceValues}
                                onChange={(value) => {
                                    dispatch(setSongSequence({
                                        slot: i,
                                        data: value,
                                    }));
                                }}
                            />
                        </TableItem>

                        <TableItem>
                            {'×'}

                            <Selector
                                value={repeat}
                                values={repeatValues}
                                onChange={(value) => dispatch(
                                    setSongSequenceRepeat({
                                        slot: i,
                                        data: value,
                                    })
                                )}
                            />
                        </TableItem>

                        <TableItem>
                            <ButtonRaw
                                text="▲"
                                title={t('moveUp')}
                                onClick={() => moveSequence(i, -1)}
                            />
                        </TableItem>

                        <TableItem>
                            <ButtonRaw
                                text="▼"
                                title={t('moveDown')}
                                onClick={() => moveSequence(i, +1)}
                            />
                        </TableItem>

                        <TableItem>
                            <ButtonRaw
                                text={t('sequenceDelete')}
                                onClick={() => deleteSequence(i)}
                            />
                        </TableItem>
                    </TableRow>
                ))}
            </Table>

            {song.sequences.length < SONG_LENGTH_MAX && (
                <ButtonRaw
                    text={t('sequenceAdd')}
                    onClick={() => dispatch(addSongSequence())}
                />
            )}
        </>
    );
};
