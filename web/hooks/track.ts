import { deviceFamily } from "@/components/client/Media/Capture";
import { useAtomValue } from "jotai";

export const useTrack = (type: MediaDeviceKind) =>
  useAtomValue(
    deviceFamily({
      type,
    })
  )?.track;
