"use client";
import { useEffect } from "react";
import Stream from "../stream";
import { cn } from "../utils";

type AttributeMap = {
  audioTrack: MediaStreamTrack;
  videoTrack: MediaStreamTrack;
  class: string;
};

class StreamVideoElement extends HTMLElement {
  _video: HTMLVideoElement;
  // _canvas: HTMLCanvasElement;
  // _ctx: CanvasRenderingContext2D;
  _stream: Stream;

  constructor() {
    super();

    this._video = document.createElement("video");
    // this._canvas = document.createElement("canvas");
    // this._ctx = this._canvas.getContext("2d")!;
    this._stream = new Stream([]);

    this._video.autoplay = true;
    this._video.muted = true;
    this._video.srcObject = this._stream.ms;

    this.attachShadow({ mode: "open" });
    this.shadowRoot!.appendChild(this._video);
  }

  static get observedAttributes() {
    return ["audioTrack", "videoTrack", "className"];
  }
  // FIXME: 查查为何 不响应
  attributeChangedCallback<T extends keyof AttributeMap>(
    name: T,
    oldValue: AttributeMap[T],
    newValue: AttributeMap[T]
  ) {
    console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}.`);
    if (name === "audioTrack") {
      this._stream.replaceTrack(newValue as MediaStreamTrack);
    } else if (name === "videoTrack") {
      this._stream.replaceTrack(newValue as MediaStreamTrack);
    } else if (name === "class") {
      this._video.setAttribute(
        "class",
        cn(oldValue as string, newValue as string)
      );
    }
  }

  connectedCallback() {
    console.log("stream video element added to page.");
  }

  disconnectedCallback() {
    console.log("stream video element removed from page.");
  }
}

export const useLoadStreamVideoElement = () => {
  useEffect(() => {
    import("@/lib/video/stream-video");
  }, []);
};

customElements.define("stream-video", StreamVideoElement);
