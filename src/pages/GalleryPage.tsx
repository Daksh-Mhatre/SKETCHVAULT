import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArtworkViewer from "../components/ArtworkViewer";
import { artworks, type Artwork } from "../data/artworks";

gsap.registerPlugin(ScrollTrigger);

function ArtworkTile({
  artwork,
  onOpen,
}: {
  artwork: Artwork;
  onOpen: (artwork: Artwork) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(artwork)}
      className="gallery-card group mb-4 block w-full break-inside-avoid text-left md:mb-5"
      aria-label={`Open ${artwork.title}`}
      style={{ opacity: 0, transform: "translateY(36px) scale(0.96)" }}
    >
      <div className="relative w-full overflow-hidden bg-white outline outline-1 outline-black/10">
        <img
          src={artwork.src}
          alt={artwork.title}
          loading="lazy"
          className="block h-auto w-full transition duration-500 ease-out group-hover:brightness-75 group-focus-visible:brightness-75"
        />
        <div className="absolute inset-x-0 bottom-0 translate-y-0 bg-black/82 px-4 py-3 text-white transition-transform duration-300 ease-out sm:translate-y-full sm:group-hover:translate-y-0 sm:group-focus-visible:translate-y-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em]">
            {artwork.title}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/58">
            {artwork.year} · {artwork.medium}
          </p>
        </div>
      </div>
    </button>
  );
}

export default function GalleryPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const masonryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!masonryRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".gallery-card", {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.07,
            clearProps: "transform,opacity", // let CSS hover take over cleanly after reveal
          });
        },
      });
    }, masonryRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="border-t-4 border-black bg-white pt-20 md:pt-28">
      <section className="border-b-4 border-black bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-10 text-center md:px-12 md:py-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-swiss-accent">
            Gallery
          </p>
          <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl lg:text-9xl">
            Archive
          </h1>
        </div>
      </section>

      <section className="bg-swiss-muted">
        <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-12 md:py-20">
          <div
            ref={masonryRef}
            className="columns-1 gap-4 sm:columns-2 md:gap-5 lg:columns-3 xl:columns-4"
          >
            {artworks.map((artwork) => (
              <ArtworkTile
                key={artwork.id}
                artwork={artwork}
                onOpen={setSelectedArtwork}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedArtwork ? (
        <ArtworkViewer
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      ) : null}
    </main>
  );
}
