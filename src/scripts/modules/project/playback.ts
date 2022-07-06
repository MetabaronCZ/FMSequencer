import { AudioEngine } from 'modules/engine';
import { ProjectData } from 'modules/project';
import { InstrumentData } from 'modules/project/instrument';
import { PatternData } from 'modules/project/pattern';
import { SessionData } from 'modules/session';

class Playback {
  public playNote(
    start: number,
    stop: number,
    note: number,
    velocity: number,
    instrument: InstrumentData,
    voiceID: number
  ): Promise<void> {
    return new Promise((resolve) => {
      const voice = AudioEngine.voices[voiceID];

      voice.noteOn(note, velocity, instrument, start);
      voice.noteOff(stop);

      setTimeout(() => resolve(), stop);
    });
  }

  public playPattern(
    pattern: PatternData,
    instrument: InstrumentData,
    voiceID: number,
    bpm: number,
    time: number
  ): Promise<void> {
    const { steps, division, beats } = pattern;
    const beat4on4Length = (60 * 1000 * 1000) / bpm; // in microseconds
    const patternBeatLength = (beat4on4Length * 4) / beats;
    const stepLength = patternBeatLength / division;

    return Promise.all(
      steps.map(({ start, note }) => {
        if (!note) {
          return;
        }
        const startTime = time + start * stepLength;
        const stopTime = startTime + 1 * stepLength;

        this.playNote(
          startTime,
          stopTime,
          note.pitch,
          note.velocity,
          instrument,
          voiceID
        );
      })
    ).then();
  }

  public playSequence(
    sequence: PatternData[],
    instruments: InstrumentData[],
    soloed: number | null,
    muted: number[],
    bpm: number,
    time: number
  ): Promise<void> {
    const data = sequence
      .map<[PatternData, InstrumentData, number]>((pattern, i) => [
        pattern,
        instruments[i],
        i,
      ])
      .filter((item, i) => !muted.includes(i));

    if (null !== soloed) {
      return this.playPattern(
        data[soloed][0],
        data[soloed][1],
        soloed,
        bpm,
        time
      );
    }
    return Promise.all(
      data.map((item) => this.playPattern(...item, bpm, time))
    ).then();
  }

  public playSong(project: ProjectData, session: SessionData): Promise<void> {
    const time = AudioEngine.getTime();
    const { soloedTrack, mutedTracks } = session;
    const tracks = project.tracks.map(({ patterns }) => patterns);
    const instruments = project.tracks.map(({ instrument }) => instrument);

    const slots: PatternData[][] = [];

    // extrackt pattern data and multiply it to "repeat" slot value
    for (const { sequence, repeat } of project.song.sequences) {
      const seqData = project.sequences[sequence];

      for (let i = 0; i < repeat; i++) {
        slots.push(seqData.tracks.map(({ pattern }, t) => tracks[t][pattern]));
      }
    }

    return Promise.all(
      slots.map((sequence) =>
        this.playSequence(
          sequence,
          instruments,
          soloedTrack,
          mutedTracks,
          project.tempo,
          time
        )
      )
    ).then();
  }
}

export const PlaybackEngine = new Playback();
