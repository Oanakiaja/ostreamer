"use client";
import { atom, useAtom, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { cx } from "classix";
import { jGet } from "@/jotai/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TypeContrastsDefault: Record<"audio" | "video", MediaTrackConstraints> = {
  video: {
    aspectRatio: {
      ideal: 16 / 9,
    },
  },
  audio: {},
};

const DeviceListAtom = atom<MediaDeviceInfo[]>([]);
const queryDeviceListAtom = atom(null, async (get, set) => {
  const devices = get(DeviceListAtom);
  if (devices.length === 0) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    set(DeviceListAtom, devices);
  }
  return devices;
});

const getDeviceListByType = (type: MediaDeviceInfo["kind"]) => {
  return jGet(DeviceListAtom).filter(
    (v) => v.kind === type && v.deviceId !== "default"
  );
};

const getDeviceById = (id: MediaDeviceInfo["deviceId"]) => {
  return jGet(DeviceListAtom).find((v) => v.deviceId === id);
};

type Device = {
  type: MediaDeviceInfo["kind"];
  list: MediaDeviceInfo[];
  cur: MediaDeviceInfo | null;
  track: MediaStreamTrack | null;
};

export const deviceFamily = atomFamily(
  ({ type: _, device }: { type: MediaDeviceInfo["kind"]; device: Device }) =>
    atom(device),
  (a, b) => a.type === b.type
);

const getUserMediaType = (type: MediaDeviceInfo["kind"]) =>
  type.substring(0, 5) as "audio" | "video";

const grantPermissionByDeviceType = async (type: MediaDeviceInfo["kind"]) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      [getUserMediaType(type)]: true,
    });
    if (!stream.getTracks()?.length) {
      console.log("todo: 提示");
      return false;
    }
    stream.getTracks().forEach((v) => v.stop());
    return true;
  } catch (e: unknown) {
    if (e instanceof Error) {
      if (/permission/i.test(e.message)) {
        alert("请在操作系统处授予浏览器权限，并重启浏览器");
      }
    }
    return false;
  }
};

const Capture = ({
  type,
  text,
}: {
  type: MediaDeviceInfo["kind"];
  text: string;
}) => {
  const setDeviceList = useSetAtom(queryDeviceListAtom);
  const options = getDeviceListByType(type);

  const [device, setDevice] = useAtom(
    deviceFamily({
      type,
      device: { type, list: options, cur: null, track: null },
    })
  );

  const handleGetUserMedia = async () => {
    await setDeviceList();
    const typeDeviceList = getDeviceListByType(type);
    if (typeDeviceList.length === 0) {
      return;
    }
    if (!typeDeviceList?.[0].deviceId) {
      // FIXME: granted process may have bug 😭
      // Maybe need ask for device permission
      if (!(await grantPermissionByDeviceType(type))) {
        return;
      }
      handleGetUserMedia();
      return;
    }
    let curDeviceId = device?.cur?.deviceId;

    if (device?.cur?.deviceId && device.track) {
      stopCapture();
      return;
    }

    if (!curDeviceId && typeDeviceList?.[0].deviceId) {
      curDeviceId = typeDeviceList?.[0].deviceId;
    }

    handleSetDeviceById(curDeviceId!);
  };

  const stopCapture = () => {
    device?.track?.stop?.();
    setDevice((pre) => ({ ...pre, track: null }));
  };

  const handleSetDeviceById = async (deviceId: string) => {
    const cur = getDeviceById(deviceId)!;
    const ms = await navigator.mediaDevices.getUserMedia({
      /** video audio */
      [getUserMediaType(type)]: {
        ...TypeContrastsDefault[getUserMediaType(type)],
        deviceId: cur?.deviceId,
      },
    });
    const track = ms.getTracks()[0];
    device?.track?.stop?.();
    setDevice((pre) => ({ ...pre, cur, track }));
  };

  return (
    <div className=" flex-col lg:flex-row ">
      <p className="m-0 w-[30ch] max-w-[30ch] text-sm opacity-50 ">
        <button
          onClick={handleGetUserMedia}
          className={cx(
            `w-full pd-4 border pd-10 cursor-pointer
            border-blue-200 rounded-lg hover:border-blue-600
            hover:text-blue-600 mb-4`,
            device?.track ? "border-blue-600" : ""
          )}
        >
          {text}
        </button>

        <Select
          value={device?.cur?.deviceId}
          onValueChange={(deviceId) => {
            handleSetDeviceById(deviceId);
          }}
          disabled={!options?.length}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select ${type}`} />
          </SelectTrigger>
          {Boolean(options?.length) && (
            <SelectContent>
              {options?.map((device: MediaDeviceInfo) => (
                <SelectItem key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </SelectItem>
              ))}
            </SelectContent>
          )}
        </Select>
      </p>
    </div>
  );
};

export default Capture;
