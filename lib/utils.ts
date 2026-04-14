import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useRef } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Attach to a container to get swipe-left / swipe-right callbacks. */
export function useSwipe(onLeft: () => void, onRight: () => void, threshold = 40) {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  return {
    onTouchStart: (e: React.TouchEvent) => {
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (startX.current === null || startY.current === null) return;
      const dx = e.changedTouches[0].clientX - startX.current;
      const dy = e.changedTouches[0].clientY - startY.current;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
        if (dx < 0) onLeft();
        else onRight();
      }
      startX.current = null;
      startY.current = null;
    },
  };
}
