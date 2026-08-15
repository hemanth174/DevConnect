export default function DeveloperCard({ developer, onOpen }) {
  const initials = developer.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <button className="developer-card" onClick={() => onOpen(developer)}>
      <div className="avatar">{initials}</div>
      <div className="card-main">
        <h3>{developer.name}</h3>
        <p>{developer.bio || "Developer in the DevConnect network."}</p>
        <span>{developer.email}</span>
      </div>
      <div className="arrow">→</div>
    </button>
  );
}
