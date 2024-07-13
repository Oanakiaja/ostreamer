import CSRWrapper from "./client/CSRWrapper";
import Video from "./client/Media/Video";

const Content = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <CSRWrapper>
        <Video />
      </CSRWrapper>
    </>
  );
};

export default Content;
