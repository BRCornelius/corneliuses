"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  holidayCards,
  photoSrc,
  type FrameRect,
  type HolidayCardPhoto,
} from "@/data/holiday-cards";

const ZOOM_MS = 1100;
const FADE_MS = 280;

type Pending = "in" | "out" | "fade-in" | null;

/**
 * Where the older photo sits inside the held frame, in % of the current
 * photo: the frame rect shrunk to the older photo's aspect and centred, so
 * the inset is never cropped or stretched and, once zoomed, lines up with
 * the full-size older photo that replaces it.
 */
function insetRect(photo: HolidayCardPhoto, older: HolidayCardPhoto): FrameRect {
  const { x, y, width, height } = photo.frame;
  const frameAspect = (width / height) * photo.aspect;
  if (older.aspect >= frameAspect) {
    const h = (width * photo.aspect) / older.aspect;
    return { x, y: y + (height - h) / 2, width, height: h };
  }
  const w = (height * older.aspect) / photo.aspect;
  return { x: x + (width - w) / 2, y, width: w, height };
}

/** A photo's box when fitted (contained and centred) in a W x H stage. */
function fit(aspect: number, W: number, H: number) {
  const w = Math.min(W, H * aspect);
  const h = w / aspect;
  return { x: (W - w) / 2, y: (H - h) / 2, w, h };
}

/**
 * Transform for the current photo's box that blows the inset up to exactly
 * where the older photo will sit once it replaces the current one, so the
 * swap at the end of the zoom doesn't move anything, whatever their shapes.
 */
function zoomTransform(
  photo: HolidayCardPhoto,
  older: HolidayCardPhoto,
  stage: HTMLElement | null,
) {
  const W = stage?.clientWidth ?? 1;
  const H = stage?.clientHeight ?? 1;
  const box = fit(photo.aspect, W, H);
  const target = fit(older.aspect, W, H);
  const inset = insetRect(photo, older);
  const ix = (inset.x / 100) * box.w;
  const iy = (inset.y / 100) * box.h;
  const scale = target.w / ((inset.width / 100) * box.w);
  // transform-origin is the box's top-left corner.
  const tx = target.x - box.x - scale * ix;
  const ty = target.y - box.y - scale * iy;
  return `translate(${tx}px, ${ty}px) scale(${scale})`;
}

/** Resolves once the preloaded older photo can paint, or has failed. */
async function insetReady(inset: HTMLDivElement | null) {
  const img = inset?.querySelector("img");
  if (!img) return;
  try {
    await img.decode();
  } catch {
    // A failed load falls back to the stand-in; carry on.
  }
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** One photo, with a stand-in until the real image is in public/card/. */
function Photo({
  photo,
  eager = false,
}: {
  photo: HolidayCardPhoto;
  eager?: boolean;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [missing, setMissing] = useState(false);

  // An image can fail before React hydrates and misses onError, so check.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setMissing(true);
  }, []);

  if (missing) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_30%_20%,rgba(255,224,138,0.25),transparent_55%),linear-gradient(160deg,#2a0a3a,#0d3a24)] text-center">
        <span className="font-display text-4xl font-black text-nola-gold-bright sm:text-6xl">
          {photo.year}
        </span>
        <span className="text-xs uppercase tracking-[0.25em] text-foreground/60">
          Photo coming soon
        </span>
      </div>
    );
  }

  return (
    // Plain <img> so the preloaded copy is byte-for-byte the one we swap to.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={photoSrc(photo.year)}
      alt={`The Corneliuses holiday card, ${photo.year}`}
      draggable={false}
      loading="eager"
      fetchPriority={eager ? "high" : "auto"}
      onError={() => setMissing(true)}
      className="absolute inset-0 h-full w-full select-none object-cover"
    />
  );
}

export default function HolidayCard() {
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const pending = useRef<Pending>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const insetRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const zoomButtonRef = useRef<HTMLButtonElement>(null);

  const photo = holidayCards[index];
  const older = holidayCards[index + 1];
  const newer = holidayCards[index - 1];
  const isNewest = index === 0;
  const isOldest = !older;
  // A missing year breaks the chain: the held frame shows a card we don't
  // have, so the step past it is a crossfade instead of a zoom.
  const linked = !!older && older.year === photo.year - 1;
  const linkedToNewer = !!newer && newer.year === photo.year + 1;

  const clearAnimations = () => {
    for (const el of [stageRef.current, zoomRef.current, insetRef.current, mainRef.current]) {
      el?.getAnimations().forEach((a) => a.cancel());
    }
  };

  const zoomIn = useCallback(async () => {
    if (busy || !older) return;
    setBusy(true);
    await insetReady(insetRef.current);

    if (prefersReducedMotion() || !linked) {
      await stageRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: FADE_MS,
        fill: "forwards",
      }).finished;
      pending.current = "fade-in";
    } else {
      const zoom = zoomRef.current?.animate(
        [{ transform: "none" }, { transform: zoomTransform(photo, older, stageRef.current) }],
        { duration: ZOOM_MS, easing: "cubic-bezier(.55,0,.25,1)", fill: "forwards" },
      );
      insetRef.current?.animate(
        [{ opacity: 0 }, { opacity: 0, offset: 0.55 }, { opacity: 1 }],
        { duration: ZOOM_MS, fill: "forwards" },
      );
      // Let the frame and hands around the inset dissolve, so nothing pops
      // when the zoom ends and the older photo takes over.
      mainRef.current?.animate(
        [{ opacity: 1 }, { opacity: 1, offset: 0.7 }, { opacity: 0 }],
        { duration: ZOOM_MS, fill: "forwards" },
      );
      await zoom?.finished;
      pending.current = "in";
    }
    setIndex((i) => i + 1);
  }, [busy, older, photo, linked]);

  const zoomOut = useCallback(async () => {
    if (busy || !newer) return;
    setBusy(true);

    if (prefersReducedMotion() || !linkedToNewer) {
      await stageRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: FADE_MS,
        fill: "forwards",
      }).finished;
      pending.current = "fade-in";
    } else {
      // The reverse zoom starts from the newer photo, so swap first.
      pending.current = "out";
    }
    setIndex((i) => i - 1);
  }, [busy, newer, linkedToNewer]);

  // Runs after the year changes and before the browser paints it.
  useLayoutEffect(() => {
    const step = pending.current;
    pending.current = null;
    if (!step) return;

    clearAnimations();

    if (step === "in") {
      setBusy(false);
      return;
    }

    let animation: Animation | undefined;
    if (step === "fade-in") {
      animation = stageRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: FADE_MS,
      });
    } else if (older) {
      // Zoom out: start blown up on the held frame, then pull back.
      animation = zoomRef.current?.animate(
        [{ transform: zoomTransform(photo, older, stageRef.current) }, { transform: "none" }],
        { duration: ZOOM_MS, easing: "cubic-bezier(.55,0,.25,1)" },
      );
      insetRef.current?.animate(
        [{ opacity: 1 }, { opacity: 0, offset: 0.45 }, { opacity: 0 }],
        { duration: ZOOM_MS },
      );
      mainRef.current?.animate(
        [{ opacity: 0 }, { opacity: 1, offset: 0.3 }, { opacity: 1 }],
        { duration: ZOOM_MS },
      );
    }

    if (!animation) {
      setBusy(false);
      return;
    }
    animation.finished.then(
      () => setBusy(false),
      () => setBusy(false),
    );
  }, [index, photo, older]);

  // Keep keyboard focus on a control that still exists after a zoom.
  useEffect(() => {
    if (busy) return;
    const active = document.activeElement;
    if (active && active !== document.body) return;
    (zoomButtonRef.current ?? backRef.current)?.focus({ preventScroll: true });
  }, [busy, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        zoomOut();
        return;
      }
      // Buttons handle Enter/Space themselves; this covers an unfocused page.
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input, textarea, select")) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        zoomIn();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomIn, zoomOut]);

  const frame = photo.frame;
  const inset = older ? insetRect(photo, older) : frame;

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="flex w-full max-w-5xl items-center justify-between gap-4">
        <Link
          href="/"
          className="rounded-full border border-nola-gold/40 px-4 py-2 text-sm text-nola-gold-bright transition-colors hover:border-nola-gold hover:bg-nola-gold/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nola-gold"
        >
          <span aria-hidden="true">&larr; </span>corneliuses.com
        </Link>

        {!isNewest && (
          <button
            ref={backRef}
            type="button"
            onClick={zoomOut}
            disabled={busy}
            className="rounded-full border border-nola-gold/40 px-4 py-2 text-sm text-nola-gold-bright transition-colors hover:border-nola-gold hover:bg-nola-gold/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nola-gold disabled:opacity-50"
          >
            Back to {newer.year}
          </button>
        )}
      </div>

      <h1
        className="font-display text-5xl font-black text-nola-gold-bright sm:text-6xl"
        aria-live="polite"
      >
        {photo.year}
      </h1>

      <div
        ref={stageRef}
        // One fixed stage for every year; each photo is fitted inside it, so
        // portrait and landscape cards can zoom into each other smoothly.
        className="relative flex w-full max-w-5xl items-center justify-center overflow-hidden [container-type:size]"
        style={{ height: "max(18rem, calc(100dvh - 17rem))" }}
      >
        <div
          ref={zoomRef}
          className="relative shrink-0 origin-top-left overflow-hidden rounded-lg shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
          style={{
            aspectRatio: photo.aspect,
            width: `min(100cqw, ${photo.aspect} * 100cqh)`,
          }}
        >
          <div ref={mainRef} className="absolute inset-0">
            <Photo key={photo.year} photo={photo} eager />
          </div>

          {linked && (
            <>
              {/* The older photo sits in the held frame: it preloads the
                  next image and is what the zoom fades into. */}
              <div
                ref={insetRef}
                aria-hidden="true"
                className="pointer-events-none absolute overflow-hidden opacity-0"
                style={{
                  left: `${inset.x}%`,
                  top: `${inset.y}%`,
                  width: `${inset.width}%`,
                  height: `${inset.height}%`,
                }}
              >
                <Photo key={older.year} photo={older} />
              </div>

              <button
                type="button"
                onClick={zoomIn}
                disabled={busy}
                aria-label={`Zoom into the ${older.year} card`}
                className="absolute cursor-zoom-in rounded-sm outline-offset-2 transition-shadow enabled:hover:shadow-[0_0_0_2px_rgba(255,224,138,0.8),0_0_24px_rgba(247,201,72,0.6)] focus-visible:shadow-[0_0_0_3px_#ffe08a] focus-visible:outline-none disabled:cursor-default"
                style={{
                  left: `${frame.x}%`,
                  top: `${frame.y}%`,
                  width: `${frame.width}%`,
                  height: `${frame.height}%`,
                }}
              />
            </>
          )}
        </div>
      </div>

      <div className="flex min-h-12 flex-col items-center gap-2 text-center">
        {isOldest ? (
          <p className="font-script text-2xl text-nola-green-bright">
            This is where it all started.
          </p>
        ) : (
          <>
            <button
              ref={zoomButtonRef}
              type="button"
              onClick={zoomIn}
              disabled={busy}
              className="rounded-full bg-nola-gold px-6 py-2.5 font-semibold text-nola-purple-deep transition-colors hover:bg-nola-gold-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nola-gold disabled:opacity-60"
            >
              {linked ? `Zoom into ${older.year}` : `Skip to ${older.year}`}
            </button>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">
              {linked ? (
                <>
                  <span className="pointer-coarse:hidden">Click</span>
                  <span className="hidden pointer-coarse:inline">Tap</span> the
                  frame to zoom
                </>
              ) : (
                <>We don&rsquo;t have the {photo.year - 1} card yet</>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
