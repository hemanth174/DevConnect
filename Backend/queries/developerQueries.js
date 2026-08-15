const GET_DEVELOPERS = `
  MATCH (d:Developer)
  RETURN d.name AS name, d.email AS email, d.bio AS bio
  ORDER BY d.name
`;

const GET_DEVELOPER_BY_NAME = `
  MATCH (d:Developer {name: $name})
  OPTIONAL MATCH (d)-[:HAS_SKILL]->(s:Skill)
  OPTIONAL MATCH (d)-[:WORKED_ON]->(p:Project)
  WITH d,
       collect(DISTINCT s.name) AS skills,
       collect(DISTINCT p.name) AS projects
  RETURN d.name AS name,
         d.email AS email,
         d.bio AS bio,
         skills,
         projects
`;

const GET_DEVELOPER_SKILLS = `
  MATCH (d:Developer {name: $name})-[:HAS_SKILL]->(s:Skill)
  RETURN s.name AS skill
  ORDER BY s.name
`;

const GET_DEVELOPER_PROJECTS = `
  MATCH (d:Developer {name: $name})-[:WORKED_ON]->(p:Project)
  OPTIONAL MATCH (p)-[:USES]->(t:Technology)
  RETURN p.name AS project,
         p.description AS description,
         collect(DISTINCT t.name) AS technologies
  ORDER BY p.name
`;

const GET_DEVELOPER_NETWORK = `
  MATCH (source:Developer {name: $name})-[:KNOWS]->(developer:Developer)-[:HAS_SKILL]->(skill:Skill)
  RETURN developer.name AS developer,
         collect(DISTINCT skill.name) AS skills
  ORDER BY developer.name
`;

const GET_DEVELOPERS_BY_SKILL = `
  MATCH (d:Developer)-[:HAS_SKILL]->(s:Skill {name: $skill})
  RETURN d.name AS name,
         d.email AS email,
         d.bio AS bio
  ORDER BY d.name
`;

const GET_GRAPH_STATS = `
  MATCH (d:Developer)
  OPTIONAL MATCH (s:Skill)
  OPTIONAL MATCH (p:Project)
  OPTIONAL MATCH (t:Technology)
  RETURN count(DISTINCT d) AS developers,
         count(DISTINCT s) AS skills,
         count(DISTINCT p) AS projects,
         count(DISTINCT t) AS technologies
`;

module.exports = {
  GET_DEVELOPERS,
  GET_DEVELOPER_BY_NAME,
  GET_DEVELOPER_SKILLS,
  GET_DEVELOPER_PROJECTS,
  GET_DEVELOPER_NETWORK,
  GET_DEVELOPERS_BY_SKILL,
  GET_GRAPH_STATS,
};
