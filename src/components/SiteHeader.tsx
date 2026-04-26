import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function SiteHeader() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const solidHeader = location.pathname !== "/" || scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        solidHeader ? "border-b-2 border-black bg-white" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 md:h-20 md:gap-6 md:px-12">
        <NavLink
          to="/"
          className="shrink-0 text-xs font-bold uppercase tracking-[0.14em] md:text-sm md:tracking-[0.16em]"
        >
          Daksh Mhatre
        </NavLink>

        <nav className="hidden items-center gap-8 lg:flex lg:gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group relative overflow-hidden text-xs font-bold uppercase tracking-[0.22em] ${
                  isActive ? "text-swiss-accent" : "text-black"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`block transition-transform duration-200 ease-out ${
                      isActive ? "-translate-y-full" : "group-hover:-translate-y-full"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`absolute inset-0 block text-swiss-accent transition-transform duration-200 ease-out ${
                      isActive
                        ? "translate-y-0"
                        : "translate-y-full group-hover:translate-y-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/commission"
          className="hidden bg-swiss-accent px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-black lg:block lg:px-6"
        >
          Book Commission
        </NavLink>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 border-2 border-black bg-white lg:hidden"
        >
          <span className={`h-[2px] w-5 bg-black transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-[2px] w-5 bg-black transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-5 bg-black transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      <div
        className={`border-t-2 border-black bg-white transition-[max-height,opacity] duration-200 lg:hidden ${
          menuOpen ? "max-h-[360px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <nav className="px-4 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block border-b border-black/15 py-4 text-sm font-bold uppercase tracking-[0.22em] ${
                  isActive ? "text-swiss-accent" : "text-black"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/commission"
            className="mt-4 block bg-swiss-accent px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-black"
          >
            Book Commission
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
