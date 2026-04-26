import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { Artwork } from "../data/artworks";

interface ArtworkViewerProps {
  artwork: Artwork;
  onClose: () => void;
}

export default function ArtworkViewer({ artwork, onClose }: ArtworkViewerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
      );
    }, panelRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-black pb-24"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${artwork.title} enlarged artwork view`}
    >
      <div ref={panelRef} className="flex min-h-[100svh] flex-col">
        <div className="relative z-[110] flex w-full flex-col gap-5 border-b border-white/10 bg-black px-4 py-4 sm:flex-row sm:items-start sm:justify-between md:px-8 md:py-6" onClick={(event) => event.stopPropagation()}>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white md:text-base">{artwork.title}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[#CFCFCF] md:text-[11px]">
              {artwork.year} · {artwork.medium} · {artwork.size}
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#9A9A9A]">{artwork.category}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="min-h-11 w-full cursor-pointer bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors duration-200 hover:bg-swiss-accent hover:text-white sm:w-fit sm:self-start sm:py-2"
          >
            Close
          </button>
        </div>

        <div className="flex min-h-[56svh] flex-1 items-center justify-center px-4 py-6 md:min-h-[70vh] md:px-8 md:py-8" onClick={(event) => event.stopPropagation()}>
          <img
            src={artwork.src}
            alt={artwork.title}
            className="max-h-[58svh] w-auto max-w-full object-contain md:max-h-[76vh]"
          />
        </div>

        {artwork.description ? (
          <p className="relative z-[110] px-4 pb-10 text-[10px] uppercase tracking-[0.2em] text-[#DADADA] md:px-8" onClick={(event) => event.stopPropagation()}>{artwork.description}</p>
        ) : null}
      </div>
    </div>
  );
}
