import { whip } from "./sdp";

class Peer {
  pc: RTCPeerConnection;

  constructor() {
    this.pc = new RTCPeerConnection();
    this.bindEvent();
  }

  private bindEvent() {
    this.pc.onconnectionstatechange = () => {
      console.log("Peer connectionState", this.pc.connectionState);
      this.pc.getTransceivers().forEach((t) => t.stop());
    };
  }

  async communicateSdp(server: string, bearer: string) {
    try {
      const offer = await this.pc.createOffer();
      this.pc.setLocalDescription(offer);
      const sdp = await whip(server)(offer.sdp, {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      });
      await this.pc.setRemoteDescription({ sdp, type: "answer" });
      return true;
    } catch (e) {
      alert("sdp communication error");
      console.error("sdp communication error", e);
      return false;
    }
  }

  addTransceiverTrack(mt: MediaStreamTrack) {
    if (mt.kind === "audio") {
      this.pc.addTransceiver(mt, { direction: "sendonly" });
    } else {
      this.pc.addTransceiver(mt, {
        direction: "sendonly",
        sendEncodings: [
          {
            rid: "high",
          },
          {
            rid: "med",
            scaleResolutionDownBy: 2.0,
          },
          {
            rid: "low",
            scaleResolutionDownBy: 4.0,
          },
        ],
      });
    }
  }

  cleanup() {
    this.pc.close();
  }
}

export { Peer };
