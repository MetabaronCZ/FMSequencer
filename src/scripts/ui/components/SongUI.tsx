import React from 'react';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';

import { SEQUENCE_LENGTH_MIN, SEQUENCE_REPEAT_MAX, SONG_LENGTH_MAX } from 'modules/project/config';

import { confirm } from 'ui/dialog';
import { getSelection } from 'ui/event';
import { Button } from 'ui/common/Button';
import { Heading } from 'ui/common/Heading';
import { Selector } from 'ui/common/Selector';
import { Table, TableItem, TableRow } from 'ui/common/Table';
import { SequenceSelector } from 'ui/components/selector/SequenceSelector';

const repeats = createRange(SEQUENCE_LENGTH_MIN, SEQUENCE_REPEAT_MAX);

const repeatValues = getSelection(repeats, (val) => ({
    label: toFixedLength(val, 3),
    value: val,
}));

export const SongUI: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { song } = useAppSelector((state) => state.project);

    const {
        setSongSequence, setSongSequenceRepeat,
        addSongSequence, removeSongSequence, moveSongSequence,
    } = projectSlice.actions;

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
            <Heading tag="h2">{t('song')}</Heading>

            {song.sequences.length > 0 && (
                <Table>
                    {song.sequences.map(({ sequence, repeat }, i) => (
                        <TableRow key={i}>
                            <TableItem>
                                {toFixedLength(i + 1, 3, '0')}
                            </TableItem>

                            <TableItem>
                                <SequenceSelector
                                    value={sequence}
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
                                <Button
                                    text="▲"
                                    title={t('moveUp')}
                                    onClick={() => moveSequence(i, -1)}
                                />
                            </TableItem>

                            <TableItem>
                                <Button
                                    text="▼"
                                    title={t('moveDown')}
                                    onClick={() => moveSequence(i, +1)}
                                />
                            </TableItem>

                            <TableItem>
                                <Button
                                    text={t('sequenceDelete')}
                                    onClick={() => deleteSequence(i)}
                                />
                            </TableItem>
                        </TableRow>
                    ))}
                </Table>
            )}

            {song.sequences.length < SONG_LENGTH_MAX && (
                <Button
                    text={t('sequenceAdd')}
                    onClick={() => dispatch(addSongSequence())}
                />
            )}
        </>
    );
};
