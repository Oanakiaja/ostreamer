export const whip =
  (server: string) =>
  async (sdp: RTCSessionDescriptionInit["sdp"], options: RequestInit) => {
    const response = await fetch(
      server,
      Object.assign(
        {
          method: "POST",
          body: sdp,
          headers: {
            "Content-Type": "application/sdp",
          },
        },
        options
      )
    );
    return response.text();
  };
