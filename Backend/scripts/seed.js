require("dotenv").config();

const driver = require("../config/database");

async function seedDatabase() {
  const session = driver.session();

  try {
    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);
    await session.run(`
      CREATE
        (:Developer {name: "Hemanth Atthuluri", email: "hemanth@example.com"}),
        (:Developer {name: "Rahul", email: "rahul@example.com"}),
        (:Developer {name: "Shivani", email: "shivani@example.com"}),
        (:Developer {name: "Arjun", email: "arjun@example.com"})
    `);
    await session.run(`
      CREATE
        (:Skill {name: "JavaScript"}),
        (:Skill {name: "React"}),
        (:Skill {name: "Python"}),
        (:Skill {name: "Node.js"}),
        (:Skill {name: "MongoDB"})
    `);
    await session.run(`
      CREATE
        (:Project {
          name: "CodeAtlas",
          description: "A platform for learning and exploring code."
        }),
        (:Project {
          name: "DevConnect",
          description: "A developer skill and project network."
        }),
        (:Project {
          name: "Interview Assistant",
          description: "A tool for interview preparation."
        })
    `);
    await session.run(`
      CREATE
        (:Technology {name: "MongoDB"}),
        (:Technology {name: "React"}),
        (:Technology {name: "Node.js"}),
        (:Technology {name: "Neo4j"})
    `);
    await session.run(`
      MATCH
        (h:Developer {name: "Hemanth Atthuluri"}),
        (js:Skill {name: "JavaScript"}),
        (react:Skill {name: "React"}),
        (node:Skill {name: "Node.js"}),
        (codeAtlas:Project {name: "CodeAtlas"}),
        (devConnect:Project {name: "DevConnect"}),
        (reactTech:Technology {name: "React"}),
        (mongoTech:Technology {name: "MongoDB"}),
        (rahul:Developer {name: "Rahul"}),
        (python:Skill {name: "Python"})

      CREATE
        (h)-[:HAS_SKILL]->(js),
        (h)-[:HAS_SKILL]->(react),
        (h)-[:HAS_SKILL]->(node),
        (h)-[:WORKED_ON]->(codeAtlas),
        (h)-[:WORKED_ON]->(devConnect),
        (codeAtlas)-[:USES]->(reactTech),
        (codeAtlas)-[:USES]->(mongoTech),
        (h)-[:KNOWS]->(rahul),
        (rahul)-[:HAS_SKILL]->(python)
    `);

    console.log("Seed completed successfully.");
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

seedDatabase();