import React, { useState } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { PlaybackButton } from 'ui/layout/Header/PlaybackButton';
import { toVU } from 'ui/typography';

type PlayTarget = 'PATTERN' | 'SEQUENCE' | 'SONG';
type PlayButton = [string, PlayTarget, string]; // [title, PlayTarget, ico text]

const getPlayButtons = (t: TFunction): PlayButton[] => [
  [t('playPattern'), 'PATTERN', 'PTN'],
  [t('playSequence'), 'SEQUENCE', 'SEQ'],
  [t('playSong'), 'SONG', 'SNG'],
];

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: ${toVU(1)};
`;

export const Playback: React.FC = () => {
  const { t } = useTranslation();
  const [played, setPlayed] = useState<PlayTarget | null>(null);
  const [paused, setPaused] = useState<boolean>(false);

  const playButtons = getPlayButtons(t);

  const isPlayed = (target: PlayTarget): boolean => {
    return !paused && target === played;
  };

  const play = (target: PlayTarget): void => {
    setPaused(false);
    setPlayed(target);
  };

  const pause = (): void => {
    setPaused(true);
  };

  const resume = (): void => {
    setPaused(false);
  };

  const stop = (): void => {
    setPaused(false);
    setPlayed(null);
  };

  const togglePlay = (target: PlayTarget) => () => {
    if (target !== played) {
      play(target);
    } else if (paused) {
      resume();
    } else {
      pause();
    }
  };

  return (
    <List>
      {playButtons.map(([title, target, text]) => (
        <li key={text}>
          <PlaybackButton
            title={title}
            ico={isPlayed(target) ? '⏸' : '⏵'}
            text={text}
            onClick={togglePlay(target)}
          />
        </li>
      ))}

      <li>
        <PlaybackButton title={t('stop')} ico="⏹" onClick={stop} />
      </li>
    </List>
  );
};
