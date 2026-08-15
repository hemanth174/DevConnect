import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Search, Users, Layers3, FolderKanban, Database, ArrowUpRight, RefreshCw } from "lucide-react";
import { getDeveloper, getDeveloperNetwork, getDeveloperProjects, getDeveloperSkills, getDevelopers, getDevelopersBySkill, getHealth, getStats } from "./api";
import DeveloperCard from "./components/DeveloperCard";
import DetailPanel from "./components/DetailPanel";
import StatCard from "./components/StatCard";
import "./styles.css";

function App() {
  const [developers, setDevelopers] = useState([]);
  const [stats, setStats] = useState({ developers: "—", skills: "—", projects: "—", technologies: "—" });
  const [query, setQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState({ skills: [], projects: [], network: [] });
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");
  const [database, setDatabase] = useState("checking");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [devs, summary, health] = await Promise.all([getDevelopers(), getStats(), getHealth()]);
      setDevelopers(devs);
      setStats(summary);
      setDatabase(health.database);
    } catch (err) {
      setError(err.message);
      setDatabase("unavailable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return developers;
    return developers.filter((dev) => `${dev.name} ${dev.email} ${dev.bio}`.toLowerCase().includes(q));
  }, [developers, query]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!skillFilter.trim()) {
      loadData();
      return;
    }

    setLoading(true);
    setError("");
    try {
      const result = await getDevelopersBySkill(skillFilter.trim());
      setDevelopers(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openDeveloper = async (developer) => {
    setSelected(developer);
    setDetailLoading(true);
    try {
      const [profile, skills, projects, network] = await Promise.all([
        getDeveloper(developer.name),
        getDeveloperSkills(developer.name),
        getDeveloperProjects(developer.name),
        getDeveloperNetwork(developer.name),
      ]);
      setSelected(profile);
      setDetail({ skills, projects, network });
    } catch (err) {
      setError(err.message);
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">DC</div>
          <div>
            <strong>DevConnect</strong>
            <span>Developer Graph Explorer</span>
          </div>
        </div>
        <div className={`db-status ${database === "connected" ? "online" : "offline"}`}>
          <span className="status-dot" />
          {database === "connected" ? "CognoDB connected" : database === "checking" ? "Checking…" : "Database unavailable"}
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div>
            <div className="eyebrow">Graph-powered developer discovery</div>
            <h1>Explore people through their <span>connections.</span></h1>
            <p>Find developers, skills and projects through relationships stored in CognoDB.</p>
          </div>
          <button className="refresh-button" onClick={loadData}><RefreshCw size={16} /> Refresh</button>
        </section>

        <section className="stats-grid">
          <StatCard label="Developers" value={stats.developers} icon={<Users size={18} />} />
          <StatCard label="Skills" value={stats.skills} icon={<Layers3 size={18} />} />
          <StatCard label="Projects" value={stats.projects} icon={<FolderKanban size={18} />} />
          <StatCard label="Technologies" value={stats.technologies} icon={<Database size={18} />} />
        </section>

        <section className="search-section">
          <form className="search-row" onSubmit={handleSearch}>
            <div className="search-box">
              <Search size={18} />
              <input value={skillFilter} onChange={(e) => setSkillFilter(e.target.value)} placeholder="Search by skill, e.g. React" />
            </div>
            <button className="primary-button" type="submit">Find developers</button>
          </form>
          <div className="secondary-search">
            <Search size={16} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter loaded results by name or bio…" />
          </div>
        </section>

        {error && (
          <div className="error-box">
            <div>
              <strong>Something went wrong</strong>
              <p>{error}</p>
            </div>
            <button onClick={loadData}>Retry</button>
          </div>
        )}

        <section className="results-head">
          <div>
            <div className="eyebrow">Network</div>
            <h2>Developers</h2>
          </div>
          <span>{filtered.length} results</span>
        </section>

        {loading ? (
          <div className="state-card">Loading graph data…</div>
        ) : filtered.length === 0 ? (
          <div className="state-card">
            <div className="empty-icon"><Users size={22} /></div>
            <h3>No developers found</h3>
            <p>Try another skill or clear the filters.</p>
            <button className="secondary-button" onClick={() => { setSkillFilter(""); setQuery(""); loadData(); }}>Clear filters</button>
          </div>
        ) : (
          <div className="developer-grid">
            {filtered.map((developer) => (
              <DeveloperCard key={developer.name} developer={developer} onOpen={openDeveloper} />
            ))}
          </div>
        )}

        <section className="architecture-card">
          <div>
            <div className="eyebrow">How it works</div>
            <h2>React → Express → Neo4j Driver → CognoDB</h2>
            <p>The UI never talks directly to the database. The backend runs parameterized Cypher and returns safe JSON to the frontend.</p>
          </div>
          <ArrowUpRight size={28} />
        </section>
      </main>

      <DetailPanel
        developer={selected}
        skills={detail.skills}
        projects={detail.projects}
        network={detail.network}
        loading={detailLoading}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
