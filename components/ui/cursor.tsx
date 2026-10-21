"use client";

import { useEffect, useRef } from "react";

/**
 * A redrawn pointer that keeps the familiar arrow silhouette — a traditional
 * cursor, finished in the studio's red with a little depth and weight.
 *
 * - Fine pointers only; touch and reduced-motion visitors keep the OS cursor.
 * - The arrow tracks the pointer with a short, weighted ease (a few frames of
 *   lag, never enough to miss a target).
 * - Over links, buttons and cards it lifts 12% and warms up its glow; anything
 *   carrying `data-cursor="Label"` also prints that label beside it.
 * - Over text fields it becomes a drawn I-beam, like a real text cursor.
 * - Pressing compresses it, the way a physical cursor would.
 */

const INTERACTIVE =
  'a, button, [role="button"], summary, label[for], input[type="checkbox"], input[type="radio"], .card, .chip';

export function Cursor() {
  const arrowRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // A real pointing device: an explicit fine pointer, or a device that also
    // has one (hybrid touch laptops), or something reporting no touch at all.
    const fine =
      window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(any-pointer: fine)").matches ||
      navigator.maxTouchPoints === 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const arrow = arrowRef.current;
    const caret = caretRef.current;
    const label = labelRef.current;
    if (!arrow || !caret || !label) return;

    document.documentElement.classList.add("cursor-custom");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;

    let mode: "default" | "hover" | "text" = "default";
    let visible = false;
    let pressed = false;
    let frame = 0;

    const paint = () => {
      // Brief lag on the way to the pointer, then locked on. 0.62 keeps the
      // arrow within a pixel or two of the real position at normal speeds.
      const ease = pressed ? 0.9 : 0.62;
      x += (mouseX - x) * ease;
      y += (mouseY - y) * ease;

      const scale = pressed ? 0.86 : mode === "hover" ? 1.12 : 1;
      // Anchor the scale on the arrow's tip so the hot spot never drifts.
      arrow.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      caret.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -12%)`;

      // Flip the label to the left of the pointer near the right edge.
      const flipped = x > window.innerWidth - 140;
      label.dataset.side = flipped ? "left" : "right";
      label.style.transform = flipped
        ? `translate3d(${x}px, ${y}px, 0) translate(calc(-100% - 12px), 6px)`
        : `translate3d(${x}px, ${y}px, 0) translate(24px, 6px)`;

      frame = requestAnimationFrame(paint);
    };

    /** Work out which cursor shape / state the element under the pointer wants. */
    const readTarget = (target: EventTarget | null) => {
      const el = target instanceof Element ? target : null;
      const field = el?.closest("input, textarea, [contenteditable='true']");
      const isText =
        field instanceof HTMLInputElement
          ? !["checkbox", "radio", "submit", "button", "range", "color"].includes(field.type)
          : Boolean(field);

      const hit = el?.closest(INTERACTIVE) as HTMLElement | null;
      const next: typeof mode = isText ? "text" : hit ? "hover" : "default";

      if (next !== mode) {
        mode = next;
        arrow.dataset.mode = mode;
        caret.dataset.mode = mode;
      }

      const copy = hit?.dataset.cursor ?? "";
      if (label.textContent !== copy) label.textContent = copy;
      label.dataset.show = copy && !isText ? "true" : "false";
    };

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!visible) {
        visible = true;
        arrow.dataset.visible = "true";
        caret.dataset.visible = "true";
        // Start exactly under the pointer so nothing flies in from a corner.
        x = mouseX;
        y = mouseY;
      }
      readTarget(event.target);
    };

    const onDown = () => {
      pressed = true;
      arrow.dataset.pressed = "true";
      caret.dataset.pressed = "true";
    };

    const onUp = () => {
      pressed = false;
      arrow.dataset.pressed = "false";
      caret.dataset.pressed = "false";
    };

    const onLeave = () => {
      visible = false;
      arrow.dataset.visible = "false";
      caret.dataset.visible = "false";
      label.dataset.show = "false";
    };

    const onScroll = () => {
      // The element under a resting pointer has changed; reset to the arrow.
      if (mode !== "default") {
        mode = "default";
        arrow.dataset.mode = "default";
        caret.dataset.mode = "default";
        label.dataset.show = "false";
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    frame = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, []);

  return (
    <div className="cursor-layer" aria-hidden>
      <span ref={labelRef} className="cursor-label" data-show="false" data-side="right" />

      {/* The pointer itself — classic arrow silhouette, redrawn with a rim and shading. */}
      <div ref={arrowRef} className="cursor-arrow" data-mode="default" data-visible="false" data-pressed="false">
        <svg viewBox="0 0 13 20" width="19" height="29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cursor-red" x1="2" y1="1" x2="11" y2="19" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FF5757" />
              <stop offset="0.42" stopColor="#EE0303" />
              <stop offset="1" stopColor="#A30000" />
            </linearGradient>
          </defs>
          {/* a faint dark edge separates the rim from red artwork behind it */}
          <path
            d="M0.6 0.6 L0.6 17.64 L4.54 13.96 L7.05 19.4 L9.94 18.05 L7.42 12.62 L12.4 12.62 Z"
            fill="none"
            stroke="rgba(0,0,0,0.38)"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
          {/* white rim keeps the arrow legible on red artwork and on black */}
          <path
            d="M0.6 0.6 L0.6 17.64 L4.54 13.96 L7.05 19.4 L9.94 18.05 L7.42 12.62 L12.4 12.62 Z"
            fill="#fff"
            stroke="#fff"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M0.6 0.6 L0.6 17.64 L4.54 13.96 L7.05 19.4 L9.94 18.05 L7.42 12.62 L12.4 12.62 Z"
            fill="url(#cursor-red)"
            stroke="#fff"
            strokeWidth="0.55"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Text fields get a drawn I-beam rather than a blob. */}
      <div ref={caretRef} className="cursor-caret" data-mode="default" data-visible="false" data-pressed="false">
        <svg viewBox="0 0 10 20" width="10" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.2 1.1 H8.8 M5 1.1 V18.9 M1.2 18.9 H8.8" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M1.2 1.1 H8.8 M5 1.1 V18.9 M1.2 18.9 H8.8" stroke="#EE0303" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
