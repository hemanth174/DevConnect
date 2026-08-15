const developerService = require("../services/developerService");

async function getDevelopers(req, res) {
  try {
    const developers = await developerService.getDevelopers();
    res.json({ success: true, data: developers });
  } catch (error) {
    console.error("getDevelopers:", error);
    res.status(500).json({ success: false, message: "Failed to load developers" });
  }
}

async function getDeveloperByName(req, res) {
  try {
    const name = req.params.name;
    const developer = await developerService.getDeveloperByName(name);

    if (!developer) {
      return res.status(404).json({ success: false, message: "Developer not found" });
    }

    res.json({ success: true, data: developer });
  } catch (error) {
    console.error("getDeveloperByName:", error);
    res.status(500).json({ success: false, message: "Failed to load developer" });
  }
}

async function getDeveloperSkills(req, res) {
  try {
    const data = await developerService.getDeveloperSkills(req.params.name);
    res.json({ success: true, data });
  } catch (error) {
    console.error("getDeveloperSkills:", error);
    res.status(500).json({ success: false, message: "Failed to load skills" });
  }
}

async function getDeveloperProjects(req, res) {
  try {
    const data = await developerService.getDeveloperProjects(req.params.name);
    res.json({ success: true, data });
  } catch (error) {
    console.error("getDeveloperProjects:", error);
    res.status(500).json({ success: false, message: "Failed to load projects" });
  }
}

async function getDeveloperNetwork(req, res) {
  try {
    const data = await developerService.getDeveloperNetwork(req.params.name);
    res.json({ success: true, data });
  } catch (error) {
    console.error("getDeveloperNetwork:", error);
    res.status(500).json({ success: false, message: "Failed to load network" });
  }
}

async function getDevelopersBySkill(req, res) {
  try {
    const data = await developerService.getDevelopersBySkill(req.params.skill);
    res.json({ success: true, data });
  } catch (error) {
    console.error("getDevelopersBySkill:", error);
    res.status(500).json({ success: false, message: "Failed to search developers" });
  }
}

async function getGraphStats(req, res) {
  try {
    const data = await developerService.getGraphStats();
    res.json({ success: true, data });
  } catch (error) {
    console.error("getGraphStats:", error);
    res.status(500).json({ success: false, message: "Failed to load graph stats" });
  }
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
