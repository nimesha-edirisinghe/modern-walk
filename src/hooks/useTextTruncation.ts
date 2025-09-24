/**
 * Custom hook to detect if text content is truncated due to CSS line-clamp or overflow
 * @param text - The text content to monitor for truncation
 * @returns [ref, isTextTruncated] - Element ref and truncation state
 */
import { useRef, useEffect, useState } from "react";

export function useTextTruncation<T extends HTMLElement = HTMLElement>(
  text: string
) {
  const elementRef = useRef<T>(null);
  const [isTextTruncated, setIsTextTruncated] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      if (elementRef.current) {
        const element = elementRef.current;
        setIsTextTruncated(element.scrollHeight > element.clientHeight);
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [text]);

  return [elementRef, isTextTruncated] as const;
}
