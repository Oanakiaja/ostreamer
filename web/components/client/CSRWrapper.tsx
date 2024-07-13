"use client";
import { useState, useEffect } from "react";

const CSRWrapper = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <></>;
  return children;
};

export default CSRWrapper;
