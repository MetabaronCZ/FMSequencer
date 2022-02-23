import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import {
    ENVELOPE_ATTACK_MAX, ENVELOPE_ATTACK_MIN,
    ENVELOPE_DECAY_MAX, ENVELOPE_DECAY_MIN,
    ENVELOPE_SUSTAIN_MIN, ENVELOPE_SUSTAIN_MAX,
    ENVELOPE_RELEASE_MIN, ENVELOPE_RELEASE_MAX,
} from 'modules/engine/config';
import { EnvelopeData } from 'modules/project/instrument/envelope';

import { Slider } from 'ui/common/Slider';

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
        <div>
            <Slider
                label={`${t('envelopeAttack')}: ${attack}`}
                value={attack}
                min={ENVELOPE_ATTACK_MIN}
                max={ENVELOPE_ATTACK_MAX}
                step={0.01}
                vertical
                onChange={(value) => dispatch(
                    setInstrumentOperatorEnvelopeAction({
                        track,
                        operator,
                        data: value,
                    })
                )}
            />

            <Slider
                label={`${t('envelopeDecay')}: ${decay}`}
                value={decay}
                min={ENVELOPE_DECAY_MIN}
                max={ENVELOPE_DECAY_MAX}
                step={0.1}
                vertical
                onChange={(value) => dispatch(
                    setInstrumentOperatorEnvelopeDecay({
                        track,
                        operator,
                        data: value,
                    })
                )}
            />

            <Slider
                label={`${t('envelopeSustain')}: ${sustain}`}
                value={sustain}
                min={ENVELOPE_SUSTAIN_MIN}
                max={ENVELOPE_SUSTAIN_MAX}
                vertical
                onChange={(value) => dispatch(
                    setInstrumentOperatorEnvelopeSustain({
                        track,
                        operator,
                        data: value,
                    })
                )}
            />

            <Slider
                label={`${t('envelopeRelease')}: ${release}`}
                value={release}
                min={ENVELOPE_RELEASE_MIN}
                max={ENVELOPE_RELEASE_MAX}
                step={0.1}
                vertical
                onChange={(value) => dispatch(
                    setInstrumentOperatorEnvelopeRelease({
                        track,
                        operator,
                        data: value,
                    })
                )}
            />
        </div>
    );
};
