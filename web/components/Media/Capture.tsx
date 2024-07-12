"use client";
import { atom, useAtom, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { jGet } from "@/jotai/utils";
import { cx } from "classix";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Device, deviceUtils } from "@/lib/device";

const DeviceListAtom = atom<MediaDeviceInfo[]>([]);
const queryDeviceListAtom = atom(null, async (get, set) => {
  let devices = get(DeviceListAtom);
  if (devices.length === 0) {
    devices = await deviceUtils.enumerateDevices();
    set(DeviceListAtom, devices);
  }
  return devices;
});

const getDeviceListByType = (type: MediaDeviceInfo["kind"]) => {
  return deviceUtils.getDeviceListByType(jGet(DeviceListAtom), type);
};

const getDeviceById = (id: MediaDeviceInfo["deviceId"]) => {
  return deviceUtils.getDeviceById(jGet(DeviceListAtom), id);
};

export const deviceFamily = atomFamily(
  ({ type: _, device }: { type: MediaDeviceInfo["kind"]; device?: Device }) =>
    atom(device),
  (a, b) => a.type === b.type
);

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
      device: { type, list: options },
    })
  );

  const handleGetUserMedia = async () => {
    await setDeviceList();
    const typeDeviceList = getDeviceListByType(type);
    if (typeDeviceList.length === 0) {
      return;
    }
    if (!typeDeviceList?.[0].deviceId) {
      if (!(await deviceUtils.grantPermissionByDeviceType(type))) {
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

    if (!curDeviceId) {
      curDeviceId = deviceUtils.getDefaultDeviceId(jGet(DeviceListAtom), type);
    }
    handleSetDeviceById(curDeviceId!);
  };

  const stopCapture = () => {
    device?.track?.stop?.();
    setDevice((pre) => ({ ...pre!, track: undefined }));
  };

  const handleSetDeviceById = async (deviceId: string) => {
    const cur = getDeviceById(deviceId)!;
    const track = await deviceUtils.getDeviceTrackById(type, cur?.deviceId);
    device?.track?.stop?.();
    setDevice((pre) => ({ ...pre!, cur, track }));
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
