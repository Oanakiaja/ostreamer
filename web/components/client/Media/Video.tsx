"use client";
import { useAtomValue } from "jotai";
import { deviceFamily } from "./Capture";
import StreamVideo from "@/lib/video/StreamVideo";
import { cn } from "@/lib/utils";

const Video = () => {
  const videoTrack = useAtomValue(
    deviceFamily({
      type: "videoinput",
    })
  )?.track;
  const audioTrack = useAtomValue(
    deviceFamily({
      type: "audioinput",
    })
  )?.track;

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
