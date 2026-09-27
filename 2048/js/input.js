// Input adapter: subscribes to keyboard and touch events, normalises them
// into one of four direction strings, and dispatches them to a handler.

import { Direction } from './game.js';

const KEY_TO_DIRECTION = Object.freeze({
  ArrowLeft: Direction.Left,
  ArrowRight: Direction.Right,
  ArrowUp: Direction.Up,
  ArrowDown: Direction.Down,
  KeyA: Direction.Left,
  KeyD: Direction.Right,
  KeyW: Direction.Up,
  KeyS: Direction.Down,
});

const MIN_SWIPE_PX = 24;

export function attachInput(target, onDirection) {
  const onKey = (event) => {
    const dir = KEY_TO_DIRECTION[event.code] || KEY_TO_DIRECTION[event.key];
    if (!dir) return;
    event.preventDefault();
    onDirection(dir);
  };

  let activeTouchId = null;
  let touchStart = null;
  const onTouchStart = (event) => {
    if (event.touches.length !== 1) {
      activeTouchId = null;
      touchStart = null;
      return;
    }
    const t = event.touches[0];
    activeTouchId = t.identifier;
    touchStart = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (event) => {
    if (!touchStart) return;
    const t = [...event.changedTouches].find((ct) => ct.identifier === activeTouchId);
    if (!t) return;
    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;
    touchStart = null;
    activeTouchId = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < MIN_SWIPE_PX) return;
    const dir = Math.abs(dx) > Math.abs(dy)
      ? (dx > 0 ? Direction.Right : Direction.Left)
      : (dy > 0 ? Direction.Down : Direction.Up);
    event.preventDefault();
    onDirection(dir);
  };

  window.addEventListener('keydown', onKey);
  target.addEventListener('touchstart', onTouchStart, { passive: true });
  target.addEventListener('touchend', onTouchEnd, { passive: false });

  return () => {
    window.removeEventListener('keydown', onKey);
    target.removeEventListener('touchstart', onTouchStart);
    target.removeEventListener('touchend', onTouchEnd);
  };
}
