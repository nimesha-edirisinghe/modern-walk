"use client";

import { useEffect } from "react";

interface HydrationSafeBodyProps {
  children: React.ReactNode;
}

export function HydrationSafeBody({ children }: HydrationSafeBodyProps) {
  useEffect(() => {
    // Clean up any browser extension attributes that might cause hydration issues
    const body = document.body;

    // List of common browser extension attributes that cause hydration issues
    const extensionAttributes = [
      "cz-shortcut-listen",
      "data-new-gr-c-s-check-loaded",
      "data-gr-ext-installed",
      "spellcheck",
      "data-lt-installed",
      "data-adblock-key",
    ];

    // Remove extension attributes after hydration
    const timer = setTimeout(() => {
      extensionAttributes.forEach((attr) => {
        if (body.hasAttribute(attr)) {
          body.removeAttribute(attr);
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
}
