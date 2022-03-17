import React from 'react';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { SEQUENCE_LENGTH_MIN, SEQUENCE_REPEAT_MAX, SONG_LENGTH_MAX } from 'modules/project/config';

import { confirm } from 'ui/dialog';
import { ButtonRaw } from 'ui/common/ButtonRaw';
import { Table, TableItem, TableRow } from 'ui/common/Table';
import { getSelectorValues, Selector } from 'ui/common/Selector';
import { createSelectOptions, SelectRaw } from 'ui/common/SelectRaw';

const repeats = createRange(SEQUENCE_LENGTH_MIN, SEQUENCE_REPEAT_MAX);

const repeatValues = getSelectorValues(repeats, (val) => ({
    label: ('000' + val).slice(-3),
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

    const headers = [t('nr'), t('name'), t('repeat'), ''];

    const seqOptions = createSelectOptions(sequences, (seq, i) => ({
        label: seq.name,
        value: `${i}`,
    }));

    const deleteSequence = confirm(t('confirmSongSequenceDelete'), (id: number) => dispatch(
        removeSongSequence({
            slot: id,
            data: null,
        })
    ));

    return (
        <Table headers={headers}>
            {song.sequences.map(({ sequence, repeat }, i) => (
                <TableRow key={i}>
                    <TableItem $align="center">
                        {i + 1}
                    </TableItem>

                    <TableItem>
                        <SelectRaw
                            value={`${sequence}`}
                            options={seqOptions}
                            onChange={(value) => {
                                dispatch(setSongSequence({
                                    slot: i,
                                    data: parseInt(value, 10),
                                }));
                            }}
                        />
                    </TableItem>

                    <TableItem $align="right">
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

                    <TableItem $align="right">
                        <ButtonRaw
                            text="↑"
                            onClick={() => dispatch(
                                moveSongSequence({
                                    slot: i,
                                    data: i - 1,
                                })
                            )}
                        />

                        <ButtonRaw
                            text="↓"
                            onClick={() => dispatch(
                                moveSongSequence({
                                    slot: i,
                                    data: i + 1,
                                })
                            )}
                        />

                        <ButtonRaw
                            text={t('sequenceDelete')}
                            onClick={() => deleteSequence(i)}
                        />
                    </TableItem>
                </TableRow>
            ))}

            {song.sequences.length < SONG_LENGTH_MAX && (
                <TableRow $footer>
                    <TableItem $align="center">
                        +
                    </TableItem>

                    <TableItem>
                        <ButtonRaw
                            text={t('sequenceAdd')}
                            onClick={() => dispatch(addSongSequence())}
                        />
                    </TableItem>

                    <TableItem />
                    <TableItem />
                </TableRow>
            )}
        </Table>
    );
};
