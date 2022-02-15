import React from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/typography';
import { getSign, limitNumber } from 'modules/core/number';

import { Text } from 'ui/common/Text';
import { Field } from 'ui/common/Field';

let sliderCounter = 0;

type Onchange = (value: number) => void;

const change = (cb: Onchange) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.currentTarget.value);
    e.preventDefault();
    cb(value);
};

const wheel = (step: number, min: number, max: number, cb: Onchange) => (e: React.WheelEvent<HTMLInputElement>) => {
    const value = parseFloat(e.currentTarget.value);
    const diff = -1 * getSign(e.deltaY) * step;
    let result = parseFloat((value + diff).toFixed(2));
    result = limitNumber(result, min, max);
    cb(result);
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background: ${({ theme }) => theme.color.white};
`;

const Limit = styled.button`
    ${Text.Default};
    display: block;
    padding: 0 ${toVU(1)};
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
`;

const Value = styled.div`
    flex: 1;
`;

const Input = styled.input`
    display: block;
    width: 100%;
    background: transparent;
    border: ${({ theme }) => theme.border.default};
    border-radius: ${({ theme }) => theme.radius.default};
    appearance: none;
    outline: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
        display: block;
        width: ${toVU(2)};
        height: ${toVU(2)};
        border-radius: 0;
        border: none;
        background: ${({ theme }) => theme.color.white};
        appearance: none;
    }

    &::-webkit-slider-runnable-track {
        display: block;
        width: 100%;
        height: ${toVU(2)};
        background: ${({ theme }) => theme.color.black};
        appearance: none;
    }
`;

interface Props {
    readonly label: string;
    readonly value: number;
    readonly min: number;
    readonly max: number;
    readonly minLabel?: string;
    readonly maxLabel?: string;
    readonly step?: number;
    readonly onChange: Onchange;
}

export const Slider: React.FC<Props> = ({ label, value, min, max, minLabel, maxLabel, step = 1, onChange }) => {
    const id = `slider-${sliderCounter++}`;
    return (
        <Field id={id} label={label}>
            <Container>
                <Limit type="button" onClick={() => onChange(min)}>
                    {minLabel || min}
                </Limit>

                <Value>
                    <Input
                        id={id}
                        type="range"
                        value={value}
                        min={min}
                        max={max}
                        step={step}
                        onChange={change(onChange)}
                        onWheel={wheel(step, min, max, onChange)}
                    />
                </Value>

                <Limit type="button" onClick={() => onChange(max)}>
                    {maxLabel || max}
                </Limit>
            </Container>
        </Field>
    );
};
