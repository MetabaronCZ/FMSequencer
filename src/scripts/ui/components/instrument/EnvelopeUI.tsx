import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store';
import {
    EnvelopeData,
    ENVELOPE_ATTACK_MAX, ENVELOPE_ATTACK_MIN,
    ENVELOPE_DECAY_MAX, ENVELOPE_DECAY_MIN,
    ENVELOPE_SUSTAIN_MIN, ENVELOPE_SUSTAIN_MAX,
    ENVELOPE_RELEASE_MIN, ENVELOPE_RELEASE_MAX,
} from 'modules/audio/instrument/envelope';

import { Slider } from 'ui/common/Slider';
import { instrumentSlice } from 'store/instrument';

interface Props {
    readonly instrumentId: number;
    readonly operatorId: number;
    readonly data: EnvelopeData;
}

export const EnvelopeUI: React.FC<Props> = ({ instrumentId, operatorId, data }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { attack, decay, sustain, release } = data;
    const {
        setOperatorEnvelopeAction, setOperatorEnvelopeDecay,
        setOperatorEnvelopeSustain, setOperatorEnvelopeRelease,
    } = instrumentSlice.actions;

    return (
        <div>
            <Slider
                label={t('envelopeAttack')}
                value={attack}
                min={ENVELOPE_ATTACK_MIN}
                max={ENVELOPE_ATTACK_MAX}
                step={0.01}
                onChange={(value) => dispatch(
                    setOperatorEnvelopeAction({
                        operator: operatorId,
                        instrument: instrumentId,
                        data: value,
                    })
                )}
            />

            <Slider
                label={t('envelopeDecay')}
                value={decay}
                min={ENVELOPE_DECAY_MIN}
                max={ENVELOPE_DECAY_MAX}
                step={0.1}
                onChange={(value) => dispatch(
                    setOperatorEnvelopeDecay({
                        operator: operatorId,
                        instrument: instrumentId,
                        data: value,
                    })
                )}
            />

            <Slider
                label={t('envelopeSustain')}
                value={sustain}
                min={ENVELOPE_SUSTAIN_MIN}
                max={ENVELOPE_SUSTAIN_MAX}
                onChange={(value) => dispatch(
                    setOperatorEnvelopeSustain({
                        operator: operatorId,
                        instrument: instrumentId,
                        data: value,
                    })
                )}
            />

            <Slider
                label={t('envelopeRelease')}
                value={release}
                min={ENVELOPE_RELEASE_MIN}
                max={ENVELOPE_RELEASE_MAX}
                step={0.1}
                onChange={(value) => dispatch(
                    setOperatorEnvelopeRelease({
                        operator: operatorId,
                        instrument: instrumentId,
                        data: value,
                    })
                )}
            />
        </div>
    );
};
