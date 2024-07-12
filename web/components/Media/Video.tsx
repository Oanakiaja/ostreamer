"use client";
import { useAtomValue } from "jotai";
import { deviceFamily } from "./Capture";
import { useEffect, useMemo, useRef } from "react";

const Video = () => {
  const videoDevice = useAtomValue(
    // @ts-expect-error
    deviceFamily({
      type: "videoinput",
    })
  );
  const audioDevice = useAtomValue(
    // @ts-expect-error
    deviceFamily({
      type: "audioinput",
    })
  );

  // FIXME: audio track change will refresh media stream
  const mediaStream = useMemo(() => {
    if (!globalThis.MediaStream) return;
    const ms = new MediaStream(
      [videoDevice?.track, audioDevice?.track].filter(
        Boolean
      ) as MediaStreamTrack[]
    );
    return ms;
  }, [videoDevice?.track?.id, audioDevice?.track?.id]);

  const videoRef = useRef<HTMLVideoElement>(null);
  if (videoRef.current && mediaStream) {
    videoRef.current.srcObject = mediaStream;
  }

  return (
    <video
      ref={videoRef}
      className=" rounded-xl border border-blue-950 w-full aspect-video max-w-[1280px] max-h-[720px] bg-transparent"
      autoPlay
    ></video>
  );
};

export default Video;
