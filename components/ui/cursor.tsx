"use client";

import { useEffect, useRef } from "react";

/**
 * A redrawn pointer that keeps the familiar arrow silhouette — a traditional
 * arrow, shaped soft and rounded and shaded like a small 3D object: red gradient
 * face, gloss along the top edge, deep red pooling in the tail, and a faint red
 * glow. Reads on white pages, dark artwork and red buttons alike.
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

      {/* The pointer itself — a soft, rounded arrow with a red gradient and gloss. */}
      <div ref={arrowRef} className="cursor-arrow" data-mode="default" data-visible="false" data-pressed="false">
        <svg viewBox="0 0 24 26" width="22" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cur-face" x1="7" y1="2" x2="15" y2="25" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FF8A8A" />
              <stop offset="0.32" stopColor="#FF4A4A" />
              <stop offset="0.62" stopColor="#EE0303" />
              <stop offset="1" stopColor="#9E0000" />
            </linearGradient>
            {/* sheen: light along the top edge, shade pooling in the tail */}
            <linearGradient id="cur-gloss" x1="12" y1="1" x2="8" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="0.34" stopColor="#FFFFFF" stopOpacity="0.12" />
              <stop offset="0.62" stopColor="#000000" stopOpacity="0" />
              <stop offset="1" stopColor="#5A0000" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <path
            d="M3 2 L2.2 18.6 L8.4 14 L10.6 22.6 L14.6 20.8 L11.6 12.6 L21.4 11.8 Z"
            fill="url(#cur-face)"
            stroke="url(#cur-face)"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M3 2 L2.2 18.6 L8.4 14 L10.6 22.6 L14.6 20.8 L11.6 12.6 L21.4 11.8 Z"
            fill="url(#cur-gloss)"
            stroke="url(#cur-gloss)"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Text fields get a drawn I-beam rather than a blob. */}
      <div ref={caretRef} className="cursor-caret" data-mode="default" data-visible="false" data-pressed="false">
        <svg viewBox="0 0 10 21" width="10" height="21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cur-caret" x1="2" y1="0" x2="8" y2="21" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FF5A5A" />
              <stop offset="1" stopColor="#B00000" />
            </linearGradient>
          </defs>
          <path
            d="M1.4 1.6 H8.6 M5 1.6 V19.4 M1.4 19.4 H8.6"
            stroke="url(#cur-caret)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
