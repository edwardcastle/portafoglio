"use client";

import { useEffect } from "react";

export function SsrCleanup() {
  useEffect(() => {
    // Don't remove the <style> from the DOM — React still tracks it and
    // reconciliation will fail on client-side navigation. Clearing its
    // contents disables the SSR visibility override without breaking React.
    const el = document.getElementById("ssr-visible");
    if (el) el.textContent = "";
  }, []);
  return null;
}
