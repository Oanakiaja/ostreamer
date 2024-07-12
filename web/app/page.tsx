import Content from "@/components/Content";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <Content />
      <Footer
      // list={[
      // {
      //   name: "Local Capture",
      //   description: "getUserMedia, getDisplayMedia, [chrome.desktopCapture]",
      // },
      // { name: "Remote Input", description: ".flv .hls .mp4 .webp .ogg..." },
      // { name: "Processing", description: "wasm  webgpu ai" },
      // { name: "Recording", description: "MediaRecorder" },
      // { name: "Codecs", description: "WebCodecs ffmpeg" },
      // { name: "Singaling", description: "WHIP" },
      // { name: "Transport", description: "WebTransport Quic Http3, WebRTC" },
      // {name: "Transcode", description: "ffmpeg"},
      // {
      //   name: "Consuming",
      //   description: "WebRTC, .flv .hls",
      // },
      // ]}
      />
    </main>
  );
}
