import { DarkMode } from "./client/DarkMode";
import Links from "./Links";

const Header = () => {
  return (
    <div className="z-10 w-full  items-center justify-between font-mono text-sm lg:flex">
      <div className="flex items-center">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          The best web steamer solution &nbsp;
          <code className="font-mono font-bold">ostreamer</code>
        </p>
        <Links />
      </div>
      <DarkMode />
    </div>
  );
};

export default Header;
