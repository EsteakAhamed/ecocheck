// client/src/components/ResultCard.jsx
import { useState } from "react";
import { Link } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import {
  TbWeight,
  TbCloudDataConnection,
  TbCalendarTime,
  TbLeaf,
  TbCar,
  TbTree,
  TbDeviceMobile,
  TbSearch,
  TbArrowRight,
  TbCopy,
  TbCheck,
} from "react-icons/tb";
import { MdCheckCircle, MdCancel } from "react-icons/md";

const formatSize = (bytes) => {
  if (!bytes) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
};

// ── Reference benchmarks ────────────────────────────────────
const GLOBAL_AVG_CO2_PER_VISIT = 0.5; // grams of CO2 for an average page view
const GOOGLE_SEARCH_CO2 = 0.2; // grams of CO2 per search
const PHONE_CHARGE_CO2 = 8.5; // grams of CO2 per full smartphone charge

// Mirrors the grade thresholds in server/services/co2Service.js (getRating).
// Keep these two in sync if the server's bands ever change.
const SCALE_DOMAIN_MAX = 1; // grams — visual cap for the scale; F is open-ended past this
const RATING_THRESHOLDS = [
  { grade: "A+", max: 0.095 },
  { grade: "A", max: 0.186 },
  { grade: "B", max: 0.341 },
  { grade: "C", max: 0.493 },
  { grade: "D", max: 0.656 },
  { grade: "E", max: 0.846 },
  { grade: "F", max: SCALE_DOMAIN_MAX },
];

// Colors for the resource-type composition chart.
const TYPE_COLORS = {
  script: "#f59e0b",
  image: "#3b82f6",
  stylesheet: "#a855f7",
  font: "#ec4899",
  document: "#10b981",
  media: "#06b6d4",
  other: "#9ca3af",
};

// Reads the live theme accent from CSS so the chart/gauge colors always
// match whatever --nav-accent currently resolves to (light/dark/eco theme).
const getAccentHex = () => {
  if (typeof window === "undefined") return "#66cc8a";
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--nav-accent")
    .trim();
  return value || "#66cc8a";
};

const ChartTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-base-100 border-2 border-base-content/30 px-3 py-2">
      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-base-content/60 mb-1">
        {item.payload.label}
      </p>
      <p className="text-sm font-black text-base-content">
        {item.value.toFixed(3)}g CO₂
      </p>
    </div>
  );
};

const BreakdownTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-base-100 border-2 border-base-content/30 px-3 py-2">
      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-base-content/60 mb-1">
        {item.payload.label}
      </p>
      <p className="text-sm font-black text-base-content">
        {formatSize(item.value)}
      </p>
    </div>
  );
};

const ResultCard = ({ result }) => {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const {
    url,
    bytes,
    green,
    hostedBy,
    co2PerVisit,
    rating,
    annualCO2Kg,
    breakdown,
  } = result;
  const displayUrl = url.replace(/\/$/, "").replace(/^https?:\/\//, "");
  const co2Val = co2PerVisit || 0;
  const accentHex = getAccentHex();

  // ── DYNAMIC COLOR GRADING SYSTEM ───────────────────────────
  // "A" grade now uses your actual theme accent instead of neon green.
  let gradeTheme = {
    bg: "bg-base-200",
    accent: "bg-base-content text-base-100",
    hex: "#888888",
    message: "System Audit Complete.",
    subMessage: "Analysis indicates standard operational parameters.",
  };

  if (rating === "A+" || rating === "A") {
    gradeTheme = {
      bg: "bg-[var(--nav-accent)]/10",
      accent:
        "bg-[var(--nav-accent)] text-[var(--color-primary-content,#1a1a1a)]",
      hex: accentHex,
      message: "Exceptional Efficiency.",
      subMessage:
        "This digital asset operates with a highly optimized carbon footprint.",
    };
  } else if (rating === "B" || rating === "C") {
    gradeTheme = {
      bg: "bg-yellow-400/10",
      accent: "bg-yellow-400 text-black",
      hex: "#facc15",
      message: "Moderate Footprint.",
      subMessage:
        "This asset is functional but contains unoptimized payload weights.",
    };
  } else if (rating === "D" || rating === "E" || rating === "F") {
    gradeTheme = {
      bg: "bg-red-500/10",
      accent: "bg-red-500 text-white",
      hex: "#ef4444",
      message: "Critical Inefficiency.",
      subMessage:
        "Severe asset bloat detected. Immediate infrastructure optimization recommended.",
    };
  }

  // ── Relatable comparisons ──────────────────────────────────
  const treesNeeded = Math.max(1, Math.ceil(annualCO2Kg / 22));
  const kmDriven = Math.max(1, Math.round((annualCO2Kg * 1000) / 192));
  const phoneCharges = Math.max(
    1,
    Math.round((annualCO2Kg * 1000) / PHONE_CHARGE_CO2),
  );
  const searchesEquivalent = Math.max(
    1,
    Math.round(co2Val / GOOGLE_SEARCH_CO2),
  );

  const co2PerKB = bytes > 0 ? co2Val / (bytes / 1024) : 0;

  const diffPercent = Math.round(
    ((GLOBAL_AVG_CO2_PER_VISIT - co2Val) / GLOBAL_AVG_CO2_PER_VISIT) * 100,
  );
  const isCleaner = diffPercent >= 0;

  const barData = [
    { label: "This Page", value: co2Val, fill: gradeTheme.hex },
    {
      label: "Global Average",
      value: GLOBAL_AVG_CO2_PER_VISIT,
      fill: "#9ca3af",
    },
  ];

  const RATING_CEILING = 5;
  const gaugeValue = Math.min(co2Val, RATING_CEILING);
  const gaugeData = [
    {
      name: "rating",
      value: gaugeValue,
      fill: gradeTheme.hex,
    },
  ];

  // ── Emission Scale (A+ → F band strip) ─────────────────────
  const getBandVisual = (grade) => {
    if (grade === "A+" || grade === "A") {
      return { hex: accentHex, textClass: "text-[var(--color-primary-content,#1a1a1a)]" };
    }
    if (grade === "B" || grade === "C") {
      return { hex: "#facc15", textClass: "text-black" };
    }
    return { hex: "#ef4444", textClass: "text-white" };
  };

  const scaleBands = RATING_THRESHOLDS.map((band, idx) => {
    const prevMax = idx === 0 ? 0 : RATING_THRESHOLDS[idx - 1].max;
    const widthPercent = ((band.max - prevMax) / SCALE_DOMAIN_MAX) * 100;
    return { ...band, widthPercent };
  });

  const markerPercent = Math.min(
    Math.max((co2Val / SCALE_DOMAIN_MAX) * 100, 3),
    97,
  );

  const currentBandIndex = RATING_THRESHOLDS.findIndex(
    (b) => b.grade === rating,
  );
  const nextGrade =
    currentBandIndex > 0 ? RATING_THRESHOLDS[currentBandIndex - 1].grade : null;
  const nextGradeMax =
    currentBandIndex > 0 ? RATING_THRESHOLDS[currentBandIndex - 1].max : null;
  const gapToNextGrade =
    nextGradeMax !== null ? Math.max(0, co2Val - nextGradeMax) : 0;

  // Same annualization assumption already used server-side (10,000 monthly visits × 12).
  const headroomToAPlus = Math.max(0, co2Val - RATING_THRESHOLDS[0].max);
  const headroomAnnualKg = ((headroomToAPlus * 10000 * 12) / 1000).toFixed(2);

  // ── Composition Breakdown (by resource type) ────────────────
  const breakdownTotal = (breakdown || []).reduce(
    (sum, item) => sum + item.bytes,
    0,
  );
  const breakdownData = (breakdown || []).map((item) => ({
    type: item.type,
    label: item.label,
    bytes: item.bytes,
    fill: TYPE_COLORS[item.type] || TYPE_COLORS.other,
    percentLabel:
      breakdownTotal > 0 ? `${Math.round((item.bytes / breakdownTotal) * 100)}%` : "",
  }));

  const handleCopy = () => {
    const summary = `${displayUrl} emits ~${co2Val.toFixed(2)}g CO₂ per page load (Rating: ${rating || "N/A"
      }). Checked with EcoCheck.`;
    navigator.clipboard?.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div key={url} className="w-full flex flex-col text-left animate-result">
      {/* ── TOP BANNER ────────────────────────────────────────── */}
      <div className="bg-base-200 border-2 border-b-0 border-base-content/20 p-4 px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/50 block mb-0.5">
            Target Resolution Identifier
          </span>
          <p
            className="text-sm sm:text-base font-bold text-base-content truncate max-w-md"
            title={url}
          >
            {displayUrl}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/50">
            Engine Core: CO2.JS
          </span>
          <span className="w-2 h-2 bg-[var(--nav-accent)] block animate-pulse"></span>
        </div>
      </div>

      {/* ── MAIN DASHBOARD ────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row w-full border-2 border-base-content/20 bg-base-100 items-stretch">
        {/* SCORECARD WITH RADIAL GAUGE */}
        <div
          className={`w-full lg:w-2/5 flex flex-col justify-between p-8 sm:p-12 border-b lg:border-b-0 lg:border-r-2 border-base-content/20 ${gradeTheme.bg}`}
        >
          <div>
            <div
              className={`inline-block px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${gradeTheme.accent}`}
            >
              EcoCheck Rating
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-[1.05] text-base-content mb-4">
              {gradeTheme.message}
            </h2>
            <p className="text-sm font-medium leading-relaxed text-base-content/70 max-w-sm">
              {gradeTheme.subMessage}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <div className="relative w-32 h-32 flex-shrink-0">
              <RadialBarChart
                width={128}
                height={128}
                innerRadius="70%"
                outerRadius="100%"
                data={gaugeData}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, RATING_CEILING]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background={{ fill: "rgba(128,128,128,0.15)" }}
                  dataKey="value"
                  cornerRadius={0}
                  animationDuration={900}
                  animationEasing="ease-out"
                />
              </RadialBarChart>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-black text-base-content">
                  {rating || "?"}
                </span>
              </div>
            </div>
            <div className="pb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/50 block mb-1">
                Measured Yield
              </span>
              <p className="text-2xl font-black text-base-content tracking-tighter">
                {co2Val.toFixed(3)}g
                <span className="text-sm font-bold text-base-content/50 tracking-normal ml-2">
                  CO₂ / Load
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="w-full lg:w-3/5 grid grid-cols-1 sm:grid-cols-2">
          <div className="p-8 border-b sm:border-r border-base-content/10 flex flex-col justify-center">
            <div className="w-10 h-10 border border-base-content/20 bg-base-200 flex items-center justify-center text-base-content mb-4">
              <TbWeight size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/50 mb-1">
              Total Asset Weight
            </span>
            <span className="text-2xl font-black tracking-tight">
              {formatSize(bytes)}
            </span>
            <span className="text-xs font-medium text-base-content/40 mt-1">
              ({bytes?.toLocaleString()} raw bytes)
            </span>
          </div>

          <div className="p-8 border-b border-base-content/10 flex flex-col justify-center">
            <div className="w-10 h-10 border border-base-content/20 bg-base-200 flex items-center justify-center text-base-content mb-4">
              <TbCalendarTime size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/50 mb-1">
              Annual Impact (Est)
            </span>
            <span className="text-2xl font-black tracking-tight">
              {annualCO2Kg} kg
            </span>
            <span className="text-xs font-medium text-base-content/40 mt-1">
              Atmospheric CO₂
            </span>
          </div>

          <div className="p-8 sm:border-r border-b sm:border-b-0 border-base-content/10 flex flex-col justify-center">
            <div className="w-10 h-10 border border-base-content/20 bg-base-200 flex items-center justify-center text-base-content mb-4">
              <TbLeaf
                size={20}
                className={
                  green ? "text-[var(--nav-accent)]" : "text-base-content/50"
                }
              />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/50 mb-1">
              Energy Source
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-black tracking-tight">
                {green ? "Renewable Grid" : "Fossil Fuel"}
              </span>
              {green ? (
                <MdCheckCircle size={16} className="text-[var(--nav-accent)]" />
              ) : (
                <MdCancel size={16} className="text-red-500" />
              )}
            </div>
            <span className="text-xs font-medium text-base-content/50 mt-1">
              {hostedBy || "Standard"}
            </span>
          </div>

          <div className="p-8 flex flex-col justify-center">
            <div className="w-10 h-10 border border-base-content/20 bg-base-200 flex items-center justify-center text-base-content mb-4">
              <TbCloudDataConnection size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/50 mb-1">
              Carbon Intensity
            </span>
            <span className="text-2xl font-black tracking-tight">
              {co2PerKB.toFixed(4)} g
            </span>
            <span className="text-xs font-medium text-base-content/40 mt-1">
              CO₂ emitted per KB transferred
            </span>
          </div>
        </div>
      </div>

      {/* ── GLOBAL BENCHMARK BAR CHART ──────────────────────────── */}
      <div className="border-2 border-t-0 border-base-content/20 bg-base-100 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/50">
            Vs. Global Average Page Load
          </span>
          <span
            className={`text-sm font-black uppercase tracking-tight ${isCleaner ? "text-[var(--nav-accent)]" : "text-red-500"
              }`}
          >
            {isCleaner
              ? `${diffPercent}% cleaner`
              : `${Math.abs(diffPercent)}% dirtier`}{" "}
            than average
          </span>
        </div>

        <div className="w-full h-[180px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={1}
            minHeight={1}
            initialDimension={{ width: 1, height: 1 }}
            debounce={50}
          >
            <BarChart
              data={barData}
              layout="vertical"
              margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
              barCategoryGap={28}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="label"
                tickLine={false}
                axisLine={false}
                width={110}
                tick={{
                  fontSize: 12,
                  fontWeight: 700,
                  fill: "var(--color-base-content, #333)",
                }}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ fill: "rgba(128,128,128,0.08)" }}
              />
              <Bar
                dataKey="value"
                radius={0}
                animationDuration={800}
                animationEasing="ease-out"
                barSize={28}
              >
                {barData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── EMISSION SCALE ──────────────────────────────────────── */}
      <div className="border-2 border-t-0 border-base-content/20 bg-base-100 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/50">
            Emission Scale
          </span>
          {nextGrade && (
            <span className="text-sm font-black uppercase tracking-tight text-base-content/70">
              {gapToNextGrade.toFixed(3)}g from {nextGrade} rating
            </span>
          )}
        </div>

        <div className="relative pt-9">
          <div
            className="absolute top-0 flex flex-col items-center"
            style={{ left: `${markerPercent}%`, transform: "translateX(-50%)" }}
          >
            <span className="text-[10px] font-black uppercase tracking-wider text-base-content whitespace-nowrap mb-1">
              You · {co2Val.toFixed(3)}g
            </span>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: `8px solid ${gradeTheme.hex}`,
              }}
            />
          </div>

          <div className="flex h-8 border border-base-content/20 overflow-hidden">
            {scaleBands.map((band) => {
              const visual = getBandVisual(band.grade);
              const active = band.grade === rating;
              return (
                <div
                  key={band.grade}
                  className={`flex items-center justify-center text-[10px] font-black uppercase border-r border-base-content/10 last:border-r-0 transition-colors duration-500 ${active ? visual.textClass : "text-base-content/30"
                    }`}
                  style={{
                    width: `${band.widthPercent}%`,
                    backgroundColor: active ? visual.hex : "transparent",
                  }}
                >
                  {band.grade}
                </div>
              );
            })}
          </div>
        </div>

        {headroomToAPlus > 0 && (
          <p className="text-xs font-medium text-base-content/60 mt-4 leading-relaxed">
            Trimming this page to A+ efficiency (0.095g/visit) would cut emissions by{" "}
            <span className="font-black text-base-content">
              {headroomToAPlus.toFixed(3)}g per visit.
            </span>{" "}
            roughly{" "}
            <span className="font-black text-base-content">
              {headroomAnnualKg} kg/year
            </span>{" "}
            at current traffic assumptions.
          </p>
        )}
      </div>

      {/* ── COMPOSITION BREAKDOWN ───────────────────────────────── */}
      {breakdownData.length > 0 && (
        <div className="border-2 border-t-0 border-base-content/20 bg-base-100 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/50">
              Composition Breakdown
            </span>
            <span className="text-[10px] font-medium text-base-content/40 uppercase tracking-wider">
              By resource type
            </span>
          </div>

          <div
            className="w-full"
            style={{ height: Math.max(breakdownData.length * 36, 120) }}
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
              minWidth={1}
              minHeight={1}
              initialDimension={{ width: 1, height: 1 }}
              debounce={50}
            >
              <BarChart
                data={breakdownData}
                layout="vertical"
                margin={{ top: 0, right: 50, bottom: 0, left: 0 }}
                barCategoryGap={14}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  width={90}
                  tick={{
                    fontSize: 12,
                    fontWeight: 700,
                    fill: "var(--color-base-content, #333)",
                  }}
                />
                <Tooltip
                  content={<BreakdownTooltip />}
                  cursor={{ fill: "rgba(128,128,128,0.08)" }}
                />
                <Bar
                  dataKey="bytes"
                  radius={0}
                  animationDuration={800}
                  animationEasing="ease-out"
                  barSize={20}
                >
                  {breakdownData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                  <LabelList
                    dataKey="percentLabel"
                    position="right"
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      fill: "var(--color-base-content, #333)",
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ── RELATABLE IMPACT ──────────────────────────────────── */}
      <div className="border-2 border-t-0 border-base-content/20 bg-base-200/50 p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 shrink-0 bg-base-100 border border-base-content/20 flex items-center justify-center">
            <TbTree size={20} className="text-[var(--nav-accent)]" />
          </div>
          <p className="text-xs font-bold text-base-content/80">
            <span className="text-base font-black block">
              {treesNeeded} mature trees
            </span>
            needed annually to absorb this page's footprint.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 shrink-0 bg-base-100 border border-base-content/20 flex items-center justify-center">
            <TbCar size={20} />
          </div>
          <p className="text-xs font-bold text-base-content/80">
            <span className="text-base font-black block">
              {kmDriven.toLocaleString()} km
            </span>
            of driving emits the same CO₂, annually.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 shrink-0 bg-base-100 border border-base-content/20 flex items-center justify-center">
            <TbDeviceMobile size={20} />
          </div>
          <p className="text-xs font-bold text-base-content/80">
            <span className="text-base font-black block">
              {phoneCharges.toLocaleString()} phone charges
            </span>
            worth of CO₂, emitted annually.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 shrink-0 bg-base-100 border border-base-content/20 flex items-center justify-center">
            <TbSearch size={20} />
          </div>
          <p className="text-xs font-bold text-base-content/80">
            <span className="text-base font-black block">
              {searchesEquivalent} Google searches
            </span>
            ≈ one load of this page.
          </p>
        </div>
      </div>

      {/* ── ACTIONS ───────────────────────────────────────────── */}
      <div className="border-2 border-t-0 border-base-content/20 bg-base-100 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/how-it-works"
          className="group flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-base-content/60 hover:text-[var(--nav-accent)] transition-colors duration-200"
        >
          How we calculate this
          <TbArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 border-2 border-base-content/20 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] hover:border-[var(--nav-accent)] hover:text-[var(--nav-accent)] transition-colors duration-200"
        >
          {copied ? <TbCheck size={14} /> : <TbCopy size={14} />}
          {copied ? "Copied" : "Copy Result"}
        </button>
      </div>
    </div>
  );
};

export default ResultCard;