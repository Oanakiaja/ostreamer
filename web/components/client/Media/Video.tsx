"use client";
import StreamVideo from "@/lib/video/StreamVideo";
import { cn } from "@/lib/utils";
import { useTrack } from "@/hooks/track";

const Video = () => {
  const videoTrack = useTrack("videoinput");
  const audioTrack = useTrack("audioinput");

  return (
    <div
      className={
        "rounded-xl border border-blue-950 w-full aspect-video max-w-[1280px] max-h-[720px] bg-transparent"
      }
    >
      <StreamVideo
        videoTrack={videoTrack}
        audioTrack={audioTrack}
        className={cn("rounded-xl", videoTrack ? "visible" : "hidden")}
      />
    </div>
  );
};

export default Video;
