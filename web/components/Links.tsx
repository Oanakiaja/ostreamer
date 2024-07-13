import Link from "next/link";
import Github from "@/assets/svg/github.svg";
import X from "@/assets/svg/x.svg";
// https://simpleicons.org/?q=github

const Links = () => {
  return (
    <>
      <Link
        href={"https://x.com/oanakiaja"}
        target="_blank"
        rel="noreferrer"
        className=" block"
      >
        <X className="ml-4 w-4 h-4 dark:stroke-slate-50 " />
      </Link>
      <Link
        href={"https://github.com/oanakiaja/ostreamer"}
        target="_blank"
        rel="noreferrer"
        className="block"
      >
        <Github className="ml-4 w-4 h-4  dark:fill-slate-50" />
      </Link>
    </>
  );
};
export default Links;
