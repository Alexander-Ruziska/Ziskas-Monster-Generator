const express = require("express");
const OpenAI = require("openai"); 
const pool = require("../modules/pool.js");
const router = express.Router();
const axios = require("axios"); 

const cloudinary = require('cloudinary').v2;
cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET
}) 

// const url = cloudinary.url(image);

// const fs = require("fs");
const {rejectUnauthenticated} = require("../modules/authentication-middleware.js");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API key from .env
});

router.post("/upload", async (req, res) => {
  // console.log('cloudinary url',url); 
 
  res.sendStatus(201);
})

// router.post("/save", rejectUnauthenticated, async (req, res) => {
//     //TODO: this is where we will make a call to cloudinary to send the 'big ass file'
//     //we will wait for the response object, and use the img_url to persist to the monster table

//     console.log(req.body);
//     try {
//       const imageBuffer = Buffer.from(req.body.image_base64, 'base64');
//       console.log(imageBuffer);
//         const insertQuery = `
//       INSERT INTO monster (
//         hit_points, user_id, type, image_base64, name, description, strength, dexterity, constitution, intelligence,
//         wisdom, charisma, armor_class, initiative, speed, actions, legendary_actions, resistances, immunities,
//         languages, skills, senses, saving_throws, challenge_rating, size, alignment, proficiency_bonus
//       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23,
//         $24, $25, $26, $27)
//       RETURNING *;
//     `;
//     const values = [
//       req.body.hit_points, req.user.id, req.body.type, imageBuffer, req.body.name, req.body.description, req.body.strength, req.body.dexterity,
//       req.body.constitution, req.body.intelligence, req.body.wisdom, req.body.charisma, req.body.armor_class,
//       req.body.initiative, req.body.speed, JSON.stringify(req.body.actions), JSON.stringify(req.body.legendary_actions), JSON.stringify(req.body.resistances), JSON.stringify(req.body.immunities),
//       JSON.stringify(req.body.languages), JSON.stringify(req.body.skills), JSON.stringify(req.body.senses), JSON.stringify(req.body.saving_throws), req.body.challenge_rating, req.body.size,
//        req.body.alignment, req.body.proficiency_bonus
//     ];
    
//       const result = await pool.query(insertQuery, values);
      
//       res.send(result.rows);
    
//     } catch (error) {
//         console.log('Error saving monster', error);
//         res.sendStatus(500);
//     }
//   });

// router.post("/", async (req, res) => {
//   try {
//     const { name } = req.body;
//     const { challenge_rating } = req.body;
//     const { armor_class } = req.body;
//     const { environment } = req.body;
//     const { resistances } = req.body;
//     const { type } = req.body;
//     console.log("Received name:", name);

//     // Generate monster JSON data
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o",
//       messages: [
//         { role: "system", content: "You are a dungeon master. Reply strictly in JSON format with all required fields." },
//         { role: "user", content: `Create a high-quality fantasy illustration of a monster for Dungeons & Dragons 5e.

//           - Name: ${name}
//           - Type: ${type}
//           - Challenge Rating: ${challenge_rating}
//           - Armor Class: ${armor_class}
//           - Environment: ${environment}
//           - Resistances: ${resistances}
//           The creature should match the lore, style, and design of classic D&D 5e artwork, similar to the Monster Manual. It should have intricate details, a dynamic pose, and a background that reflects its environment.
//           Use a realistic yet fantastical art style with dramatic lighting, emphasizing its power, abilities, and unique traits. All values must be filled out.
//           Ensure the monster looks game-ready for a D&D campaign, with clear visual indicators of its strengths, weaknesses, and habitat.` }
//         ],
//         tools: [
//         {
//           type: "function",
//             function: {
//               name: "generate_monster",
//               parameters: {
//                 type: "object",
//                 properties: {
//                   hit_points: { type: "integer" },
//                   type: { type: "string" },
//                   name: { type: "string" },
//                   description: { type: "string" },
//                   strength: { type: "integer" },
//                   dexterity: { type: "integer" },
//                   constitution: { type: "integer" },
//                   intelligence: { type: "integer" },
//                   wisdom: { type: "integer" },
//                   charisma: { type: "integer" },
//                   speed: { type: "string" },
//                   actions: { type: "array", items: { type: "string" } },
//                   legendary_actions: { type: "array", items: { type: "string" } },
//                   armor_class: { type: "integer" },
//                   resistances: { type: "array", items: { type: "string" } },
//                   immunities: { type: "array", items: { type: "string" } },
//                   languages: { type: "array", items: { type: "string" } },
//                   senses: { type: "array", items: { type: "string" } },
//                   skills: { type: "array", items: { type: "string" } },
//                   saving_throws: { type: "array", items: { type: "string" } },
//                   challenge_rating: { type: "string" },
//                   size: { type: "string" },
//                   proficiency_bonus: { type: "string" },
//                   creature_type: { type: "string" },
//                   alignment: { type: "string" },
//                   initiative: { type: "integer" }
//                 },
//                 required: [
//                   "hit_points", "name", "description", "strength", "dexterity", "constitution",
//                   "intelligence", "wisdom", "charisma", "speed", "actions",
//                   "legendary_actions", "armor_class", "resistances", "immunities",
//                   "languages", "senses", "skills", "saving_throws",
//                   "challenge_rating", "size","proficiency_bonus", "creature_type", "alignment", "initiative"
//                 ]
//             }
//           }
//         }
//       ],
//       tool_choice: "auto"
//     });

//     // Extract and parse OpenAI's response
//     const toolCall = response.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
//     if (!toolCall) throw new Error("Missing OpenAI response data");

//      req.body = JSON.parse(toolCall); // Extract monster details

//     // Generate an image based on the monster description
//     const imageResponse = await openai.images.generate({
//       model: "dall-e-3",
//       prompt: `A detailed fantasy monster called ${req.body.name}. Description: ${req.body.description}. It is a ${req.body.size} ${req.body.creature_type} with a challenge rating of ${req.body.challenge_rating}.`,
//       size: "1024x1024",
//       n: 1
//     });

//     const imageUrl = imageResponse.data[0].url; // Extract the image URL

//     // Fetch the image and convert it to Base64
//     const imageResponseData = await axios.get(imageUrl, { responseType: "arraybuffer" });
//     const base64Image = Buffer.from(imageResponseData.data).toString("base64");

//     // Send the final response with JSON data and the Base64 image
//     res.json({
//       ...req.body,
//       image_base64: `data:image/png;base64,${base64Image}` // Base64-encoded image string
//     });

//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Failed to generate monster and image" });
//   }
// });

//____________________________________________________________________________________________________________________

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const { challenge_rating } = req.body;
    const { armor_class } = req.body;
    const { environment } = req.body;
    const { resistances } = req.body;
    const { type } = req.body;
    console.log("Received name:", name);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a dungeon master. Reply strictly in JSON format with all required fields." },
        { role: "user", content: `Create a high-quality fantasy illustration of a monster for Dungeons & Dragons 5e.

          - Name: ${name}
          - Type: ${type}
          - Challenge Rating: ${challenge_rating}
          - Armor Class: ${armor_class}
          - Environment: ${environment}
          - Resistances: ${resistances}
          The creature should match the lore, style, and design of classic D&D 5e artwork, similar to the Monster Manual. It should have intricate details, a dynamic pose, and a background that reflects its environment.
          Use a realistic yet fantastical art style with dramatic lighting, emphasizing its power, abilities, and unique traits. All values must be filled out.
          Ensure the monster looks game-ready for a D&D campaign, with clear visual indicators of its strengths, weaknesses, and habitat.` }
      ],
      response_format: {
          "type": "json_schema",
          "json_schema": {
            "name": "creature_schema",
            "strict": true,
            "schema": {
              "type": "object",
              "properties": {
                "hit_points": {
                  "type": "integer",
                  "description": "The hit points of the creature."
                },
                "type": {
                  "type": "string",
                  "description": "The type of the creature."
                },
                "name": {
                  "type": "string",
                  "description": "The name of the creature."
                },
                "description": {
                  "type": "string",
                  "description": "A description of the creature."
                },
                "strength": {
                  "type": "integer",
                  "description": "The strength attribute of the creature."
                },
                "dexterity": {
                  "type": "integer",
                  "description": "The dexterity attribute of the creature."
                },
                "constitution": {
                  "type": "integer",
                  "description": "The constitution attribute of the creature."
                },
                "intelligence": {
                  "type": "integer",
                  "description": "The intelligence attribute of the creature."
                },
                "wisdom": {
                  "type": "integer",
                  "description": "The wisdom attribute of the creature."
                },
                "charisma": {
                  "type": "integer",
                  "description": "The charisma attribute of the creature."
                },
                "speed": {
                  "type": "string",
                  "description": "The speed of the creature."
                },
                "actions": {
                  "type": "string",
                  "description": "A list of actions that the creature can perform."
                },
                "legendary_actions": {
                  "type": "string",
                  "description": "A list of legendary actions that the creature can perform."
                },
                "armor_class": {
                  "type": "integer",
                  "description": "The armor class of the creature."
                },
                "resistances": {
                  "type": "string",
                  "description": "A list of damage types that the creature is resistant to."
                },
                "immunities": {
                  "type": "string",
                  "description": "A list of damage types that the creature is immune to."
                },
                "languages": {
                  "type": "string",
                  "description": "A list of languages that the creature can speak."
                },
                "senses": {
                  "type": "string",
                  "description": "A list of senses that the creature possesses."
                },
                "skills": {
                  "type": "string",
                  "description": "A list of skills the creature possesses."
                },
                "saving_throws": {
                  "type": "string",
                  "description": "A list of saving throws the creature has proficiency in."
                },
                "challenge_rating": {
                  "type": "string",
                  "description": "The challenge rating of the creature."
                },
                "size": {
                  "type": "string",
                  "description": "The size classification of the creature."
                },
                "proficiency_bonus": {
                  "type": "string",
                  "description": "The proficiency bonus of the creature."
                },
                "creature_type": {
                  "type": "string",
                  "description": "The classification of the creature's type."
                },
                "alignment": {
                  "type": "string",
                  "description": "The alignment of the creature."
                },
                "initiative": {
                  "type": "integer",
                  "description": "The initiative modifier of the creature."
                }
              },
              "required": [
                "hit_points",
                "type",
                "name",
                "description",
                "strength",
                "dexterity",
                "constitution",
                "intelligence",
                "wisdom",
                "charisma",
                "speed",
                "actions",
                "legendary_actions",
                "armor_class",
                "resistances",
                "immunities",
                "languages",
                "senses",
                "skills",
                "saving_throws",
                "challenge_rating",
                "size",
                "proficiency_bonus",
                "creature_type",
                "alignment",
                "initiative"
              ],
            "additionalProperties": false
          }
        }
      },
      temperature: 0.78,
      max_completion_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    // Extract and parse OpenAI's response
    const unParsedJsonResponse = response.choices[0].message.content;
    if (!unParsedJsonResponse) throw new Error("Missing OpenAI response data");

     req.body = JSON.parse(unParsedJsonResponse); // Extract monster details

    // Generate an image based on the monster description
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: `A detailed fantasy monster called ${req.body.name}. Description: ${req.body.description}. It is a ${req.body.size} ${req.body.creature_type} with a challenge rating of ${req.body.challenge_rating}.`,
      size: "1024x1024",
      n: 1
    });

    const imageUrl = imageResponse.data[0].url; // Extract the image URL

    // Fetch the image and convert it to Base64
    const imageResponseData = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(imageResponseData.data).toString("base64");
   
    // Cloudinary magic here:

    const base64String = 'data:image/png;base64,'+base64Image;
    // cloudinary.uploader
    // .upload(base64String, {folder: 'Monsters'})
    // .then(result=>console.log(result));

    const cloudinaryResult = await cloudinary.uploader.upload(base64String, {folder: 'Monsters'});
    const cloudUrl = cloudinaryResult.secure_url;
    
    // Send the final response with JSON data and the Base64 image

    const insertQuery = `
      INSERT INTO monster (
        hit_points, user_id, type, image_url, name, description, strength, dexterity, constitution, intelligence,
        wisdom, charisma, armor_class, initiative, speed, actions, legendary_actions, resistances, immunities,
        languages, skills, senses, saving_throws, challenge_rating, size, alignment, proficiency_bonus
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23,
        $24, $25, $26, $27)
      RETURNING *;
    `;

    console.log(`Monster stats (req.body):`, req.body);

    const values = [
      req.body.hit_points, req.user.id, req.body.type, cloudUrl, req.body.name, req.body.description, req.body.strength, req.body.dexterity,
      req.body.constitution, req.body.intelligence, req.body.wisdom, req.body.charisma, req.body.armor_class,
      req.body.initiative, req.body.speed, req.body.actions, req.body.legendary_actions, req.body.resistances, req.body.immunities,
      req.body.languages, req.body.skills, req.body.senses, req.body.saving_throws, req.body.challenge_rating, req.body.size,
       req.body.alignment, req.body.proficiency_bonus
    ];

    console.log(`SQL Values:`, values);
    
    const lastRecord = await pool.query(insertQuery, values);

    // get the record we just inserted
    // const lastRecord = await pool.query("SELECT id FROM monster ORDER BY id DESC LIMIT 1");
// 
    res.json(lastRecord.rows[0]);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate monster and image" });
  }
});

//________________________________________________________________________________________________________________________

// Step-by-step monster generation for real progress tracking
router.post("/generate-stats", rejectUnauthenticated, async (req, res) => {
  try {
    const { name, challenge_rating, armor_class, environment, resistances, type } = req.body;
    console.log("Generating stats for:", name);

    // Generate monster stats with OpenAI (this is step 2 of 4)
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a dungeon master. Reply strictly in JSON format with all required fields." },
        { role: "user", content: `Create a monster for Dungeons & Dragons 5e.
          - Name: ${name || 'Random Monster'}
          - Type: ${type || 'Beast'}  
          - Challenge Rating: ${challenge_rating || '1'}
          - Armor Class: ${armor_class || '12'}
          - Environment: ${environment || 'Forest'}
          - Resistances: ${resistances || 'None'}
          Create complete stats, abilities, and description.` }
      ],
      response_format: {
        "type": "json_schema",
        "json_schema": {
          "name": "creature_schema",
          "strict": true,
          "schema": {
            "type": "object",
            "properties": {
              "hit_points": { "type": "integer" },
              "type": { "type": "string" },
              "name": { "type": "string" },
              "description": { "type": "string" },
              "strength": { "type": "integer" },
              "dexterity": { "type": "integer" },
              "constitution": { "type": "integer" },
              "intelligence": { "type": "integer" },
              "wisdom": { "type": "integer" },
              "charisma": { "type": "integer" },
              "speed": { "type": "string" },
              "actions": { "type": "array", "items": { "type": "string" } },
              "legendary_actions": { "type": "array", "items": { "type": "string" } },
              "armor_class": { "type": "integer" },
              "resistances": { "type": "string" },
              "immunities": { "type": "string" },
              "languages": { "type": "string" },
              "senses": { "type": "string" },
              "skills": { "type": "string" },
              "saving_throws": { "type": "string" },
              "challenge_rating": { "type": "string" },
              "size": { "type": "string" },
              "proficiency_bonus": { "type": "integer" },
              "alignment": { "type": "string" },
              "initiative": { "type": "integer" }
            },
            "required": ["hit_points", "type", "name", "description", "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma", "speed", "actions", "legendary_actions", "armor_class", "resistances", "immunities", "languages", "senses", "skills", "saving_throws", "challenge_rating", "size", "proficiency_bonus", "alignment", "initiative"],
            "additionalProperties": false
          }
        }
      },
      temperature: 0.78,
      max_completion_tokens: 2048
    });

    const monsterData = JSON.parse(response.choices[0].message.content);
    
    // Save monster to database (without image first) - matching your exact schema
    const insertQuery = `
      INSERT INTO monster (
        hit_points, user_id, type, name, description, strength, dexterity, constitution, intelligence,
        wisdom, charisma, armor_class, initiative, speed, actions, legendary_actions, resistances, immunities,
        languages, skills, senses, saving_throws, challenge_rating, size, alignment, proficiency_bonus
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
      RETURNING *;
    `;

    const values = [
      monsterData.hit_points, req.user.id, monsterData.type, monsterData.name, monsterData.description,
      monsterData.strength, monsterData.dexterity, monsterData.constitution, 
      monsterData.intelligence, monsterData.wisdom, monsterData.charisma,
      monsterData.armor_class, monsterData.initiative, monsterData.speed, 
      JSON.stringify(monsterData.actions), JSON.stringify(monsterData.legendary_actions),
      monsterData.resistances, monsterData.immunities, monsterData.languages, 
      monsterData.skills, monsterData.senses, monsterData.saving_throws, 
      monsterData.challenge_rating, monsterData.size, monsterData.alignment, 
      monsterData.proficiency_bonus
    ];

    const result = await pool.query(insertQuery, values);
    const newMonster = result.rows[0];

    res.json(newMonster);
  } catch (error) {
    console.error("Error generating monster stats:", error);
    res.status(500).json({ error: "Failed to generate monster stats" });
  }
});

router.post("/generate-image", rejectUnauthenticated, async (req, res) => {
  try {
    const { monsterId } = req.body;
    
    // Get monster data for image generation
    const monsterResult = await pool.query("SELECT * FROM monster WHERE id = $1 AND user_id = $2", [monsterId, req.user.id]);
    if (monsterResult.rows.length === 0) {
      return res.status(404).json({ error: "Monster not found" });
    }
    
    const monster = monsterResult.rows[0];

    // Generate image with DALL-E (this is step 3 of 4)
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: `A detailed fantasy monster called ${monster.name}. Description: ${monster.description}. It is a ${monster.size} ${monster.type} with a challenge rating of ${monster.challenge_rating}.`,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = imageResponse.data[0].url;
    
    // Convert to base64 and upload to Cloudinary (matching your original process)
    const imageResponseData = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(imageResponseData.data).toString("base64");
    const base64String = 'data:image/png;base64,' + base64Image;
    
    const cloudinaryResponse = await cloudinary.uploader.upload(base64String, {folder: 'Monsters'});

    // Update monster with image URL
    await pool.query(
      "UPDATE monster SET image_url = $1 WHERE id = $2",
      [cloudinaryResponse.secure_url, monsterId]
    );

    res.json({ imageUrl: cloudinaryResponse.secure_url });
  } catch (error) {
    console.error("Error generating monster image:", error);
    res.status(500).json({ error: "Failed to generate monster image" });
  }
});

//________________________________________________________________________________________________________________________


router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM monster WHERE user_id = $1 ORDER BY name ASC;",[req.user.id]);
    res.send(result.rows);
  } catch {
    res.status(500).send({ error: "Error fetching monsters" });
  }
});

// Get all monsters (admin only)
router.get("/admin", rejectUnauthenticated, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.admin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    
    const result = await pool.query("SELECT * FROM monster ORDER BY id DESC");
    res.send(result.rows);
  } catch (error) {
    console.error("Error fetching monsters:", error);
    res.status(500).json({ error: "Error fetching monsters" });
  }
});

router.get("/:id", rejectUnauthenticated, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM monster WHERE id = $1 AND user_id = $2", 
      [req.params.id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Monster not found or access denied" });
    }
    res.send(result.rows[0]);
  } catch (error) {
    console.error("Error fetching monster details", error);
    res.sendStatus(500);
  }
});

router.get("/image/:id", rejectUnauthenticated, async (req, res) => {
  const monsterId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT image_url FROM monster WHERE id = $1 AND user_id = $2 LIMIT 1",
      [monsterId, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Monster not found" });
    }
    const imageUrl = result.rows[0].image_url;
    if (!imageUrl) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.json({ image: imageUrl });
  } catch (error) {
    console.error("Error fetching monster image", error);
    res.sendStatus(500);
  }
});

router.delete("/delete/:id", rejectUnauthenticated, async (req, res) => {
  try {
    // Check if the user is an admin
    const userQuery = `SELECT "admin" FROM "user" WHERE id = $1;`;
    const userResult = await pool.query(userQuery, [req.user.id]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const isAdmin = userResult.rows[0].admin; 

    let query;
    let params;

    if (isAdmin) {
      query = `DELETE FROM "monster" WHERE "id" = $1;`;
      params = [req.params.id];
    } else {
      // Regular users can only delete their own monsters
      query = `DELETE FROM "monster" WHERE "id" = $1 AND "user_id" = $2;`;
      params = [req.params.id, req.user.id];
    }

    const result = await pool.query(query, params);

    if (result.rowCount === 0) {
      return res.status(403).json({ error: "Unauthorized to delete this monster" });
    }

    res.status(200).json({ message: "Monster deleted successfully" });
  } catch (err) {
    console.error("Error deleting monster:", err);
    res.status(500).json({ error: "Failed to delete monster" });
  }
});



router.put("/edit/:id", rejectUnauthenticated, (req, res) => {
  console.log(req.params);
  const query = `UPDATE "monster" SET "name" = $3 WHERE "id" = $1 AND "user_id" = $2;
  `;
  pool.query(query, [req.params.id, req.user.id, req.body.name]) 
    .then(result => {
    
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`Error editing backend`, err);
      res.sendStatus(500);
    })
})

module.exports = router;
