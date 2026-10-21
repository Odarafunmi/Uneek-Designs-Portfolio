"use client";

import { useEffect, useRef } from "react";

/**
 * A red, dimensional cursor: a glossy core that leads, and a ring that trails.
 *
 * - Fine pointers only — touch and reduced-motion visitors keep the native cursor.
 * - The ring eases toward the core, so movement feels weighted rather than glued.
 * - Hovering anything interactive opens the ring; hovering something with
 *   `data-cursor="Label"` also prints that label beside it.
 * - Over text fields it collapses into a slim text caret.
 * - Pressing compresses the core and fires one expanding ring.
 */

const INTERACTIVE = 'a, button, [role="button"], summary, label[for], input[type="checkbox"], input[type="radio"], .card, .chip';

export function Cursor() {
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // A real pointing device: an explicit fine pointer, or any device that also
    // has one (hybrid touch laptops), or something reporting no touch at all.
    const fine =
      window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(any-pointer: fine)").matches ||
      navigator.maxTouchPoints === 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("cursor-custom");

    const core = coreRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const burst = burstRef.current;
    if (!core || !ring || !label || !burst) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let coreX = mouseX;
    let coreY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;

    let mode: "default" | "hover" | "text" = "default";
    let visible = false;
    let pressed = false;
    let frame = 0;

    const paint = () => {
      const ease = pressed ? 0.55 : 0.32;
      coreX += (mouseX - coreX) * ease;
      coreY += (mouseY - coreY) * ease;
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;

      core.style.transform = `translate3d(${coreX}px, ${coreY}px, 0) translate(-50%, -50%) scale(${
        pressed ? 0.72 : mode === "text" ? 1 : 1
      })`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${
        mode === "text" ? 0.28 : mode === "hover" ? 1.85 : 1
      })`;
      // Flip the label to the left of the pointer near the right edge.
      const flipped = ringX > window.innerWidth - 130;
      label.dataset.side = flipped ? "left" : "right";
      label.style.transform = flipped
        ? `translate3d(${ringX}px, ${ringY}px, 0) translate(calc(-100% - 14px), -50%)`
        : `translate3d(${ringX}px, ${ringY}px, 0) translate(14px, -50%)`;
      frame = requestAnimationFrame(paint);
    };

    /** Determine the cursor mode for whatever sits under the pointer. */
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
        core.dataset.mode = mode;
        ring.dataset.mode = mode;
      }

      const copy = hit?.dataset.cursor ?? "";
      if (label.textContent !== copy) label.textContent = copy;
      label.dataset.show = copy && !isText ? "true" : "false";
      if (hit) {
        label.dataset.show = copy && !isText ? "true" : "false";
      }
    };

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!visible) {
        visible = true;
        core.dataset.visible = "true";
        ring.dataset.visible = "true";
        // start the ring on the core so it never flies in from a corner
        ringX = mouseX;
        ringY = mouseY;
      }
      readTarget(event.target);
    };

    const onDown = () => {
      pressed = true;
      core.dataset.pressed = "true";
      ring.dataset.pressed = "true";
    };

    const onUp = () => {
      pressed = false;
      core.dataset.pressed = "false";
      ring.dataset.pressed = "false";
      // one expanding ring per press
      burst.style.transform = `translate3d(${coreX}px, ${coreY}px, 0) translate(-50%, -50%) scale(0.4)`;
      burst.dataset.fire = String(Date.now());
      burst.animate(
        [
          { opacity: 0.55, transform: `translate3d(${coreX}px, ${coreY}px, 0) translate(-50%, -50%) scale(0.4)` },
          { opacity: 0, transform: `translate3d(${coreX}px, ${coreY}px, 0) translate(-50%, -50%) scale(2.6)` },
        ],
        { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    };

    const onLeave = () => {
      visible = false;
      core.dataset.visible = "false";
      ring.dataset.visible = "false";
      label.dataset.show = "false";
    };

    const onScroll = () => {
      if (mode === "hover") {
        core.dataset.mode = "default";
        ring.dataset.mode = "default";
        mode = "default";
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
      <div ref={burstRef} className="cursor-burst" data-fire="0" />
      <div ref={ringRef} className="cursor-ring" data-mode="default" data-visible="false" data-pressed="false" />
      <span ref={labelRef} className="cursor-label" data-show="false" data-side="right" />
      <div ref={coreRef} className="cursor-core" data-mode="default" data-visible="false" data-pressed="false" />
    </div>
  );
}
