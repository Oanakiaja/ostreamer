import { Input } from "@/components/ui/input";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const configAtom = atomWithStorage("whip_config", {
  server: "",
  bearer: "",
});

const WHIPConfig = () => {
  const [{ server, bearer }, setConfig] = useAtom(configAtom);

  return (
    <div className="w-full flex items-center justify-between">
      <Input
        type="url"
        placeholder="whip server, ex: https://xxxxx.com/api/whip"
        className="w-full flex-grow-1 m-4"
        value={server}
        onInput={(e) =>
          setConfig((pre) => ({ ...pre, server: e.currentTarget.value }))
        }
      />
      <Input
        type="text"
        placeholder="bearer"
        className="min-w-12 m-4"
        value={bearer}
        onInput={(e) =>
          setConfig((pre) => ({ ...pre, bearer: e.currentTarget.value }))
        }
      />
    </div>
  );
};

export default WHIPConfig;
