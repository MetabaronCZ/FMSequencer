import React, { useState } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { useAppSelector } from 'store';

import { AudioEngine } from 'modules/engine';
import { PatternData } from 'modules/project/pattern';
import { AudioPlayback } from 'modules/project/playback';

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

export const PlaybackUI: React.FC = () => {
  const { t } = useTranslation();
  const [played, setPlayed] = useState<PlayTarget | null>(null);
  const { project, session } = useAppSelector((state) => state);
  const { tracks, sequences, song, tempo } = project;
  const { pattern, sequence, track, soloedTrack, mutedTracks } = session;

  const getPattern = (trk: number, ptn: number): PatternData => {
    return tracks[trk].patterns[ptn];
  };

  const getSequence = (seq: number): PatternData[] => {
    return sequences[seq].tracks.map(({ pattern: ptn }, i) =>
      getPattern(i, ptn)
    );
  };

  const getSong = (): PatternData[][] => {
    const result: PatternData[][] = [];

    for (const { sequence: seq, repeat } of song.sequences) {
      const seqData = getSequence(seq);

      for (let i = 0; i < repeat; i++) {
        result.push(seqData);
      }
    }
    return result;
  };

  const instruments = tracks.map(({ instrument }) => instrument);
  const currentPattern = getPattern(track, pattern);
  const currentSequence = getSequence(sequence);
  const currentSong = getSong();

  const play = (target: PlayTarget) => () => {
    const time = AudioEngine.getTime();

    switch (target) {
      case 'PATTERN':
        AudioPlayback.playPattern(
          currentPattern,
          instruments[track],
          track,
          tempo,
          time
        );
        break;

      case 'SEQUENCE':
        AudioPlayback.playSequence(
          currentSequence,
          instruments,
          soloedTrack,
          mutedTracks,
          tempo,
          time
        );
        break;

      case 'SONG':
        AudioPlayback.playSong(
          currentSong,
          instruments,
          soloedTrack,
          mutedTracks,
          tempo,
          time
        );
        break;

      default:
        throw new Error(`Could not play: Invalid target "${target}"!`);
    }
    setPlayed(target);
  };

  const stop = (): void => {
    AudioPlayback.stop();
    setPlayed(null);
  };

  const playButtons = getPlayButtons(t);

  return (
    <List>
      {playButtons.map(([title, target, text]) => (
        <li key={text}>
          <PlaybackButton
            title={title}
            ico={target === played ? 'pause' : 'play'}
            text={text}
            onClick={play(target)}
          />
        </li>
      ))}

      <li>
        <PlaybackButton title={t('stop')} ico="stop" onClick={stop} />
      </li>
    </List>
  );
};
