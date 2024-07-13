import { Nullable } from "@/types";

class Stream {
  ms: MediaStream;

  constructor(tracks: (MediaStreamTrack | Nullable)[]) {
    this.ms = new MediaStream(tracks.filter(Boolean) as MediaStreamTrack[]);
  }

  static isSupported() {
    return !!globalThis.MediaStream;
  }

  replaceTrack(track?: MediaStreamTrack) {
    if (!track?.id) {
      return;
    }
    this.ms.addTrack(track);

    const tracks = this.ms.getTracks();
    tracks.forEach((cur) => {
      if (cur.kind !== track.kind || cur.id === track.id) return;
      cur.stop();
      this.ms.removeTrack(cur);
    });
  }
}

export default Stream;
