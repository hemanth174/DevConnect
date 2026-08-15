const driver = require("../config/database");
const {
  GET_DEVELOPERS,
  GET_DEVELOPER_BY_NAME,
  GET_DEVELOPER_SKILLS,
  GET_DEVELOPER_PROJECTS,
  GET_DEVELOPER_NETWORK,
  GET_DEVELOPERS_BY_SKILL,
  GET_GRAPH_STATS,
} = require("../queries/developerQueries");

async function runQuery(query, parameters = {}) {
  const session = driver.session();
  try {
    const result = await session.run(query, parameters);
    return result.records;
  } finally {
    await session.close();
  }
}

function toNullableString(value) {
  return value == null ? null : value.toString();
}

async function getDevelopers() {
  const records = await runQuery(GET_DEVELOPERS);
  return records.map((record) => ({
    name: record.get("name"),
    email: record.get("email"),
    bio: record.get("bio"),
  }));
}

async function getDeveloperByName(name) {
  const records = await runQuery(GET_DEVELOPER_BY_NAME, { name });
  if (records.length === 0) return null;

  const record = records[0];
  return {
    name: record.get("name"),
    email: record.get("email"),
    bio: record.get("bio"),
    skills: record.get("skills").filter(Boolean),
    projects: record.get("projects").filter(Boolean),
  };
}

async function getDeveloperSkills(name) {
  const records = await runQuery(GET_DEVELOPER_SKILLS, { name });
  return records.map((record) => record.get("skill"));
}

async function getDeveloperProjects(name) {
  const records = await runQuery(GET_DEVELOPER_PROJECTS, { name });
  return records.map((record) => ({
    project: record.get("project"),
    description: record.get("description"),
    technologies: record.get("technologies").filter(Boolean),
  }));
}

async function getDeveloperNetwork(name) {
  const records = await runQuery(GET_DEVELOPER_NETWORK, { name });
  return records.map((record) => ({
    developer: record.get("developer"),
    skills: record.get("skills").filter(Boolean),
  }));
}

async function getDevelopersBySkill(skill) {
  const records = await runQuery(GET_DEVELOPERS_BY_SKILL, { skill });
  return records.map((record) => ({
    name: record.get("name"),
    email: record.get("email"),
    bio: record.get("bio"),
  }));
}

async function getGraphStats() {
  const records = await runQuery(GET_GRAPH_STATS);
  if (records.length === 0) {
    return { developers: 0, skills: 0, projects: 0, technologies: 0 };
  }

  const record = records[0];
  return {
    developers: toNullableString(record.get("developers")),
    skills: toNullableString(record.get("skills")),
    projects: toNullableString(record.get("projects")),
    technologies: toNullableString(record.get("technologies")),
  };
}

module.exports = {
  getDevelopers,
  getDeveloperByName,
  getDeveloperSkills,
  getDeveloperProjects,
  getDeveloperNetwork,
  getDevelopersBySkill,
  getGraphStats,
};
