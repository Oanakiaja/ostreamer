export type Device = {
  type: MediaDeviceInfo["kind"];
  list: MediaDeviceInfo[];
  cur?: MediaDeviceInfo;
  track?: MediaStreamTrack;
};

export const TypeContrastsDefault: Record<
  "audio" | "video",
  MediaTrackConstraints
> = {
  video: {
    aspectRatio: {
      ideal: 16 / 9,
    },
  },
  audio: {},
};

const enumerateDevices = () => navigator.mediaDevices.enumerateDevices();

const getDeviceListByType = (
  deviceList: MediaDeviceInfo[],
  type: MediaDeviceInfo["kind"]
) => deviceList.filter((v) => v.kind === type && v.deviceId !== "default");

const getDeviceById = (
  deviceList: MediaDeviceInfo[],
  id: MediaDeviceInfo["deviceId"]
) => deviceList.find((v) => v.deviceId === id);

const getUserMediaType = (type: MediaDeviceInfo["kind"]) =>
  type.substring(0, 5) as "audio" | "video";

const grantPermissionByDeviceType = async (type: MediaDeviceInfo["kind"]) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      [getUserMediaType(type)]: true,
    });
    if (!stream.getTracks()?.length) {
      alert("未获取到摄像头权限，请检查摄像头权限设置");
      return false;
    }
    stream.getTracks().forEach((v) => v.stop());
    return true;
  } catch (e: unknown) {
    if (e instanceof Error) {
      if (/permission/i.test(e.message)) {
        alert("未获取到摄像头权限，请检查摄像头权限设置");
      }
    }
    return false;
  }
};

const getDeviceTrackById = async (
  type: MediaDeviceInfo["kind"],
  deviceId: string
) => {
  const ms = await navigator.mediaDevices.getUserMedia({
    /** video audio */
    [deviceUtils.getUserMediaType(type)]: {
      ...TypeContrastsDefault[deviceUtils.getUserMediaType(type)],
      deviceId,
    },
  });
  const track = ms.getTracks()[0];
  return track;
};

const getDefaultDeviceId = (
  deviceList: MediaDeviceInfo[],
  type: MediaDeviceInfo["kind"]
) => {
  const defaultDevice = deviceList.find(
    (v) => v.kind === type && v.deviceId === "default"
  );

  if (defaultDevice) {
    const deviceId = deviceList.find(
      (v) =>
        v.groupId === defaultDevice.groupId &&
        v.kind == defaultDevice.kind &&
        v.deviceId !== defaultDevice.deviceId
    )?.deviceId;
    if (deviceId) return deviceId;
  }
  return deviceList.find((v) => v.kind === type)?.deviceId;
};

export const deviceUtils = {
  enumerateDevices,
  getDeviceListByType,
  getDeviceById,
  getUserMediaType,
  grantPermissionByDeviceType,
  getDeviceTrackById,
  getDefaultDeviceId,
};
