"use client";
import Capture from "./Media/Capture";
import { Camera, CameraOff, Mic, MicOff } from "lucide-react";
import Publish from "./Media/Publish";
import WHIPConfig from "./WHIPConfig";

const ControlPanel = () => {
  return (
    <div className="w-full">
      <div className="w-full flex">
        <WHIPConfig></WHIPConfig>
      </div>
      <div className=" flex items-center justify-center">
        <p className="m-0 w-[10ch] max-w-[30ch] text-sm opacity-50  flex border mr-8">
          <Capture type="videoinput" IconOn={Camera} IconOff={CameraOff} />
        </p>
        <p className="m-0 w-[10ch] max-w-[30ch] text-sm opacity-50  flex border mr-8">
          <Capture type="audioinput" IconOn={Mic} IconOff={MicOff} />
        </p>
        <p className="m-0 max-w-[30ch] text-sm  flex  mr-8">
          <Publish />
        </p>
      </div>
    </div>
  );
};

export default ControlPanel;
