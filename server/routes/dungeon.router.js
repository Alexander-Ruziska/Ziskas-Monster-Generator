const express = require("express");
const router = express.Router();
const {rejectUnauthenticated} = require("../modules/authentication-middleware.js");

// Simple dungeon generation endpoint (no AI art for now)
router.post("/generate", rejectUnauthenticated, async (req, res) => {
  try {
    const { theme, size } = req.body;
    
    console.log("Generating simple dungeon:", { theme, size });
    
    // For now, just return a simple success response
    // This could be expanded later to generate actual dungeon layouts
    res.json({ 
      success: true,
      message: "Dungeon generated successfully",
      theme,
      size,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Error generating dungeon:", error);
    res.status(500).json({ 
      error: "Failed to generate dungeon",
      details: error.message 
    });
  }
});

// Save dungeon configuration (for future feature - save/load dungeons)
router.post("/save", rejectUnauthenticated, async (req, res) => {
  try {
    const { dungeonData, name, description } = req.body;
    
    // For now, just return success - in the future this could save to database
    res.json({ 
      success: true, 
      message: "Dungeon saved successfully",
      dungeonId: Date.now()
    });
    
  } catch (error) {
    console.error("Error saving dungeon:", error);
    res.status(500).json({ error: "Failed to save dungeon" });
  }
});

module.exports = router;