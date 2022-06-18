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

const canvasWidth = 150;
const canvasHeight = 100;
const padding = 10;
const lineColor = defaultTheme.color.white;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: ${({ theme }) => theme.color.black};
`;

interface Props {
  readonly envelope: EnvelopeData;
}

export const EnvelopeCanvas: React.FC<Props> = ({ envelope }) => {
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
    const heightPart = canvasHeight - 2 * padding;

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
    ctx.lineCap = 'butt';
    ctx.lineWidth = 1;

    ctx.moveTo(startX, startY);
    ctx.lineTo(attackX, attackY);
    ctx.lineTo(decayX, decayY);
    ctx.lineTo(sustainX, sustainY);
    ctx.lineTo(releaseX, releaseY);
    ctx.stroke();

    elm.appendChild(canvas);

    return () => {
      elm.removeChild(canvas);
    };
  }, [envelope]);

  return <Container ref={containerElm} />;
};
