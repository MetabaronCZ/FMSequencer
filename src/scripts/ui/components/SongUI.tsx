import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { getSequenceName } from 'modules/project/sequence';

import { toVU } from 'ui/typography';
import { ButtonRaw } from 'ui/common/ButtonRaw';
import { Table, TableItem } from 'ui/common/Table';
import { createSelectOptions, SelectRaw } from 'ui/common/SelectRaw';

const Repeat = styled.span`
    display: inline-block;
    width: ${toVU(4)};
    text-align: center;
`;

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
        label: getSequenceName(t, i),
        value: `${i}`,
    }));

    const deleteSequence = (id: number): void => {
        if (!window.confirm(t('confirmSongSequenceDelete'))) {
            return;
        }
        dispatch(
            removeSongSequence({
                slot: id,
                data: null,
            })
        );
    };

    return (
        <Table headers={headers}>
            {song.sequences.map(({ sequence, repeat }, i) => (
                <tr key={i}>
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

                    <TableItem>
                        <ButtonRaw
                            text="❮"
                            onClick={() => dispatch(
                                setSongSequenceRepeat({
                                    slot: i,
                                    data: repeat - 1,
                                })
                            )}
                        />

                        <Repeat>{repeat}</Repeat>

                        <ButtonRaw
                            text="❯"
                            onClick={() => dispatch(
                                setSongSequenceRepeat({
                                    slot: i,
                                    data: repeat + 1,
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
                </tr>
            ))}

            <tr>
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
            </tr>
        </Table>
    );
};
