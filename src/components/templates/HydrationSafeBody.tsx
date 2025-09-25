"use client";

import { useEffect } from "react";

interface HydrationSafeBodyProps {
  children: React.ReactNode;
}

export function HydrationSafeBody({ children }: HydrationSafeBodyProps) {
  useEffect(() => {
    const body = document.body;
    const extensionAttributes = [
      "cz-shortcut-listen",
      "data-new-gr-c-s-check-loaded",
      "data-gr-ext-installed",
      "spellcheck",
      "data-lt-installed",
      "data-adblock-key",
    ];

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
