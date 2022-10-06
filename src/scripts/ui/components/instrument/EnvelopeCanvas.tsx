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
import { toVU } from 'ui/typography';

const canvasWidth = 100;
const canvasHeight = 60;
const padding = 10;
const lineColor = defaultTheme.color.white;

const Container = styled.div`
  margin: 0 ${toVU(-0.5)} ${toVU(-0.5)};
  background: ${({ theme }) => theme.color.black};
`;

interface Props {
  readonly envelope: EnvelopeData;
}

export const EnvelopeCanvas: React.FC<Props> = ({ envelope }) => {
  const containerElm = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elm = containerElm.current;

    if (!elm) {
      return;
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error(
        'Could not initialize Algorithm canvas: 2D context not supported!'
      );
    }
    const width = elm.offsetWidth;
    const height = width / (canvasWidth / canvasHeight);

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const attack = envelope.attack / ENVELOPE_ATTACK_MAX;
    const decay = envelope.decay / ENVELOPE_DECAY_MAX;
    const sustain = envelope.sustain / ENVELOPE_SUSTAIN_MAX;
    const release = envelope.release / ENVELOPE_RELEASE_MAX;

    const widthPart = (width - 2 * padding) / 4;
    const heightPart = height - 2 * padding;

    const startX = padding;
    const startY = height - padding;
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
    ctx.lineWidth = 1;
    ctx.lineCap = 'butt';

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
