import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { artworks } from "../data/artworks";

gsap.registerPlugin(ScrollTrigger);

function InlineCurve() {
  return (
    <svg className="inline-block h-6 w-14 md:h-8 md:w-16" viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 16Q16 2 32 16T62 16" />
    </svg>
  );
}

function InlineArrow() {
  return (
    <svg className="inline-block h-5 w-9 md:h-6 md:w-10" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 12h34M28 4l8 8-8 8" />
    </svg>
  );
}

function InlineCircle() {
  return (
    <svg className="inline-block h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function InlineCross() {
  return (
    <svg className="inline-block h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

function InlineRect() {
  return (
    <svg className="inline-block h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" />
    </svg>
  );
}

function InlineDot() {
  return (
    <svg className="inline-block h-3 w-3 md:h-4 md:w-4" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="8" cy="8" r="3" />
    </svg>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLElement>(null);
  const tickerTrackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      if (frameRef.current && heroTextRef.current) {
        gsap.set(frameRef.current, {
          xPercent: -50,
          yPercent: -50,
          transformOrigin: "center center",
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: isMobile ? "+=100%" : "+=150%",
            pin: true,
            scrub: isMobile ? 0.6 : 1,
            anticipatePin: 1,
          },
        })
          .to(
            heroTextRef.current,
            {
              autoAlpha: 0,
              y: 28,
              ease: "none",
              duration: 0.2,
            },
            0,
          )
          .to(frameRef.current, {
            top: "50%",
            left: "50%",
            width: "100vw",
            height: "100vh",
            borderWidth: 0,
            ease: "none",
            duration: 1,
          }, 0);
      }

      const createTicker = () => {
        const track = tickerTrackRef.current;
        if (!track) return;

        const distance = Math.max(track.scrollWidth - window.innerWidth + 96, 0);
        if (distance <= 0) return;

        const horizontalTween = gsap.fromTo(
          track,
          { x: 0 },
          {
            x: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: tickerRef.current,
              start: "top top",
              end: () => `+=${distance}`,
              pin: true,
              scrub: 1.3,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          },
        );

        gsap.utils.toArray<HTMLElement>(".ticker-pop").forEach((item) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 64, scale: 0.94 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.45,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                containerAnimation: horizontalTween,
                start: "left 88%",
                end: "left 58%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      };

      createTicker();
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  const featuredWorks = artworks.slice(0, 4);

  return (
    <main className="bg-white">
      <section ref={heroRef} className="relative h-[100svh] overflow-hidden bg-white md:h-screen">
        <div
          ref={frameRef}
          className="absolute left-1/2 top-[42%] z-[60] h-[38svh] w-[86vw] overflow-hidden border-2 border-black bg-black sm:h-[42vh] sm:w-[72vw] md:top-[48%] md:h-[46vh] md:w-[58vw] lg:w-[min(58vw,760px)]"
        >
          <img
            src="/images/hero-artwork.jpg"
            alt="Featured artwork by Daksh Mhatre"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        <div
          ref={heroTextRef}
          className="pointer-events-none absolute left-1/2 top-[calc(42%+22svh)] z-[30] w-full max-w-[980px] -translate-x-1/2 px-4 text-center sm:top-[calc(42%+24vh)] md:top-[calc(48%+26vh)] md:px-6"
        >
          <p className="text-[clamp(2.6rem,13vw,4.5rem)] font-black uppercase leading-none tracking-tighter text-black md:text-7xl lg:text-8xl">
            Daksh Mhatre
          </p>
          <div className="mx-auto mt-4 h-[3px] w-20 bg-black" />
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.28em] text-black/55 md:text-sm">
            Visual Artist
          </p>
        </div>
      </section>

      <section ref={tickerRef} className="relative h-[100svh] overflow-hidden border-t-4 border-black bg-black text-white md:h-screen">
        <div className="swiss-grid-pattern absolute inset-0 opacity-20" />
        <div className="swiss-noise absolute inset-0" />
        <div className="relative flex h-full items-center overflow-hidden">
          <div
            ref={tickerTrackRef}
            className="hide-scrollbar flex w-max items-center gap-7 px-4 sm:px-6 md:gap-12 md:px-16 lg:gap-16 lg:px-24"
            style={{ willChange: "transform" }}
          >
            <span className="ticker-pop whitespace-nowrap text-[clamp(2.35rem,13vw,4.5rem)] font-black uppercase tracking-tighter md:text-6xl lg:text-7xl">
              In every sketch
            </span>
            <span className="ticker-pop"><InlineCurve /></span>
            <span className="ticker-pop whitespace-nowrap text-[clamp(2.35rem,13vw,4.5rem)] font-black uppercase tracking-tighter md:text-6xl lg:text-7xl">
              discover the
            </span>
            <span className="ticker-pop"><InlineArrow /></span>
            <span className="ticker-pop whitespace-nowrap text-[clamp(2.35rem,13vw,4.5rem)] font-black uppercase tracking-tighter text-swiss-accent md:text-6xl lg:text-7xl">
              unfinished chaos
            </span>
            <span className="ticker-pop"><InlineCross /></span>
            <span className="ticker-pop whitespace-nowrap text-[clamp(2.35rem,13vw,4.5rem)] font-black uppercase tracking-tighter md:text-6xl lg:text-7xl">
              quiet structure
            </span>
            <span className="ticker-pop"><InlineCircle /></span>
            <span className="ticker-pop whitespace-nowrap text-[clamp(2.35rem,13vw,4.5rem)] font-black uppercase tracking-tighter md:text-6xl lg:text-7xl">
              and the
            </span>
            <span className="ticker-pop"><InlineRect /></span>
            <span className="ticker-pop whitespace-nowrap text-[clamp(2.35rem,13vw,4.5rem)] font-black uppercase tracking-tighter md:text-6xl lg:text-7xl">
              lowkey magic
            </span>
            <span className="ticker-pop"><InlineDot /></span>
            <span className="ticker-pop whitespace-nowrap text-[clamp(2.35rem,13vw,4.5rem)] font-black uppercase tracking-tighter md:text-6xl lg:text-7xl">
              that stayed anyway
            </span>
            <span className="ticker-pop"><InlineArrow /></span>
            <span className="ticker-pop whitespace-nowrap text-[clamp(2.35rem,13vw,4.5rem)] font-black uppercase tracking-tighter text-white/45 md:text-6xl lg:text-7xl">
              sketchvault
            </span>
          </div>
        </div>
      </section>

      <section className="border-t-4 border-black bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-12 md:py-32">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-swiss-accent">01. Featured Works</p>
              <h1 className="mt-4 text-4xl font-black uppercase tracking-tighter md:text-7xl lg:text-8xl">
                Visual weight. <br />
                Minimal words.
              </h1>
              <p className="mt-8 max-w-md text-xs uppercase tracking-[0.12em] text-black/60 md:text-sm">
                The homepage is now a curated entry point only. Browse the full archive, artist profile,
                contact details, and commission information on their own dedicated pages.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/gallery"
                  className="bg-black px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-swiss-accent"
                >
                  View Gallery
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-black px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-black transition-colors duration-200 hover:bg-black hover:text-white"
                >
                  About Artist
                </Link>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
              {featuredWorks.map((artwork) => (
                <Link key={artwork.id} to="/gallery" className="group block">
                  <div className="overflow-hidden border-2 border-black bg-swiss-muted">
                    <img
                      src={artwork.src}
                      alt={artwork.title}
                      className="h-[220px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 md:h-[300px]"
                    />
                  </div>
                  <div className="mt-4 border-t-2 border-black pt-3">
                    <p className="text-xs font-bold uppercase tracking-[0.18em]">{artwork.title}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-black/50">{artwork.year}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}
