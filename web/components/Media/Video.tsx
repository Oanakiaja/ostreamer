"use client";
import { useAtomValue } from "jotai";
import { deviceFamily } from "./Capture";
import { useEffect, useMemo, useRef } from "react";
import Stream from "@/lib/stream";
import { Device } from "@/lib/device";

const Video = () => {
  const videoDevice = useAtomValue(
    deviceFamily({
      type: "videoinput",
    })
  );
  const audioDevice = useAtomValue(
    deviceFamily({
      type: "audioinput",
    })
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  if (videoRef.current) {
    videoRef.current.srcObject = new Stream([
      videoDevice?.track,
      audioDevice?.track,
    ]).ms;
  }

  // FIXME: video 闪烁
  useEffect(() => {
    addOrReplaceTrack(videoDevice, videoDevice?.track);
  }, [videoDevice]);

  useEffect(() => {
    addOrReplaceTrack(audioDevice, audioDevice?.track);
  }, [audioDevice]);

  const addOrReplaceTrack = (device?: Device, newTrack?: MediaStreamTrack) => {
    const ms = videoRef.current?.srcObject;
    if (!(ms instanceof MediaStream) || !device?.track?.id || !newTrack?.id) {
      return;
    }
    // ? 为什么不用 stop ，去查证一下
    // const track = ms.getTrackById(device?.track?.id);
    // track?.stop?.();
    // track && ms.removeTrack(track);
    ms.addTrack(newTrack);
  };

  return (
    <video
      ref={videoRef}
      className=" rounded-xl border border-blue-950 w-full aspect-video max-w-[1280px] max-h-[720px] bg-transparent"
      autoPlay
    ></video>
  );
};

export default Video;
