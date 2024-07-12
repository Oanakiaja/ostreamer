import { Nullable } from "@/types";


class Stream {
  ms: MediaStream;

  constructor(tracks: (MediaStreamTrack | Nullable)[]) {
    this.ms = new MediaStream(tracks.filter(Boolean) as MediaStreamTrack[]);
  }

  static isSupported() {
    return !!globalThis.MediaStream;
  }
}

export default Stream;
