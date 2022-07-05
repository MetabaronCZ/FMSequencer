import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import {
  ENVELOPE_ATTACK_MAX,
  ENVELOPE_DECAY_MAX,
  ENVELOPE_RELEASE_MAX,
  ENVELOPE_SUSTAIN_MAX,
} from 'modules/engine/config';
import { EnvelopeData } from 'modules/project/instrument/envelope';

import { defaultTheme } from 'ui/theme';

const canvasWidth = 100;
const canvasHeight = 60;
const padding = 10;
const labelOffset = 5;
const lineColor = defaultTheme.color.white;

const Container = styled.div`
  background: ${({ theme }) => theme.color.black};
`;

interface Props {
  readonly operator: number;
  readonly envelope: EnvelopeData;
}

export const EnvelopeCanvas: React.FC<Props> = ({ operator, envelope }) => {
  const containerElm = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const attack = envelope.attack / ENVELOPE_ATTACK_MAX;
    const decay = envelope.decay / ENVELOPE_DECAY_MAX;
    const sustain = envelope.sustain / ENVELOPE_SUSTAIN_MAX;
    const release = envelope.release / ENVELOPE_RELEASE_MAX;

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
      throw new Error(
        'Could not initialize Algorithm canvas: 2D context not supported!'
      );
    }
    const widthPart = (canvasWidth - 2 * padding) / 4;
    const heightPart = canvasHeight - 2 * padding - labelOffset;

    const startX = padding;
    const startY = canvasHeight - padding;
    const attackX = startX + attack * widthPart;
    const attackY = startY - heightPart;
    const decayX = attackX + decay * widthPart;
    const decayY = startY - sustain * heightPart;
    const sustainX = decayX + widthPart;
    const sustainY = decayY;
    const releaseX = sustainX + release * widthPart;
    const releaseY = startY;

    ctx.translate(0.5, 0.5);

    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;
    ctx.font = '11px "RobotoMono", sans-serif';
    ctx.textAlign = 'center';
    ctx.lineWidth = 1;
    ctx.lineCap = 'butt';

    ctx.moveTo(startX, startY);
    ctx.lineTo(attackX, attackY);
    ctx.lineTo(decayX, decayY);
    ctx.lineTo(sustainX, sustainY);
    ctx.lineTo(releaseX, releaseY);
    ctx.stroke();

    ctx.fillText(`OP${operator}`, 14, 10);

    elm.appendChild(canvas);

    return () => {
      elm.removeChild(canvas);
    };
  }, [operator, envelope]);

  return <Container ref={containerElm} />;
};
