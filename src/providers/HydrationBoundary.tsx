"use client";

import { useEffect, useState } from "react";

interface HydrationBoundaryProps {
  children: React.ReactNode;
}

export function HydrationBoundary({ children }: HydrationBoundaryProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated after the first render
    setIsHydrated(true);

    // Clean up browser extension attributes
    const cleanupExtensionAttributes = () => {
      const body = document.body;
      const html = document.documentElement;

      // Common browser extension attributes that cause hydration issues
      const attributesToRemove = [
        "cz-shortcut-listen",
        "data-new-gr-c-s-check-loaded",
        "data-gr-ext-installed",
        "data-lt-installed",
        "data-adblock-key",
        "data-darkreader-mode",
        "data-darkreader-scheme",
        "spellcheck",
      ];

      attributesToRemove.forEach((attr) => {
        if (body.hasAttribute(attr)) {
          body.removeAttribute(attr);
        }
        if (html.hasAttribute(attr)) {
          html.removeAttribute(attr);
        }
      });
    };

    // Clean up immediately and after a short delay
    cleanupExtensionAttributes();
    const timer = setTimeout(cleanupExtensionAttributes, 100);

    // Set up a mutation observer to clean up any future extension modifications
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          const target = mutation.target as Element;
          const attrName = mutation.attributeName;

          if (
            attrName &&
            (attrName.includes("cz-") ||
              attrName.includes("data-gr-") ||
              attrName.includes("data-lt-") ||
              attrName.includes("data-adblock-") ||
              attrName.includes("data-darkreader-"))
          ) {
            target.removeAttribute(attrName);
          }
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: [
        "cz-shortcut-listen",
        "data-new-gr-c-s-check-loaded",
        "data-gr-ext-installed",
      ],
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}
