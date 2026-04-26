import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const commissionTypes = [
  {
    title: "PORTRAITS",
    desc: "Ink or charcoal works built from reference, mood, and material depth.",
  },
  {
    title: "CUSTOM ABSTRACTS",
    desc: "Site-aware pieces for homes, studios, and gallery walls.",
  },
  {
    title: "EDITORIAL / BRAND",
    desc: "Visual commissions for campaigns, covers, and limited print assets.",
  },
  {
    title: "LARGE FORMAT",
    desc: "Scaled paper works and installation-minded compositions.",
  },
];

const processSteps = [
  { id: "01", label: "BRIEF", text: "you send references, idea, size, mood." },
  { id: "02", label: "CONCEPT", text: "we lock the visual route." },
  { id: "03", label: "FINAL", text: "finished artwork is created." },
  { id: "04", label: "DELIVERY", text: "packaging, scan, or handoff." },
];

export default function CommissionPage() {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".commission-reveal");

      items.forEach((item) => {
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
              start: "top 86%",
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
        <div className="mx-auto grid min-h-[58svh] max-w-[1440px] gap-8 px-4 py-10 md:min-h-[62vh] md:grid-cols-[1.15fr_0.85fr] md:px-12 md:py-16 lg:min-h-[66vh]">
          <div className="commission-reveal flex items-end">
            <h1 className="text-[clamp(3rem,14vw,5rem)] font-black uppercase leading-[0.84] tracking-tighter md:text-8xl lg:text-[9.5rem]">
              REQUEST<br />
              FROM THE<br />
              VAULT.
            </h1>
          </div>

          <div className="commission-reveal flex flex-col justify-end border-t-2 border-black pt-8 md:border-l-2 md:border-t-0 md:pl-10">
            <p className="max-w-md text-xs uppercase leading-relaxed tracking-[0.14em] text-black/66 md:text-sm">
              commissions are built from references, mood, scale, and intent.
              bring the idea. i’ll make it stay.
            </p>
            <Link
              to="/contact"
              className="mt-8 w-full bg-black px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-swiss-accent sm:w-fit"
            >
              [ START REQUEST ]
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-swiss-muted">
        <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-12 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-0">
            <div className="commission-reveal lg:pr-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-swiss-accent">
                COMMISSION TYPES
              </p>
              <div className="mt-8 grid gap-px border border-black bg-black sm:grid-cols-2">
                {commissionTypes.map((type) => (
                  <article
                    key={type.title}
                    className="group bg-white p-5 transition-colors duration-200 hover:bg-black hover:text-white md:p-8"
                  >
                    <h2 className="text-base font-black uppercase tracking-tight md:text-xl">
                      {type.title}
                    </h2>
                    <p className="mt-4 text-[11px] uppercase leading-relaxed tracking-[0.13em] text-black/56 transition-colors duration-200 group-hover:text-white/58">
                      {type.desc}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="commission-reveal border-t-2 border-black pt-10 lg:border-l-2 lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-swiss-accent">
                PROCESS
              </p>
              <div className="mt-8 border-t-2 border-black">
                {processSteps.map((step) => (
                  <article key={step.id} className="grid grid-cols-[52px_1fr] border-b-2 border-black py-5 md:grid-cols-[72px_1fr]">
                    <p className="text-sm font-black text-swiss-accent">{step.id}</p>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-[0.18em]">{step.label}</h3>
                      <p className="mt-2 text-[11px] uppercase leading-relaxed tracking-[0.13em] text-black/58">
                        {step.text}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
              <p className="mt-6 max-w-lg text-[11px] uppercase leading-relaxed tracking-[0.15em] text-black/52">
                pricing depends on size, detail, material, and timeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t-4 border-black bg-black text-white">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-12 md:grid-cols-[1fr_auto] md:items-center md:px-12 md:py-18">
          <h2 className="commission-reveal text-4xl font-black uppercase leading-none tracking-tighter md:text-7xl lg:text-8xl">
            GOT AN IDEA?
          </h2>
          <div className="commission-reveal md:justify-self-end">
            <Link
              to="/contact"
              className="inline-block w-full bg-white px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-black transition-colors duration-200 hover:bg-swiss-accent hover:text-white sm:w-auto"
            >
              [ START REQUEST ]
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}