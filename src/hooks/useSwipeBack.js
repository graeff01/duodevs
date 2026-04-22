import { useRef, useCallback } from 'react';

export function useSwipeBack(onBack, enabled = true) {
  const startX = useRef(null);
  const startY = useRef(null);

  const onTouchStart = useCallback((e) => {
    if (!enabled) return;
    const t = e.touches[0];
    // Only trigger from left edge (< 40px from left)
    if (t.clientX < 40) {
      startX.current = t.clientX;
      startY.current = t.clientY;
    }
  }, [enabled]);

  const onTouchEnd = useCallback((e) => {
    if (startX.current === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX.current;
    const dy = Math.abs(t.clientY - startY.current);
    // Swipe right > 80px, mostly horizontal
    if (dx > 80 && dy < 70) onBack();
    startX.current = null;
    startY.current = null;
  }, [onBack]);

  const onTouchMove = useCallback((e) => {
    if (startX.current === null) return;
    const t = e.touches[0];
    const dx = t.clientX - startX.current;
    const dy = Math.abs(t.clientY - startY.current);
    // Cancel if mostly vertical scroll
    if (dy > dx) { startX.current = null; }
  }, []);

  return { onTouchStart, onTouchEnd, onTouchMove };
}
