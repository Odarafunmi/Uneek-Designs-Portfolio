"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, MessageCircle, X } from "lucide-react";
import { defaultWhatsAppMessage, site, waLink } from "@/content/site";
import type { Service } from "@/content/types";

type BookingRequest = {
  title: string;
  template: string;
  meta?: string;
};

type BookingContextValue = {
  openBooking: (request?: Partial<BookingRequest>) => void;
  openService: (service: Service) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = useState<BookingRequest | null>(null);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const openBooking = useCallback((next?: Partial<BookingRequest>) => {
    setRequest({
      title: next?.title ?? "Start a project",
      template: next?.template ?? defaultWhatsAppMessage,
      meta: next?.meta,
    });
    setMessage(next?.template ?? defaultWhatsAppMessage);
    setCopied(false);
  }, []);

  const openService = useCallback(
    (service: Service) => {
      openBooking({
        title: service.name,
        template: service.whatsappTemplate,
        meta: `${service.price} · ${service.cadence}`,
      });
    },
    [openBooking],
  );

  const close = useCallback(() => setRequest(null), []);

  useEffect(() => {
    if (!request) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [request, close]);

  const value = useMemo(() => ({ openBooking, openService }), [openBooking, openService]);

  return (
    <BookingContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {request && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-end justify-center p-3 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
          >
            <button
              type="button"
              aria-label="Close booking dialog"
              onClick={close}
              className="absolute inset-0 h-full w-full cursor-default bg-black/55 backdrop-blur-[6px]"
            />

            <motion.div
              initial={{ y: 36, opacity: 0, scale: 0.985 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[520px] overflow-hidden rounded-[26px] border border-line bg-bg shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]"
            >
              <div className="relative overflow-hidden border-b border-line px-6 pb-5 pt-6">
                <div
                  className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full opacity-60 blur-3xl"
                  style={{ background: "var(--grad-brand)" }}
                />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow mb-2 flex items-center gap-2">
                      <MessageCircle size={12} strokeWidth={2.4} className="text-red" />
                      WhatsApp booking
                    </p>
                    <h2 id="booking-title" className="h3 text-[1.45rem]">
                      {request.title}
                    </h2>
                    {request.meta && (
                      <p className="mt-1.5 text-[13px] text-muted">{request.meta}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="px-6 py-5">
                <label htmlFor="booking-message" className="eyebrow mb-2 block">
                  Your message
                </label>
                <textarea
                  id="booking-message"
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    setCopied(false);
                  }}
                  rows={5}
                  className="w-full resize-none rounded-2xl border border-line bg-surface p-4 text-[14.5px] leading-relaxed text-ink outline-none transition-colors placeholder:text-muted focus:border-red/60"
                />
                <p className="mt-2 font-hand text-lg text-muted">
                  Edit it however you like — it opens in WhatsApp, ready to send.
                </p>

                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(message);
                        setCopied(true);
                        window.setTimeout(() => setCopied(false), 2200);
                      } catch {
                        setCopied(false);
                      }
                    }}
                    className="btn btn-outline flex-1"
                  >
                    {copied ? <Check size={16} className="text-red" /> : <Copy size={15} />}
                    {copied ? "Copied" : "Copy message"}
                  </button>
                  <a
                    href={waLink(message)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn btn-primary flex-[1.35]"
                  >
                    Continue to WhatsApp
                    <ArrowUpRight size={16} />
                  </a>
                </div>

                <p className="mt-3.5 text-center text-[11.5px] text-muted">
                  or call{" "}
                  <a
                    href={`tel:${site.phone}`}
                    className="underline decoration-line-strong underline-offset-2 hover:text-ink"
                  >
                    {site.phoneDisplay}
                  </a>{" "}
                  · {site.responseTime}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
