import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = documentHeight > 0 ? scrollTop / documentHeight : 0;

      setProgress(Math.min(Math.max(nextProgress, 0), 1));
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="scroll-progress pointer-events-none fixed bottom-5 left-1/2 z-[50] h-[2px] w-[min(76vw,300px)] -translate-x-1/2 bg-white/25 mix-blend-difference md:bottom-6 md:h-[3px]"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-white"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}