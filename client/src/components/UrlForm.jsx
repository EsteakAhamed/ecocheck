// client/src/components/UrlForm.jsx
import { useState } from "react";
import { TbSearch, TbLoader2 } from "react-icons/tb";
import { MdLockOutline, MdOutlineSpeed, MdOutlinePublic } from "react-icons/md";
import { RiLeafLine } from "react-icons/ri";

const TRUST_ITEMS = [
  { icon: MdLockOutline, label: "No tracking" },
  { icon: MdOutlineSpeed, label: "Real page load" },
  { icon: RiLeafLine, label: "Green hosting check" },
  { icon: MdOutlinePublic, label: "100% free" },
];

const UrlForm = ({ onAnalyze, loading }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;

    // Auto-prepend https:// if no protocol given
    const finalUrl =
      trimmed.startsWith("http://") || trimmed.startsWith("https://")
        ? trimmed
        : `https://${trimmed}`;

    onAnalyze(finalUrl);
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="carbon-form"
      aria-label="Carbon footprint calculator"
      className="w-full"
    >
      {/* Sharp, Flat geometric input row inspired by Website Carbon */}
      <div className="flex flex-col sm:flex-row items-stretch w-full border-2 border-base-content/20 bg-base-100 focus-within:border-[var(--nav-accent)] transition-colors duration-200 rounded-none">
        {/* URL Input Box */}
        <div className="flex-1 flex items-center px-4 py-1">
          <input
            id="url-input"
            type="text"
            className="w-full py-3 bg-transparent text-sm sm:text-base text-base-content placeholder-base-content/30 outline-none border-none rounded-none font-medium"
            placeholder="example.com or https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            autoComplete="off"
            spellCheck={false}
            aria-label="Website URL to analyze"
          />
        </div>

        {/* Flat High-Contrast Action Button */}
        <button
          id="analyze-btn"
          type="submit"
          className="bg-[var(--nav-accent)] hover:bg-[#00e037] text-black font-black uppercase tracking-widest text-xs px-8 py-4 sm:py-0 transition-colors duration-150 rounded-none min-w-[140px] flex items-center justify-center gap-2 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={loading || !url.trim()}
        >
          {loading ? (
            <>
              <TbLoader2 size={15} className="animate-spin text-black" />
              <span>Analyzing</span>
            </>
          ) : (
            <>
              <TbSearch size={15} className="text-black" />
              <span>Analyze</span>
            </>
          )}
        </button>
      </div>

      {/* Monospaced, minimal safety metadata strip */}
      <div className="flex flex-wrap items-center justify-start sm:justify-center gap-x-6 gap-y-2 mt-4 px-1">
        {TRUST_ITEMS.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-base-content/50"
          >
            <Icon size={13} className="text-[var(--nav-accent)]" />
            {label}
          </span>
        ))}
      </div>
    </form>
  );
};

export default UrlForm;
