import React, { useRef } from 'react';
import styled from 'styled-components';

import { getSign, limitNumber } from 'core/number';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { Field } from 'ui/common/Field';

const verticalSliderHeight = toVU(15);
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

const preventScroll = (e: WheelEvent): void => {
    e.preventDefault();
};

const setPreventScroll = (elm: HTMLInputElement | null): void => {
    const cont = elm ? elm.closest('main') : null;
    if (cont) {
        cont.addEventListener('wheel', preventScroll);
    }
};

const releasePreventScroll = (elm: HTMLInputElement | null): void => {
    const cont = elm ? elm.closest('main') : null;
    if (cont) {
        cont.removeEventListener('wheel', preventScroll);
    }
};

interface StyledProps {
    readonly $isVertical: boolean;
}

const Container = styled.div<StyledProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    background: ${({ theme }) => theme.color.white};

    ${({ $isVertical }) => $isVertical && `
        flex-direction: column-reverse;
    `}
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

const Value = styled.div<StyledProps>`
    position: relative;
    flex: 1 0 auto;

    ${({ $isVertical }) => $isVertical && `
        width: ${toVU(3)};
        height: ${toVU(15)};
    `}
`;

const Input = styled.input<StyledProps>`
    display: block;
    width: 100%;
    height: calc(${toVU(2)} + ${({ theme }) => 2 * theme.border.size}px);
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

    ${({ theme, $isVertical }) => $isVertical && `
        position: absolute;
        top: calc(40% + ${2 * theme.border.size}px);
        left: -200%;
        width: ${verticalSliderHeight};
        transform: rotate(270deg);
    `}
`;

interface Props {
    readonly label: string;
    readonly value: number;
    readonly min: number;
    readonly max: number;
    readonly minLabel?: string;
    readonly maxLabel?: string;
    readonly step?: number;
    readonly vertical?: boolean;
    readonly onChange: Onchange;
}

export const Slider: React.FC<Props> = (props) => {
    const {
        label, value, min, max, minLabel, maxLabel,
        step = 1, vertical = false, onChange,
    } = props;
    const inputElm = useRef<HTMLInputElement>(null);
    const id = `slider-${sliderCounter++}`;

    return (
        <Field
            id={id}
            label={label}
            vertical={vertical}
        >
            <Container $isVertical={vertical}>
                <Limit type="button" onClick={() => onChange(min)}>
                    {minLabel || min}
                </Limit>

                <Value $isVertical={vertical}>
                    <Input
                        $isVertical={vertical}
                        ref={inputElm}
                        id={id}
                        type="range"
                        value={value}
                        min={min}
                        max={max}
                        step={step}
                        onChange={change(onChange)}
                        onWheel={wheel(step, min, max, onChange)}
                        onMouseEnter={() => setPreventScroll(inputElm.current)}
                        onMouseLeave={() => releasePreventScroll(inputElm.current)}
                    />
                </Value>

                <Limit type="button" onClick={() => onChange(max)}>
                    {maxLabel || max}
                </Limit>
            </Container>
        </Field>
    );
};
