import React from 'react';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import {
    ENVELOPE_ATTACK_MAX, ENVELOPE_ATTACK_MIN,
    ENVELOPE_DECAY_MAX, ENVELOPE_DECAY_MIN,
    ENVELOPE_SUSTAIN_MIN, ENVELOPE_SUSTAIN_MAX,
    ENVELOPE_RELEASE_MIN, ENVELOPE_RELEASE_MAX,
} from 'modules/engine/config';
import { EnvelopeData } from 'modules/project/instrument/envelope';

import { getSelectorValues } from 'ui/common/Selector';
import { SelectorField } from 'ui/common/SelectorField';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { toFixedLength } from 'core/format';

const attacks = createRange(ENVELOPE_ATTACK_MIN, ENVELOPE_ATTACK_MAX, 10);
const decays = createRange(ENVELOPE_DECAY_MIN, ENVELOPE_DECAY_MAX, 10);
const sustains = createRange(ENVELOPE_SUSTAIN_MIN, ENVELOPE_SUSTAIN_MAX);
const releases = createRange(ENVELOPE_RELEASE_MIN, ENVELOPE_RELEASE_MAX, 10);

const attackValues = getSelectorValues(attacks, (item) => ({
    label: toFixedLength(item.toFixed(1), 4),
    value: item,
}));

const decayValues = getSelectorValues(decays, (item) => ({
    label: toFixedLength(item.toFixed(1), 4),
    value: item,
}));

const sustainValues = getSelectorValues(sustains, (item) => ({
    label: toFixedLength(item, 3),
    value: item,
}));

const releaseValues = getSelectorValues(releases, (item) => ({
    label: toFixedLength(item.toFixed(1), 4),
    value: item,
}));

interface Props {
    readonly track: number;
    readonly operator: number;
    readonly data: EnvelopeData;
}

export const EnvelopeUI: React.FC<Props> = ({ track, operator, data }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { attack, decay, sustain, release } = data;
    const {
        setInstrumentOperatorEnvelopeAction, setInstrumentOperatorEnvelopeDecay,
        setInstrumentOperatorEnvelopeSustain, setInstrumentOperatorEnvelopeRelease,
    } = projectSlice.actions;

    return (
        <Grid>
            <GridRow>
                <GridColumn>
                    <SelectorField
                        label={t('envelopeAttack')}
                        unit={t('sec')}
                        value={attack}
                        values={attackValues}
                        onChange={(value) => dispatch(
                            setInstrumentOperatorEnvelopeAction({
                                track,
                                operator,
                                data: value,
                            })
                        )}
                    />
                </GridColumn>
            </GridRow>

            <GridRow>
                <GridColumn>
                    <SelectorField
                        label={t('envelopeDecay')}
                        unit={t('sec')}
                        value={decay}
                        values={decayValues}
                        onChange={(value) => dispatch(
                            setInstrumentOperatorEnvelopeDecay({
                                track,
                                operator,
                                data: value,
                            })
                        )}
                    />
                </GridColumn>
            </GridRow>

            <GridRow>
                <GridColumn>
                    <SelectorField
                        label={t('envelopeSustain')}
                        value={sustain}
                        values={sustainValues}
                        onChange={(value) => dispatch(
                            setInstrumentOperatorEnvelopeSustain({
                                track,
                                operator,
                                data: value,
                            })
                        )}
                    />
                </GridColumn>
            </GridRow>

            <GridRow>
                <GridColumn>
                    <SelectorField
                        label={t('envelopeRelease')}
                        unit={t('sec')}
                        value={release}
                        values={releaseValues}
                        onChange={(value) => dispatch(
                            setInstrumentOperatorEnvelopeRelease({
                                track,
                                operator,
                                data: value,
                            })
                        )}
                    />
                </GridColumn>
            </GridRow>
        </Grid>
    );
};
