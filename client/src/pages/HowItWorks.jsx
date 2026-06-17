// client/src/pages/HowItWorks.jsx
import { Link } from "react-router";
import {
  TbWorld,
  TbLoader2,
  TbServer,
  TbBolt,
  TbMathFunction,
  TbHelpCircle,
} from "react-icons/tb";

const HowItWorks = () => {
  const processSteps = [
    {
      idx: "01",
      icon: TbWorld,
      title: "Enter Your Website",
      desc: "Just paste any live website address into the input bar, and our system gets to work right away.",
    },
    {
      idx: "02",
      icon: TbLoader2,
      title: "Measuring Page Size",
      desc: "Our tool safely loads your webpage behind the scenes to calculate exactly how much data it transfers.",
    },
    {
      idx: "03",
      icon: TbServer,
      title: "Checking Server Power",
      desc: "We look up your website's hosting provider to check if they run on green, renewable energy.",
    },
    {
      idx: "04",
      icon: TbBolt,
      title: "Calculating the Footprint",
      desc: "Using the industry-standard CO2.js tool, we combine all this data to show your estimated carbon emissions per visit.",
    },
  ];

  const metricsModel = [
    {
      label: "Energy Per Gigabyte",
      value: "0.81 kWh/GB",
      note: "The estimated electricity used to move data all the way from the server to a user's screen.",
    },
    {
      label: "Global Grid Average",
      value: "442 g/kWh",
      note: "The average amount of carbon produced per unit of electricity worldwide, used as our standard baseline.",
    },
    {
      label: "First vs. Repeat Visits",
      value: "75% / 25%",
      note: "Accounts for saved files (caching), recognizing that return visitors use much less energy to load your site.",
    },
  ];

  const technicalFaqs = [
    {
      q: "How do you calculate these scores?",
      a: "We use the Sustainable Web Design (SWD) system model. This looks at the energy used across the entire digital journey—from data centers and network cables down to the user's phone or computer.",
    },
    {
      q: "How do you check for green hosting?",
      a: "We match your website's server address with live registries from organizations like The Green Web Foundation to see if your hosting provider officially uses renewable energy.",
    },
    {
      q: "Why does the size of a webpage matter?",
      a: "Larger files take more electricity to travel across the internet. By making your website's files and images smaller, you directly reduce the amount of power needed from the electrical grid.",
    },
  ];

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-16 page-fade-in">
      {/* ── HERO SECTION ── */}
      <div className="mb-16 max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--nav-accent)]">
          Our Methodology
        </span>
        <h1 className="text-4xl font-black text-base-content tracking-tight mt-2 mb-4">
          How does it calculate emissions?
        </h1>
        <p className="text-base-content/70 text-sm sm:text-base leading-relaxed">
          Our calculator uses the open-source Sustainable Web Design model. By
          looking at how large your website's files are and what kind of power
          its servers run on, we give you a clear look at its digital footprint.
        </p>
      </div>

      {/* ── CORE PROCESS GRID (Updated with High-Definition Borders) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {processSteps.map((step) => (
          <div
            key={step.idx}
            className="group p-6 rounded-xl border border-base-300 bg-base-200/20 flex gap-5 items-start shadow-sm transition-all duration-300 hover:bg-base-200/40 hover:border-[var(--nav-accent)]/40 hover:shadow-md"
          >
            {/* Structured Icon Bracket */}
            <div className="text-[var(--nav-accent)] p-2.5 rounded-lg bg-base-300/50 border border-base-300 group-hover:bg-[var(--nav-accent)] group-hover:text-white transition-colors duration-300 flex-shrink-0">
              <step.icon size={20} />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--nav-accent)] opacity-60 block uppercase">
                STAGE {step.idx}
              </span>
              <h3 className="text-base font-bold text-base-content tracking-tight group-hover:text-[var(--nav-accent)] transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-base-content/60 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── SYSTEM MATHEMATICS / SPECIFICATIONS ── */}
      <div className="mb-20 border border-base-300 p-8 rounded-2xl bg-base-200/10">
        <div className="flex gap-3 items-center mb-6">
          <TbMathFunction size={20} className="text-[var(--nav-accent)]" />
          <h2 className="text-xl font-bold tracking-tight">
            Our Calculation Baselines
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {metricsModel.map((item, i) => (
            <div key={i} className="border-l-2 border-[var(--nav-accent)] pl-4">
              <span className="text-xs text-base-content/50 block font-mono uppercase tracking-wider">
                {item.label}
              </span>
              <span className="text-xl font-black font-mono my-1 block text-base-content">
                {item.value}
              </span>
              <p className="text-xs text-base-content/60 leading-normal">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── TECHNICAL FAQ SECTOR ── */}
      <div className="mb-20">
        <div className="flex gap-3 items-center mb-8">
          <TbHelpCircle size={20} className="text-[var(--nav-accent)]" />
          <h2 className="text-xl font-bold tracking-tight">A Closer Look</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {technicalFaqs.map((faq, i) => (
            <div key={i} className="flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-base-content mb-2 leading-snug">
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-base-content/60 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTION INTERFACE LINK ── */}
      <div className="border border-base-300 p-8 text-center bg-base-200/20 rounded-2xl">
        <h3 className="font-bold text-lg mb-2">Ready to test a website?</h3>
        <p className="text-xs text-base-content/60 mb-6 max-w-sm mx-auto">
          See how clean and optimized any live website is in just a few seconds.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-gradient-to-r from-[var(--nav-accent)] to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-xs tracking-wider uppercase py-3 px-6 rounded-xl shadow-md transition-all duration-200 transform active:scale-95"
        >
          Run Analysis Now
        </Link>
      </div>
    </main>
  );
};

export default HowItWorks;
