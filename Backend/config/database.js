const neo4j = require("neo4j-driver");
const dotenv = require("dotenv");

dotenv.config();

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(process.env.COGNODB_USERNAME, process.env.COGNODB_PASSWORD),
);


module.exports = driver;