// client/src/pages/Home.jsx
import { useState } from "react";
import {
  TbLoader2,
  TbAlertCircle,
  TbWorld,
  TbServer,
  TbBolt,
  TbArrowRight,
  TbDeviceMobile,
  TbCar,
  TbBulb,
} from "react-icons/tb";
import UrlForm from "../components/UrlForm";
import ResultCard from "../components/ResultCard";
import { analyzeWebsite } from "../services/api";

/**
 * PRODUCTION-READY CONSTANTS
 * Centralized data for easy maintenance and cleaner JSX.
 */
const HOW_IT_WORKS = [
  {
    step: "01",
    icon: TbWorld,
    title: "Domain Ingestion",
    desc: "EcoCheck's ingestion engine standardizes secure protocols, handshakes, and route redirection for any live URL.",
  },
  {
    step: "02",
    icon: TbLoader2,
    title: "Sandboxed Payload Audit",
    desc: "Headless browser instances calculate total uncompressed bytes, asset weights, and complex script payloads in isolation.",
  },
  {
    step: "03",
    icon: TbServer,
    title: "Grid Authentication",
    desc: "Network tracking cross-references data center IP mapping with verified global renewable energy grid registries.",
  },
  {
    step: "04",
    icon: TbBolt,
    title: "Carbon Mapping Models",
    desc: "Parsed wire variables are processed via standard SWD computational formulas for precise carbon footprint ratings.",
  },
];


// Relatable, everyday reference points for a single gram of page-load CO2.
// Keeps the abstract number grounded in something people already understand.
const EVERYDAY_COMPARISONS = [
  {
    icon: TbDeviceMobile,
    value: "~8.5g CO₂",
    label: "One full smartphone charge",
  },
  {
    icon: TbCar,
    value: "~192g CO₂",
    label: "Per kilometre of average car travel",
  },
  {
    icon: TbBulb,
    value: "~36g CO₂",
    label: "One hour of a 10W LED bulb",
  },
];

const Home = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (url) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeWebsite(url);
      setResult(data);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        "Calculation interface interrupted. Verify the URL is public and operational.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col w-full page-fade-in bg-base-100 text-base-content transition-colors duration-200">
      {/* ── HERO SECTION ──────────────────────────────────── 
          Optimized for maximum readability and conversion.
      */}
      <section className="w-full px-4 pt-32 pb-20 text-left md:text-center max-w-5xl mx-auto">
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9] uppercase mb-8 max-w-4xl mx-auto">
          Empowering Web <br className="hidden sm:block" />
          <span className="text-primary">Sustainability</span> Audits
        </h1>

        <p className="text-sm sm:text-base text-base-content/60 uppercase tracking-widest mb-12 max-w-2xl mx-auto font-bold leading-relaxed">
          Deep computational profiling of page asset weights, energy consumption
          metrics, and real-time grid green status.
        </p>

        <div className="w-full max-w-2xl mx-auto mb-6">
          <UrlForm onAnalyze={handleAnalyze} loading={loading} />
        </div>

        {/* Error Handling */}
        {error && (
          <div className="w-full max-w-2xl mx-auto mt-8 animate-result">
            <div className="alert alert-error bg-error/5 text-error border border-error/20 rounded-none flex items-start gap-3 p-4">
              <TbAlertCircle size={18} className="mt-0.5 flex-shrink-0" />
              <span className="text-xs uppercase tracking-wide text-left font-bold">
                {error}
              </span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="w-full max-w-2xl mx-auto mt-16 text-left border border-base-content/10 bg-base-200/40 p-10 flex flex-col sm:flex-row items-start sm:items-center gap-8 animate-result rounded-none">
            <div className="text-primary flex-shrink-0">
              <TbLoader2 size={40} className="animate-spin" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-2 text-base-content">
                Compiling Page Assets & Matrix…
              </h3>
              <p className="text-sm text-base-content/60 leading-relaxed font-medium">
                Spawning sandboxed network instance to parse raw data payloads,
                file weights, and lookup renewable hosting verification
                registries. Average processing time: 10–25s.
              </p>
            </div>
          </div>
        )}

        {/* Result Injection */}
        {result && (
          <div className="w-full max-w-5xl mx-auto mt-16 animate-result">
            <ResultCard result={result} />
          </div>
        )}
      </section>


      {/* ── EVERYDAY COMPARISON ─── */}
      <section className="w-full bg-base-100 py-24 px-4 border-b border-base-content/10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs text-primary uppercase tracking-widest font-bold block mb-3">
              Putting Grams Into Perspective
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-base-content mb-4">
              What does a gram of CO₂ actually mean?
            </h2>
            <p className="text-sm text-base-content/60 leading-relaxed font-medium">
              A page-load report is only useful if the number means something.
              Here is what a few grams of CO₂ look like outside a browser tab.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 border border-base-content/10 bg-base-200/20">
            {EVERYDAY_COMPARISONS.map(({ icon: Icon, value, label }, idx) => (
              <div
                key={label}
                className={`p-8 flex flex-col gap-4 ${idx !== EVERYDAY_COMPARISONS.length - 1
                    ? "border-b sm:border-b-0 sm:border-r border-base-content/10"
                    : ""
                  }`}
              >
                <Icon size={22} className="text-primary" />
                <div className="text-2xl font-black tracking-tight text-base-content">
                  {value}
                </div>
                <p className="text-sm text-base-content/60 font-medium leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY / ARCHITECTURE ───────────────────── 
          Explaining the 'How' to build technical authority.
      */}
      {!loading && (
        <section className="w-full bg-base-200/20 py-32 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-base-content/10 pb-8 mb-16">
              <div>
                <span className="text-xs text-primary uppercase tracking-widest font-bold block mb-3">
                  System Architecture
                </span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-base-content">
                  How EcoCheck Computes
                </h2>
              </div>
              <p className="text-sm text-base-content/40 mt-4 md:mt-0 uppercase tracking-wider font-bold max-w-[200px] md:text-right">
                Four critical execution sequences of a digital sustainability
                audit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-base-content/10 bg-base-100 shadow-2xl shadow-primary/5">
              {HOW_IT_WORKS.map(({ step, title, desc, icon: Icon }) => (
                <div
                  key={step}
                  className="border-b last:border-b-0 md:border-b-0 md:border-r last:border-r-0 border-base-content/10 p-8 hover:bg-base-200/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-10">
                      <div className="text-base-content/40 group-hover:text-primary transition-colors duration-300">
                        <Icon size={24} />
                      </div>
                      <span className="text-xs text-base-content/20 tracking-widest font-bold">
                        // CORE.{step}
                      </span>
                    </div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-base-content mb-4 group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm text-base-content/60 leading-relaxed font-medium">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WHAT YOU GET ──────────────────────────────────── 
          Sets expectations on the actual deliverable before the CTA,
          so visitors know what a report contains before they run one.
      */}
      <section className="w-full bg-base-100 py-24 px-4 border-t border-base-content/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-1/3">
            <span className="text-xs text-primary uppercase tracking-widest font-bold block mb-3">
              The Report
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-base-content">
              Every audit returns four numbers
            </h2>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-base-content mb-2">
                Page weight
              </h3>
              <p className="text-sm text-base-content/60 font-medium leading-relaxed">
                Total bytes transferred on first load, the same figure your
                browser's network tab would show.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-base-content mb-2">
                CO₂ per visit
              </h3>
              <p className="text-sm text-base-content/60 font-medium leading-relaxed">
                Grams of carbon emitted to deliver and render that page once,
                based on the Sustainable Web Design model.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-base-content mb-2">
                Hosting source
              </h3>
              <p className="text-sm text-base-content/60 font-medium leading-relaxed">
                Whether the server answering your request runs on a verified
                renewable energy grid.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-base-content mb-2">
                Annual impact
              </h3>
              <p className="text-sm text-base-content/60 font-medium leading-relaxed">
                What that single page-load cost projects to across a year of
                typical traffic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ────────────────────────────────── 
          Final conversion point.
      */}
      <section className="w-full py-32 px-4 bg-primary text-primary-content">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
            Ready to optimize your digital footprint?
          </h2>
          <p className="text-sm uppercase tracking-widest font-bold mb-12 opacity-80">
            Join 2,000+ organizations building a cleaner, faster, and more
            sustainable web.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-3 bg-primary-content text-primary px-10 py-5 text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform group"
          >
            Start New Audit
            <TbArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
