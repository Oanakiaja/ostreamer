import { useTrack } from "@/hooks/track";
import { Peer } from "@/lib/rtc";
import { cn } from "@/lib/utils";
import { Radio } from "lucide-react";
import { useState, useRef } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { configAtom } from "../WHIPConfig";

const Publish = () => {
  const [publish, setPublish] = useState(false);
  const peerRef = useRef<Peer>(new Peer());

  const { server, bearer } = useAtomValue(configAtom);

  const videoTrack = useTrack("videoinput");
  const audioTrack = useTrack("audioinput");
  const disabled = (!videoTrack && !audioTrack) || !server || !bearer;

  const handleClick = async () => {
    if (disabled) return;
    const toggleTo = !publish;
    setPublish(toggleTo);
    if (toggleTo) {
      videoTrack && peerRef.current.addTransceiverTrack(videoTrack);
      audioTrack && peerRef.current.addTransceiverTrack(audioTrack);

      const result = await peerRef.current.communicateSdp(server, bearer);
      if (!result) {
        setPublish(!toggleTo);
        return;
      }
    } else {
      peerRef.current.cleanup();
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Radio
        className={cn(
          publish ? "text-red-400" : "text-green-400",
          disabled ? "cursor-not-allowed text-gray-400" : "cursor-pointer"
        )}
        onClick={handleClick}
      />
    </div>
  );
};

export default Publish;
