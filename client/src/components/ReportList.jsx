// client/src/components/ReportList.jsx
import { Link } from "react-router";
import { TbLeaf } from "react-icons/tb";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatBytes = (bytes) => {
  if (!bytes) return "—";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
};

const ReportList = ({ reports }) => {
  if (!reports || reports.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-24 px-4 text-center border-2 border-base-content/10 bg-base-200/20">
        <div className="w-16 h-16 border border-base-content/20 bg-base-100 flex items-center justify-center mb-6 text-base-content/40">
          <TbLeaf size={28} />
        </div>
        <h3 className="text-xl font-black uppercase tracking-tight text-base-content mb-2">
          No Audits Logged
        </h3>
        <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest max-w-md mb-8">
          The database currently holds no historical footprint records.
        </p>
        <Link
          to="/"
          className="bg-[var(--nav-accent)] hover:opacity-90 text-[var(--color-primary-content,#1a1a1a)] font-black uppercase tracking-widest text-xs px-8 py-4 transition-opacity duration-150 rounded-none shadow-none"
        >
          Initialize First Audit
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto border-2 border-base-content/20 bg-base-100 rounded-none shadow-sm animate-result">
      <table className="w-full text-left border-collapse">
        <thead className="bg-base-200/50 text-base-content border-b-2 border-base-content/20">
          <tr>
            <th className="p-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
              Target Domain
            </th>
            <th className="p-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
              Asset Weight
            </th>
            <th className="p-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap text-center">
              Class Rating
            </th>
            <th className="p-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
              CO₂ / Load
            </th>
            <th className="p-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
              Grid Infrastructure
            </th>
            <th className="p-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap text-right">
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody className="text-sm font-medium">
          {reports.map((report) => {
            const displayUrl = (report.url || "—")
              .replace(/\/$/, "")
              .replace(/^https?:\/\//, "");

            // Dynamic Rating Block Colors — A/A+ now uses the theme accent
            // instead of a hardcoded neon green, so it matches ResultCard.
            let ratingColors =
              "bg-base-200 text-base-content border-base-content/30";
            const r = report.rating;
            if (r === "A+" || r === "A")
              ratingColors =
                "bg-[var(--nav-accent)] text-[var(--color-primary-content,#1a1a1a)] border-[var(--nav-accent)]";
            else if (r === "B" || r === "C")
              ratingColors = "bg-yellow-400 text-black border-yellow-400";
            else if (r === "D" || r === "E" || r === "F")
              ratingColors = "bg-red-500 text-white border-red-500";

            return (
              <tr
                key={report._id}
                className="border-b border-base-content/10 hover:bg-base-200/30 transition-colors"
              >
                <td
                  className="p-4 truncate max-w-[200px] text-base-content font-bold"
                  title={report.url}
                >
                  {displayUrl}
                </td>

                <td className="p-4 text-base-content/70">
                  {formatBytes(report.bytes)}
                </td>

                <td className="p-4 text-center">
                  {report.rating ? (
                    <div
                      className={`mx-auto flex items-center justify-center w-8 h-8 border text-xs font-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${ratingColors}`}
                    >
                      {report.rating}
                    </div>
                  ) : (
                    <span className="text-base-content/30">—</span>
                  )}
                </td>

                <td className="p-4 text-base-content font-bold">
                  {report.co2PerVisit != null
                    ? `${Number(report.co2PerVisit).toFixed(4)} g`
                    : "—"}
                </td>

                <td className="p-4">
                  {report.green ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--nav-accent)] border border-[var(--nav-accent)]/30 bg-[var(--nav-accent)]/10 px-2 py-1 rounded-none inline-block">
                      Renewable
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/50 border border-base-content/20 bg-base-200 px-2 py-1 rounded-none inline-block">
                      Standard
                    </span>
                  )}
                </td>

                <td className="p-4 text-base-content/50 text-xs text-right whitespace-nowrap">
                  {report.createdAt ? formatDate(report.createdAt) : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportList;
