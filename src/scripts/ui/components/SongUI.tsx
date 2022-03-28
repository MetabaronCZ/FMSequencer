import React from 'react';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { SEQUENCE_LENGTH_MIN, SEQUENCE_REPEAT_MAX, SONG_LENGTH_MAX } from 'modules/project/config';

import { confirm } from 'ui/dialog';
import { ButtonRaw } from 'ui/common/ButtonRaw';
import { Table, TableItem, TableRow } from 'ui/common/Table';
import { getSelectorValues, Selector } from 'ui/common/Selector';

const repeats = createRange(SEQUENCE_LENGTH_MIN, SEQUENCE_REPEAT_MAX);

const repeatValues = getSelectorValues(repeats, (val) => ({
    label: toFixedLength(val, 3),
    value: val,
}));

export const SongUI: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { song, sequences } = useAppSelector((state) => state.project);

    const {
        setSongSequence, setSongSequenceRepeat,
        addSongSequence, removeSongSequence, moveSongSequence,
    } = projectSlice.actions;

    const sequenceValues = getSelectorValues(sequences, (seq, i) => ({
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
                            <Selector
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
