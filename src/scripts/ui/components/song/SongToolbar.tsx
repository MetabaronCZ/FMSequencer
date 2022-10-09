import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import { SONG_LENGTH_MAX } from 'modules/project/config';
import { SongData } from 'modules/project/song';

import { IcoButton } from 'ui/common/IcoButton';
import { Toolbar, ToolbarItem } from 'ui/common/Toolbar';
import { confirm } from 'ui/dialog';

interface Props {
  readonly song: SongData;
}

export const SongToolbar: React.FC<Props> = ({ song }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { clearSong, addSongSequence } = projectSlice.actions;

  const clear = confirm(t('confirmSongClear'), () => {
    dispatch(clearSong());
  });

  return (
    <Toolbar>
      <ToolbarItem>{t('song')}</ToolbarItem>

      <ToolbarItem isActions>
        {song.sequences.length < SONG_LENGTH_MAX && (
          <IcoButton
            ico="plus"
            title={t('insert')}
            onClick={() => dispatch(addSongSequence())}
          />
        )}

        <IcoButton ico="cross" title={t('clear')} onClick={clear} />
      </ToolbarItem>
    </Toolbar>
  );
};
