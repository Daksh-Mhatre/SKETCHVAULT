import { NavLink } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="border-t-4 border-black bg-black text-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:px-12">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em]">Daksh Mhatre</p>
          <p className="mt-3 max-w-sm text-[11px] uppercase tracking-[0.18em] text-white/55">
            Visual artist shaping gesture, paper texture, and structured chaos into collectible works.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-swiss-accent">Navigate</p>
          <div className="mt-4 space-y-3">
            <NavLink to="/" className="block text-xs font-bold uppercase tracking-[0.18em] text-white/75 transition-colors hover:text-white">
              Home
            </NavLink>
            <NavLink to="/gallery" className="block text-xs font-bold uppercase tracking-[0.18em] text-white/75 transition-colors hover:text-white">
              Gallery
            </NavLink>
            <NavLink to="/about" className="block text-xs font-bold uppercase tracking-[0.18em] text-white/75 transition-colors hover:text-white">
              About
            </NavLink>
            <NavLink to="/contact" className="block text-xs font-bold uppercase tracking-[0.18em] text-white/75 transition-colors hover:text-white">
              Contact
            </NavLink>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-swiss-accent">Contact</p>
          <div className="mt-4 space-y-3 text-xs font-bold uppercase tracking-[0.18em] text-white/75">
            <a href="mailto:hello@dakshmhatre.com" className="block transition-colors hover:text-white">
              hello@dakshmhatre.com
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="block transition-colors hover:text-white">
              Instagram
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="block transition-colors hover:text-white">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
