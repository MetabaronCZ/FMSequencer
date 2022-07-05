import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { AlgorithmID, OPERATOR_COUNT } from 'modules/engine/config';
import { algorithmConfig } from 'modules/project/instrument/algorithm';

import { defaultTheme } from 'ui/theme';

const opSize = 15;
const opPadding = 5;
const canvasSize = OPERATOR_COUNT * (opSize + opPadding) + opPadding;
const lineColor = defaultTheme.color.white;

const Container = styled.div`
  width: ${canvasSize}px;
  height: ${canvasSize}px;
  background: ${({ theme }) => theme.color.black};
`;

interface Props {
  readonly algorithm: AlgorithmID;
}

export const AlgorithmCanvas: React.FC<Props> = ({ algorithm }) => {
  const containerElm = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elm = containerElm.current;

    if (!elm) {
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    canvas.style.width = canvasSize + 'px';
    canvas.style.height = canvasSize + 'px';

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error(
        'Could not initialize Algorithm canvas: 2D context not supported!'
      );
    }
    const algo = algorithmConfig[algorithm];
    ctx.translate(0.5, 0.5);

    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;
    ctx.font = '11px "RobotoMono", sans-serif';
    ctx.textAlign = 'center';
    ctx.lineWidth = 1;
    ctx.lineCap = 'butt';

    const algoLineTips: [[number, number], [number, number]][] = [];

    algo.nodes.forEach(([x, y], i) => {
      let x0 = x * (opSize + opPadding);
      let y0 = y * (opSize + opPadding);
      x0 += opPadding;
      y0 = canvasSize - y0 - (opSize + opPadding);

      algoLineTips.push([
        [x0 + opSize / 2, y0],
        [x0 + opSize / 2, y0 + opSize],
      ]);

      ctx.strokeRect(x0, y0, opSize, opSize);
      ctx.fillText(`${i + 1}`, x0 + opSize / 2, y0 + opSize / 2 + 4);
    });

    ctx.lineWidth = 1;

    algo.lines.forEach(([from, to]) => {
      const fromBottom = algoLineTips[from][1];
      const toTop = algoLineTips[to][0];
      ctx.moveTo(fromBottom[0], fromBottom[1]);
      ctx.lineTo(toTop[0], toTop[1]);
      ctx.stroke();
    });

    elm.appendChild(canvas);

    return () => {
      elm.removeChild(canvas);
    };
  }, [algorithm]);

  return <Container ref={containerElm} />;
};
