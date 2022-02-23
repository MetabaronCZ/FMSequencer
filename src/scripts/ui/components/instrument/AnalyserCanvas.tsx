import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { AudioEngine } from 'modules/engine';

const canvasWidth = 300;
const canvasHeight = 150;
const lineColor = '#fff';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: ${({ theme }) => theme.color.black};
`;

interface Props {
    readonly track: number;
}

export const AnalyserCanvas: React.FC<Props> = ({ track }) => {
    const containerElm = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elm = containerElm.current;

        if (!elm) {
            return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.width = canvasWidth + 'px';
        canvas.style.height = canvasHeight + 'px';

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Could not initialize Algorithm canvas: 2D context not supported!');
        }
        const { analyser } = AudioEngine.voices[track];
        const { bufferLength } = analyser;

        ctx.translate(0.5, 0.5);
        ctx.strokeStyle = lineColor;
        ctx.lineCap = 'butt';
        ctx.lineWidth = 2;

        const draw = (): void => {
            const data = analyser.getData();

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.beginPath();

            const sliceWidth = canvasWidth / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = data[i] / 128;
                const y = v * canvasHeight / 2;

                if (0 === i) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                x += sliceWidth;
            }
            ctx.lineTo(canvasWidth, canvasHeight / 2);

            ctx.stroke();
        };
        let loopId: number;

        const loop = (): void => {
            loopId = requestAnimationFrame(loop);
            draw();
        };

        elm.appendChild(canvas);
        loop();

        return () => {
            cancelAnimationFrame(loopId);
            elm.removeChild(canvas);
        };
    }, [track]);

    return (
        <Container ref={containerElm} />
    );
};
