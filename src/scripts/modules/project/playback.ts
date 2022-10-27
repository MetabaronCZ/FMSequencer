import { AudioEngine } from 'modules/engine';
import { InstrumentData } from 'modules/project/instrument';
import { PatternData, getSignatureData } from 'modules/project/pattern';

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
    const { steps, signature } = pattern;
    const [beats, division] = getSignatureData(signature);

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

  public playSong(
    song: PatternData[][],
    instruments: InstrumentData[],
    soloed: number | null,
    muted: number[],
    bpm: number,
    time: number
  ): Promise<void> {
    return Promise.all(
      song.map((sequence) =>
        this.playSequence(sequence, instruments, soloed, muted, bpm, time)
      )
    ).then();
  }

  public stop(): void {
    AudioEngine.stop();
  }
}

export const AudioPlayback = new Playback();
