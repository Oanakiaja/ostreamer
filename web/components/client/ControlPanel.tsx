"use client";
import Capture from "./Media/Capture";
import { Camera, CameraOff, Mic, MicOff } from "lucide-react";

const ControlPanel = () => {
  return (
    <>
      <Capture type="videoinput" IconOn={Camera} IconOff={CameraOff} />
      <Capture type="audioinput" IconOn={Mic} IconOff={MicOff} />
    </>
  );
};

export default ControlPanel;
