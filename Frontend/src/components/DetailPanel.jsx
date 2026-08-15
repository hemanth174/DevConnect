export default function DetailPanel({ developer, skills, projects, network, loading, onClose }) {
  if (!developer) return null;

  return (
    <div className="panel-overlay" onClick={onClose}>
      <aside className="detail-panel" onClick={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close">×</button>
        <div className="detail-header">
          <div className="avatar large">
            {developer.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()}
          </div>
          <div>
            <div className="eyebrow">Developer profile</div>
            <h2>{developer.name}</h2>
            <p>{developer.email}</p>
          </div>
        </div>
        <p className="detail-bio">{developer.bio}</p>
        {loading ? (
          <div className="loading-block">Loading graph relationships…</div>
        ) : (
          <>
            <section className="detail-section">
              <div className="section-title">Skills</div>
              <div className="chips">
                {skills.length ? skills.map((skill) => <span className="chip" key={skill}>{skill}</span>) : <span className="muted">No skills found.</span>}
              </div>
            </section>
            <section className="detail-section">
              <div className="section-title">Projects</div>
              <div className="project-list">
                {projects.length ? projects.map((project) => (
                  <div className="project-item" key={project.project}>
                    <strong>{project.project}</strong>
                    <span>{project.description}</span>
                    <div className="chips compact">
                      {project.technologies.map((tech) => <span className="chip" key={tech}>{tech}</span>)}
                    </div>
                  </div>
                )) : <span className="muted">No projects found.</span>}
              </div>
            </section>
            <section className="detail-section">
              <div className="section-title">2-hop network</div>
              <div className="network-box">
                {network.length ? network.map((item) => (
                  <div className="network-row" key={item.developer}>
                    <div>
                      <strong>{item.developer}</strong>
                      <div className="muted">KNOWS → HAS_SKILL</div>
                    </div>
                    <div className="chips compact">
                      {item.skills.map((skill) => <span className="chip" key={skill}>{skill}</span>)}
                    </div>
                  </div>
                )) : <span className="muted">No second-hop connections found.</span>}
              </div>
            </section>
          </>
        )}
      </aside>
    </div>
  );
}
