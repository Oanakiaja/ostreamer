import type React from "react";
import { type ClassValue } from "clsx";

declare namespace JSX {
  interface IntrinsicElements {
    "stream-video": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      videoTrack?: MediaStreamTrack;
      audioTrack?: MediaStreamTrack;
      className?: ClassValue;
    };
  }
}
