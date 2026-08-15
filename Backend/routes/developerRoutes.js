const express = require("express");
const controller = require("../controllers/developerController");

const router = express.Router();

router.get("/stats", controller.getGraphStats);
router.get("/skill/:skill", controller.getDevelopersBySkill);
router.get("/:name/skills", controller.getDeveloperSkills);
router.get("/:name/projects", controller.getDeveloperProjects);
router.get("/:name/network", controller.getDeveloperNetwork);
router.get("/:name", controller.getDeveloperByName);
router.get("/", controller.getDevelopers);

module.exports = router;
