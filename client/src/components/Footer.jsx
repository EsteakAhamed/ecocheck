// client/src/components/Footer.jsx
import { Link } from "react-router";
import {
  RiLeafLine,
  RiPhoneLine,
  RiMailLine,
  RiGlobalLine,
  RiMapPinLine,
  RiArrowRightUpLine,
} from "react-icons/ri";

const NAV_LINKS = [
  { label: "How it works", to: "/how-it-works" },
  { label: "FAQ", to: "/faq" },
  { label: "Consultancy", to: "/consultancy" },
];

const CONTACT_ITEMS = [
  { icon: RiPhoneLine, label: "+88 01567806918", href: "tel:+8801567806918" },
  { icon: RiMailLine, label: "info@dragondigitals.com", href: "mailto:info@dragondigitals.com" },
  { icon: RiGlobalLine, label: "dragondigitals.com", href: "https://www.dragondigitals.com" },
  { icon: RiMapPinLine, label: "Lalmatia, Dhaka", href: null },
];

const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-base-200/30 border-t-2 border-[var(--nav-accent)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main 3-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 py-14">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <RiLeafLine size={16} className="text-[var(--nav-accent)]" />
              <span className="font-black text-xs tracking-widest text-base-content">
                EcoCheck
              </span>
            </div>
            <p className="text-sm text-base-content/45 leading-relaxed max-w-[220px]">
              Sustainability intelligence for modern businesses. Track, measure, and act on your environmental impact.
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/35">
              Explore
            </span>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group inline-flex items-center gap-1 text-sm font-medium text-base-content/55 hover:text-[var(--nav-accent)] transition-colors"
                  >
                    {label}
                    <RiArrowRightUpLine
                      size={11}
                      className="opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/35">
              Contact
            </span>
            <ul className="flex flex-col gap-3">
              {CONTACT_ITEMS.map(({ icon: Icon, label, href }) => {
                const inner = (
                  <span className="flex items-center gap-2.5 text-xs text-base-content/55 transition-colors hover:text-base-content/80">
                    <Icon size={13} className="text-[var(--nav-accent)] shrink-0" />
                    <span className="tracking-wide">{label}</span>
                  </span>
                );

                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-base-content/10 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-widest text-base-content/30">
            &copy; {new Date().getFullYear()} EcoCheck. All rights reserved.
          </p>

          <a
            href="https://www.dragondigitals.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
          >
            <span className="text-[10px] uppercase tracking-widest text-base-content/30 group-hover:text-base-content/50 transition-colors">
              Developed by
            </span>
            <div className="bg-[#111111] dark:bg-black px-3 py-2 border border-white/10 group-hover:bg-black transition-colors duration-150">
              <img
                src="/dragon_digitals_logo_transparent.png"
                alt="Dragon Digitals"
                className="h-5 w-auto object-contain"
              />
            </div>
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;