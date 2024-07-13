"use client";
import { store } from "@/lib/jotai";
import { Provider } from "jotai";
import { useState, useEffect } from "react";

const CSRWrapper = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <></>;
  return <Provider store={store}>{children}</Provider>;
};

export default CSRWrapper;
