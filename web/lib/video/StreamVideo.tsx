import { memo, useEffect, useRef } from "react";
import Stream from "../stream";
import { cn } from "../utils";

type Props = {
  videoTrack?: MediaStreamTrack;
  audioTrack?: MediaStreamTrack;
  className: string;
};

const StreamVideo = memo(({ videoTrack, audioTrack, className }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<Stream>(new Stream([]));

  if (videoRef.current && videoRef.current.srcObject !== streamRef.current.ms) {
    videoRef.current.srcObject = streamRef.current.ms;
  }
  streamRef.current.replaceTrack(videoTrack);
  streamRef.current.replaceTrack(audioTrack);

  console.log("track", streamRef.current);

  return (
    <video
      className={cn(className, `w-full h-full`)}
      ref={videoRef}
      autoPlay
      muted
    ></video>
  );
});

StreamVideo.displayName = "StreamVideo";
export default StreamVideo;
