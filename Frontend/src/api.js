const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path) {
  const response = await fetch(`${API_BASE}${path}`);
  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok || !payload?.success) {
    throw new Error(payload?.message || `Request failed (${response.status})`);
  }

  return payload.data;
}

export function getHealth() {
  return request("/health");
}

export function getDevelopers() {
  return request("/developers");
}

export function getDeveloper(name) {
  return request(`/developers/${encodeURIComponent(name)}`);
}

export function getDeveloperSkills(name) {
  return request(`/developers/${encodeURIComponent(name)}/skills`);
}

export function getDeveloperProjects(name) {
  return request(`/developers/${encodeURIComponent(name)}/projects`);
}

export function getDeveloperNetwork(name) {
  return request(`/developers/${encodeURIComponent(name)}/network`);
}

export function getDevelopersBySkill(skill) {
  return request(`/developers/skill/${encodeURIComponent(skill)}`);
}

export function getStats() {
  return request("/developers/stats");
}
