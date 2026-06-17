// client/src/pages/FAQ.jsx
import { useState } from "react";
import {
  RiAddLine,
  RiSubtractLine,
  RiQuestionLine,
  RiMailSendLine,
} from "react-icons/ri";

const FAQ = () => {
  const [activeIdx, setActiveIdx] = useState(null);

  const faqItems = [
    {
      q: "Where does this tool get its environmental data?",
      a: "We cross-check server records directly against trusted global databases managed by The Green Web Foundation to ensure our information is accurate and up to date.",
    },
    {
      q: "Why do my test results change slightly when I run them multiple times?",
      a: "Websites are constantly shifting. Things like rotating ads, updated images, and temporary server files change from minute to minute, which can cause your page size to vary slightly with each test.",
    },
    {
      q: "What is the Sustainable Web Design model?",
      a: "It is a widely accepted industry standard used to estimate a website's carbon footprint. It calculates how much energy is used across data centers, internet networks, and the devices people use to view your site.",
    },
    {
      q: "Does this tool track background data and hidden requests?",
      a: "We measure everything that downloads when your page first opens. Any extra data or background requests that happen much later while browsing are not included in this total.",
    },
    {
      q: "Does this test for mobile phones or desktop computers?",
      a: "It tests for mobile phones by default. Sending data over mobile networks generally requires more energy than standard home broadband, making mobile optimization incredibly important for the environment.",
    },
    {
      q: "How do you check if a website provider is actually using green energy?",
      a: "We look at the physical location of the servers and double-check them against verified green energy records and corporate partnerships, helping you filter out misleading claims.",
    },
    {
      q: "Does optimizing a website really help the environment?",
      a: "Yes! The internet, telecommunication lines, and global servers consume around 2% to 3% of the world's electricity. Making your code and images smaller directly lowers the power needed to load your site.",
    },
    {
      q: "Can our development team automate these tests?",
      a: "Yes. Developers can easily plug our testing tool directly into their regular workflow to automatically catch oversized images or bulky code before updates go live to users.",
    },
  ];

  const toggleAccordion = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-20 page-fade-in space-y-16">
      {/* ── HEADER SECTION (Eco Green) ── */}
      <div className="relative border-b border-base-300 pb-10 text-center sm:text-left">
        <h1 className="text-4xl sm:text-5xl font-black text-base-content tracking-tight mb-4">
          Frequently Asked{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--nav-accent)] to-emerald-600">
            Questions
          </span>
        </h1>
        <p className="text-sm sm:text-base text-base-content/60 max-w-2xl leading-relaxed">
          Clear, straightforward answers about our website audits, carbon
          calculations, and how we measure environmental impact.
        </p>
      </div>

      {/* ── ACCORDION INTERACTIVE GRID (Eco Green) ── */}
      <div className="space-y-4">
        {faqItems.map((item, idx) => {
          const isOpen = activeIdx === idx;
          return (
            <div
              key={idx}
              className={`group rounded-xl border border-base-300 bg-base-200/10 transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-base-200/40 shadow-md border-[var(--nav-accent)]/40"
                  : "hover:border-base-content/20 hover:bg-base-200/20"
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full flex items-start justify-between p-6 text-left transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex gap-4">
                  <div
                    className={`mt-0.5 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md text-xs font-mono font-bold ${
                      isOpen
                        ? "bg-[var(--nav-accent)] text-white"
                        : "bg-base-300/50 text-base-content/60 group-hover:text-[var(--nav-accent)] group-hover:bg-[var(--nav-accent)]/10"
                    } transition-colors`}
                  >
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </div>
                  <span
                    className={`font-bold text-sm sm:text-base tracking-tight transition-colors ${
                      isOpen
                        ? "text-[var(--nav-accent)]"
                        : "text-base-content group-hover:text-[var(--nav-accent)]"
                    }`}
                  >
                    {item.q}
                  </span>
                </div>
                <span
                  className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full border border-base-300 flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? "rotate-180 bg-[var(--nav-accent)] border-[var(--nav-accent)] text-white"
                      : "text-base-content/40 group-hover:text-base-content"
                  }`}
                >
                  {isOpen ? (
                    <RiSubtractLine size={16} />
                  ) : (
                    <RiAddLine size={16} />
                  )}
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 border-t border-base-300/40"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-6 bg-base-200/20 text-xs sm:text-sm text-base-content/70 leading-relaxed tracking-wide">
                    {item.a}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── SECTION 1: METHODOLOGY REGISTRY (Eco Green) ── */}
      <div className="border border-base-300 p-8 rounded-2xl bg-gradient-to-br from-base-200/5 via-base-200/10 to-base-200/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm hover:border-base-content/20 transition-all duration-300">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--nav-accent)]">
            <RiQuestionLine size={16} className="text-[var(--nav-accent)]" />
            <span>How It Works</span>
          </div>
          <h3 className="font-black text-xl text-base-content tracking-tight">
            Want to see how we calculate these scores?
          </h3>
          <p className="text-sm text-base-content/60 leading-relaxed">
            Take a look at our straightforward breakdown of how we measure page
            weights, track server locations, and estimate overall carbon
            footprints.
          </p>
        </div>
        <div className="flex-shrink-0">
          <a
            href="/how-it-works"
            className="inline-flex items-center justify-center bg-base-300/60 hover:bg-base-300 text-base-content font-mono font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-base-300 shadow-sm transition-all duration-200 group gap-2"
          >
            <span>Our Methodology</span>
            <span className="transform group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </a>
        </div>
      </div>

      {/* ── SECTION 2: DRAGON DIGITALS PREMIUM SUPPORT BANNER (Branded Orange) ── */}
      <div className="border border-orange-500/20 bg-[#0b132b] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8 group">
        {/* Architectural Vector Elements restored to brand orange */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-500">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 100,0 100,30 0,90" fill="#f97316" />
            <circle cx="90" cy="10" r="25" fill="#ffffff" />
            <path
              d="M 0,50 Q 50,20 100,80"
              stroke="#f97316"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        <div className="relative z-10 space-y-5 max-w-xl">
          <div className="space-y-2">
            <h3 className="font-black text-2xl sm:text-3xl tracking-tight text-white">
              Need Support?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              If your website has a unique setup, or you just need a bit of
              direct assistance from our engineering team that isn't covered
              here, we are happy to chat.
            </p>
          </div>
        </div>

        {/* Contact Action Element restored to Dragon Orange gradients */}
        <div className="relative z-10 flex-shrink-0 w-full md:w-auto space-y-2">
          <a
            href="mailto:ceo@dragondigitals.com"
            className="w-full md:w-auto inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs tracking-wider uppercase py-4 px-8 rounded-xl shadow-xl transition-all duration-200 transform active:scale-95 gap-2"
          >
            <RiMailSendLine size={16} />
            <span>Contact Dragon Digitals</span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default FAQ;
