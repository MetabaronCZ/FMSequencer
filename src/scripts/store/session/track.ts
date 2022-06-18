import { PayloadAction } from '@reduxjs/toolkit';
import { SessionReducer } from 'store/session';

type TrackSoloAction = PayloadAction<number>;
type TrackMuteAction = PayloadAction<number>;

export type SessionTrackActions = TrackSoloAction | TrackMuteAction;

const trackMute: SessionReducer<TrackMuteAction> = (state, action) => {
  const track = action.payload;

  if (state.mutedTracks.includes(track)) {
    state.mutedTracks = state.mutedTracks.filter((mut) => track !== mut);
  } else {
    state.mutedTracks.push(track);
  }
};

const trackSolo: SessionReducer<TrackSoloAction> = (state, action) => {
  const track = action.payload;
  state.soloedTrack = track !== state.soloedTrack ? track : null;
};

export const sessionTrackReducer = {
  trackMute,
  trackSolo,
};
