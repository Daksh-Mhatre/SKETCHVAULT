import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 26, scale: 0.985 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="border-t-4 border-black bg-white pt-20 md:pt-28">
      <section className="border-b-4 border-black bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-12 md:py-20">
          <p className="contact-reveal text-[11px] font-bold uppercase tracking-[0.24em] text-swiss-accent">Contact</p>
          <div className="mt-5 grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <h1 className="contact-reveal text-[clamp(2.5rem,12vw,4.5rem)] font-black uppercase tracking-tighter md:text-7xl lg:text-8xl">
              Reach out directly.
            </h1>
            <p className="contact-reveal max-w-xl self-end text-xs uppercase tracking-[0.12em] text-black/60 md:text-sm">
              Contact now has its own page, so users are not forced to scroll through the homepage to get in touch.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-swiss-muted">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 md:px-12 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="contact-reveal">
            <div className="space-y-6">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="group flex items-center gap-4 border-b-2 border-black pb-4">
                <div className="flex h-11 w-11 items-center justify-center border-2 border-black transition-colors duration-200 group-hover:border-swiss-accent group-hover:bg-swiss-accent">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">IG</span>
                </div>
                <span className="min-w-0 text-xs font-bold uppercase tracking-[0.14em] transition-colors group-hover:text-swiss-accent md:tracking-[0.18em]">
                  @dakshmhatre
                </span>
              </a>

              <a href="mailto:hello@dakshmhatre.com" className="group flex items-center gap-4 border-b-2 border-black pb-4">
                <div className="flex h-11 w-11 items-center justify-center border-2 border-black transition-colors duration-200 group-hover:border-swiss-accent group-hover:bg-swiss-accent">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">EM</span>
                </div>
                <span className="min-w-0 break-all text-xs font-bold uppercase tracking-[0.08em] transition-colors group-hover:text-swiss-accent md:tracking-[0.18em]">
                  hello@dakshmhatre.com
                </span>
              </a>

              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="group flex items-center gap-4 border-b-2 border-black pb-4">
                <div className="flex h-11 w-11 items-center justify-center border-2 border-black transition-colors duration-200 group-hover:border-swiss-accent group-hover:bg-swiss-accent">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">WA</span>
                </div>
                <span className="min-w-0 text-xs font-bold uppercase tracking-[0.14em] transition-colors group-hover:text-swiss-accent md:tracking-[0.18em]">
                  +91 12345 67890
                </span>
              </a>
            </div>
          </div>

          <form className="contact-reveal border-2 border-black bg-white p-5 md:p-10" onSubmit={(event) => event.preventDefault()}>
            <div className="space-y-7">
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em]">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full border-b-2 border-black bg-transparent pb-3 text-sm uppercase tracking-[0.08em] outline-none transition-colors focus:border-swiss-accent"
                />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em]">Email</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full border-b-2 border-black bg-transparent pb-3 text-sm uppercase tracking-[0.08em] outline-none transition-colors focus:border-swiss-accent"
                />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em]">Project</label>
                <textarea
                  rows={5}
                  placeholder="Tell me what you want to create"
                  className="w-full resize-none border-b-2 border-black bg-transparent pb-3 text-sm uppercase tracking-[0.08em] outline-none transition-colors focus:border-swiss-accent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-swiss-accent sm:w-auto"
              >
                Send Inquiry
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
