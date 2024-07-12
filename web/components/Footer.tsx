import Capture from "./Media/Capture";

const Footer = () => {
  return (
    <div className="mb-32 flex justify-between w-full lg:mb-0  ">
      <Capture type="videoinput" text="Video" />
      <Capture type="audioinput" text="Mic" />
    </div>
  );
};

export default Footer;
