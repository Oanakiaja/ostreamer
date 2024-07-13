import ControlPanel from "./client/ControlPanel";
import CSRWrapper from "./client/CSRWrapper";

const Footer = () => {
  return (
    <div className="mb-32 flex   lg:mb-0  ">
      <CSRWrapper>
        <ControlPanel />
      </CSRWrapper>
    </div>
  );
};

export default Footer;
