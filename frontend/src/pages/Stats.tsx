import { useEffect, useState } from "react";
import { getPomoSummary, type PomoSummary } from "../api";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";

function Stats() {
  const [summary, setSummary] = useState<PomoSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const auth = useContext(AuthContext);
  const token = auth?.token ?? "";

  useEffect(() => {
    if (!token) {
      setError("Missing auth token");
      setLoading(false);
      return;
    }

    getPomoSummary(token)
      .then(setSummary)
      .catch((err) => {
        console.error("Failed to load stats:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative z-0 font-quicksand text-slate-800">
      <Header description="Some stats to help you reach your goals 😊" />

      <main className="mx-auto max-w-2xl p-6">
        {loading && <p className="text-center">Loading stats...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {summary && (
          <div className="space-y-4">
            <div className="rounded-lg bg-sky-500 p-4 text-center font-bold text-sky-950 shadow">
              <h3>Last Day</h3>
              <p>{summary.last_day_total} minutes</p>
            </div>
            <div className="rounded-lg bg-sky-500 p-4 text-center font-bold text-sky-950 shadow">
              <h3>Last Week</h3>
              <p>{summary.last_week_total} minutes</p>
            </div>
            <div className="rounded-lg bg-sky-500 p-4 text-center font-bold text-sky-950 shadow">
              <h3>Last Month</h3>
              <p>{summary.last_month_total} minutes</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Stats;
