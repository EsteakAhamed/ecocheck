// client/src/pages/Reports.jsx
import { useEffect, useState } from "react";
import { TbChartBar, TbAlertCircle, TbSearch } from "react-icons/tb";
import { RiLeafLine } from "react-icons/ri";
import ReportList from "../components/ReportList";
import { getReports } from "../services/api";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getReports()
      .then((data) => setReports(data))
      .catch((err) => {
        console.error("Failed to load reports:", err);
        setError("Could not load reports. Is the server running?");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex-1 w-full px-4 py-12 lg:py-16 page-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* ── Header ─────────────────────────────────── */}
        <div className="mb-10 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-base-content flex items-center justify-center sm:justify-start gap-2.5">
              <TbChartBar className="text-[var(--nav-accent)]" size={32} />
              Carbon Reports
            </h1>
            {!loading && !error && reports.length > 0 && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-base-200 border border-base-300 rounded-full text-xs font-bold text-base-content/70 whitespace-nowrap self-center sm:self-auto">
                <RiLeafLine className="text-[var(--nav-accent)]" />{" "}
                {reports.length} {reports.length === 1 ? "site" : "sites"}{" "}
                analyzed
              </div>
            )}
          </div>
          <p className="text-base-content/60 font-medium max-w-xl">
            A public history of websites checked by visitors, showing the last
            50 results.
          </p>
        </div>

        {/* ── Error state ───────────────────────────── */}
        {error && (
          <div
            className="border-2 border-red-500/30 bg-red-500/5 text-red-600 dark:text-red-400 p-4 flex items-center gap-3 max-w-2xl mx-auto"
            role="alert"
          >
            <TbAlertCircle size={20} className="flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* ── Loading state ─────────────────────────── */}
        {loading && (
          <div
            className="py-20 text-center"
            aria-live="polite"
            aria-label="Loading reports"
          >
            <div className="flex items-center justify-center gap-1.5 mb-4">
              <div className="w-2.5 h-2.5 bg-[var(--nav-accent)] rounded-full dot-bounce" />
              <div className="w-2.5 h-2.5 bg-[var(--nav-accent)] rounded-full dot-bounce-2" />
              <div className="w-2.5 h-2.5 bg-[var(--nav-accent)] rounded-full dot-bounce-3" />
            </div>
            <p className="text-base-content/50 font-medium text-sm">
              Loading latest reports…
            </p>
          </div>
        )}

        {/* ── Empty state ───────────────────────────── */}
        {!loading && !error && reports.length === 0 && (
          <div className="border-2 border-dashed border-base-300 py-20 px-6 text-center flex flex-col items-center gap-4">
            <div className="w-14 h-14 border-2 border-base-300 flex items-center justify-center text-base-content/30">
              <TbSearch size={24} />
            </div>
            <div>
              <h2 className="font-bold text-base-content mb-1">
                No reports yet
              </h2>
              <p className="text-sm text-base-content/50 max-w-sm">
                Run an audit from the home page and it will show up here for
                everyone to see.
              </p>
            </div>
          </div>
        )}

        {/* ── Reports table ─────────────────────────── */}
        {!loading && !error && reports.length > 0 && (
          <ReportList reports={reports} />
        )}
      </div>
    </main>
  );
};

export default Reports;
