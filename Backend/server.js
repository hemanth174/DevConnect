const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const driver = require("./config/database");
const developerRoutes = require("./routes/developerRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await driver.verifyConnectivity();

    res.json({
      success: true,
      data: {
        backend: "ok",
        database: "connected",
      },
    });
  } catch (error) {
    console.error("Health check failed:", error);

    res.status(503).json({
      success: false,
      data: {
        backend: "ok",
        database: "unavailable",
      },
      message: "Database unavailable",
    });
  }
});
app.use("/api/developers", developerRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((error, req, res, next) => {
  console.error("Unhandled server error:", error);
  if (res.headersSent) return next(error);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  await driver.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await driver.close();
  process.exit(0);
});
