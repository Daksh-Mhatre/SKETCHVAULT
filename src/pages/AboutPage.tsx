import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const textLines = [
  "Hey.",
  "i draw things i couldn't let go of.",
  "some lines made sense.",
  "some didn't.",
  "i kept them anyway.",
];

export default function AboutPage() {
  const pageRef = useRef<HTMLElement>(null);
  const textLinesRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Text lines animation - staggered fade + slide up
      textLinesRef.current.forEach((line, index) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { autoAlpha: 0, y: 32, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.12,
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Metadata animation
      if (metadataRef.current) {
        gsap.fromTo(
          metadataRef.current,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.7,
            scrollTrigger: {
              trigger: metadataRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Image animation - scale down + fade in
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.08, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="border-t-4 border-black bg-white pt-20 md:pt-28">
      {/* Split Layout Section */}
      <section className="min-h-[85svh] md:min-h-screen">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 md:grid-cols-2">
          {/* LEFT: Text Block */}
          <div className="flex min-h-[50svh] flex-col justify-center px-6 py-16 md:min-h-[85svh] md:px-12 md:py-24 lg:px-20">
            <div className="space-y-5 md:space-y-7">
              {textLines.map((line, index) => (
                <p
                  key={index}
                  ref={(el) => {
                    textLinesRef.current[index] = el;
                  }}
                  className="text-2xl font-medium leading-snug tracking-[0.02em] text-black opacity-0 md:text-3xl lg:text-4xl"
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Metadata */}
            <div
              ref={metadataRef}
              className="mt-12 opacity-0 md:mt-16"
            >
              <div className="flex flex-col gap-2 border-t border-black/20 pt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-black/40">
                  Daksh Mhatre
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-black/40">
                  Sketchvault
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-black/40">
                  Based in Navi Mumbai
                </p>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-12 flex items-center gap-3 md:mt-16">
              <div className="h-[1px] w-12 bg-black/30" />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/40">
                Explore
              </span>
              <svg
                className="h-4 w-4 animate-bounce text-black/40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>

          {/* RIGHT: Image Block */}
          <div className="relative flex min-h-[50svh] items-center justify-center bg-swiss-muted md:min-h-[85svh]">
            <div
              ref={imageRef}
              className="h-full w-full overflow-hidden"
            >
              <img
                src="https://picsum.photos/seed/artistportrait/900/1200?grayscale"
                alt="Daksh Mhatre - Visual Artist"
                className="h-full w-full object-cover grayscale"
                loading="lazy"
              />
            </div>
            {/* Overlay gradient for cinematic feel */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="border-t-4 border-black bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/gallery"
              className="group block border-2 border-black bg-white p-8 transition-colors duration-200 hover:bg-black hover:text-white"
            >
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-swiss-accent group-hover:text-white">
                01
              </p>
              <h3 className="mt-4 text-xl font-black uppercase tracking-tight">
                View Gallery
              </h3>
              <p className="mt-3 text-xs uppercase leading-relaxed tracking-[0.12em] text-black/60 group-hover:text-white/70">
                Browse the full archive of works
              </p>
            </Link>

            <Link
              to="/commission"
              className="group block border-2 border-black bg-white p-8 transition-colors duration-200 hover:bg-black hover:text-white"
            >
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-swiss-accent group-hover:text-white">
                02
              </p>
              <h3 className="mt-4 text-xl font-black uppercase tracking-tight">
                Commission
              </h3>
              <p className="mt-3 text-xs uppercase leading-relaxed tracking-[0.12em] text-black/60 group-hover:text-white/70">
                Request a custom piece from the vault
              </p>
            </Link>

            <Link
              to="/contact"
              className="group block border-2 border-black bg-white p-8 transition-colors duration-200 hover:bg-black hover:text-white"
            >
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-swiss-accent group-hover:text-white">
                03
              </p>
              <h3 className="mt-4 text-xl font-black uppercase tracking-tight">
                Contact
              </h3>
              <p className="mt-3 text-xs uppercase leading-relaxed tracking-[0.12em] text-black/60 group-hover:text-white/70">
                Get in touch directly
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
