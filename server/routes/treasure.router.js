const express = require("express");
const OpenAI = require("openai");
const router = express.Router();
const axios = require("axios");
const {rejectUnauthenticated} = require("../modules/authentication-middleware.js");

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate treasure hoard with AI artwork
router.post("/generate", rejectUnauthenticated, async (req, res) => {
  try {
    const { treasureType, partyLevel, lootAmount, includeArtifacts } = req.body;
    
    console.log("Generating treasure:", { treasureType, partyLevel, lootAmount, includeArtifacts });

    // Generate treasure data based on parameters
    const treasureData = generateTreasureData(treasureType, partyLevel, lootAmount, includeArtifacts);
    
    // Generate AI artwork for the treasure hoard
    const artPrompt = createTreasureArtPrompt(treasureData, treasureType);
    
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: artPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid"
    });

    const imageUrl = imageResponse.data[0].url;
    console.log("DALL-E generated treasure image URL:", imageUrl);
    
    // Upload to Cloudinary
    const imageResponseData = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(imageResponseData.data).toString("base64");
    const base64String = 'data:image/png;base64,' + base64Image;
    
    const cloudinaryResponse = await cloudinary.uploader.upload(base64String, {
      folder: 'Treasure',
      public_id: `treasure_${treasureType}_${Date.now()}`,
      tags: ['treasure', 'loot', treasureType, `level-${partyLevel}`]
    });

    console.log("Cloudinary treasure upload successful:", cloudinaryResponse.secure_url);

    res.json({
      success: true,
      treasure: treasureData,
      imageUrl: cloudinaryResponse.secure_url,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Error generating treasure:", error);
    res.status(500).json({ 
      error: "Failed to generate treasure",
      details: error.message 
    });
  }
});

// Generate individual magic item with artwork
router.post("/magic-item", rejectUnauthenticated, async (req, res) => {
  try {
    const { itemType, rarity, theme } = req.body;
    
    console.log("Generating magic item:", { itemType, rarity, theme });

    // Generate magic item data
    const magicItem = generateMagicItem(itemType, rarity, theme);
    
    // Generate AI artwork for the magic item
    const artPrompt = createMagicItemArtPrompt(magicItem, theme);
    
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: artPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid"
    });

    const imageUrl = imageResponse.data[0].url;
    console.log("DALL-E generated magic item image URL:", imageUrl);
    
    // Upload to Cloudinary
    const imageResponseData = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(imageResponseData.data).toString("base64");
    const base64String = 'data:image/png;base64,' + base64Image;
    
    const cloudinaryResponse = await cloudinary.uploader.upload(base64String, {
      folder: 'MagicItems',
      public_id: `magic_item_${itemType}_${Date.now()}`,
      tags: ['magic-item', itemType, rarity, theme]
    });

    console.log("Cloudinary magic item upload successful:", cloudinaryResponse.secure_url);

    res.json({
      success: true,
      magicItem: magicItem,
      imageUrl: cloudinaryResponse.secure_url,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Error generating magic item:", error);
    res.status(500).json({ 
      error: "Failed to generate magic item",
      details: error.message 
    });
  }
});

// Helper function to generate treasure data
function generateTreasureData(treasureType, partyLevel, lootAmount, includeArtifacts) {
  const baseValue = calculateBaseValue(partyLevel, lootAmount);
  const treasure = {
    type: treasureType,
    partyLevel: parseInt(partyLevel),
    totalValue: baseValue,
    items: []
  };

  // Generate coins
  const coinValue = Math.floor(baseValue * getCoinsPercentage(treasureType));
  treasure.coins = generateCoins(coinValue);

  // Generate items based on type
  switch (treasureType) {
    case 'balanced':
      treasure.items = generateBalancedItems(baseValue - coinValue, partyLevel);
      break;
    case 'magic':
      treasure.items = generateMagicItems(baseValue - coinValue, partyLevel);
      break;
    case 'artifacts':
      treasure.items = generateArtifacts(baseValue - coinValue, partyLevel, includeArtifacts);
      break;
    case 'consumables':
      treasure.items = generateConsumables(baseValue - coinValue, partyLevel);
      break;
    case 'trinkets':
      treasure.items = generateTrinkets(baseValue - coinValue, partyLevel);
      break;
    case 'cursed':
      treasure.items = generateCursedItems(baseValue - coinValue, partyLevel);
      break;
    default:
      treasure.items = generateBalancedItems(baseValue - coinValue, partyLevel);
  }

  return treasure;
}

// Helper function to generate magic item
function generateMagicItem(itemType, rarity, theme) {
  const rarityData = {
    'common': { bonus: 0, effects: 1, value: 100 },
    'uncommon': { bonus: 1, effects: 2, value: 500 },
    'rare': { bonus: 2, effects: 3, value: 2500 },
    'very-rare': { bonus: 3, effects: 4, value: 12500 },
    'legendary': { bonus: 4, effects: 5, value: 62500 }
  };

  const rarityInfo = rarityData[rarity] || rarityData['uncommon'];
  
  return {
    name: generateItemName(itemType, theme, rarity),
    type: itemType,
    rarity: rarity,
    attunement: rarity !== 'common',
    description: generateItemDescription(itemType, theme, rarity),
    properties: generateItemProperties(itemType, theme, rarityInfo),
    value: rarityInfo.value,
    lore: generateItemLore(itemType, theme, rarity)
  };
}

// Generate treasure art prompt
function createTreasureArtPrompt(treasureData, treasureType) {
  const typePrompts = {
    'balanced': 'A balanced treasure hoard with coins, gems, magical items, and artifacts scattered across an ancient stone floor',
    'coins': 'A massive pile of golden coins, silver pieces, and precious gems overflowing from ornate chests and pouches',
    'magic': 'A collection of glowing magical items: enchanted weapons, mystical orbs, magic rings, and spell scrolls with ethereal light',
    'artifacts': 'Ancient powerful artifacts with intricate designs, glowing runes, and mystical auras surrounded by lesser treasures',
    'consumables': 'Shelves lined with colorful magical potions in glass vials, spell scrolls, and alchemical ingredients',
    'trinkets': 'A curious collection of mysterious trinkets, odd curiosities, small magical baubles, and strange artifacts',
    'cursed': 'Dark and ominous magical items with sinister auras, cursed weapons, and artifacts that seem to pulse with malevolent energy'
  };

  const basePrompt = typePrompts[treasureType] || typePrompts['balanced'];
  
  return `${basePrompt}. TECHNICAL SPECIFICATIONS: Fantasy D&D treasure hoard, highly detailed digital art, dramatic lighting with magical glows, rich colors and textures, epic fantasy game art style, 4K quality, perfect for game illustration. The scene should evoke wonder and excitement of discovering treasure.`;
}

// Generate magic item art prompt  
function createMagicItemArtPrompt(magicItem, theme) {
  const themePrompts = {
    'elemental': 'with elemental energy swirling around it, fire/ice/lightning/earth magic effects',
    'divine': 'with holy golden light, celestial symbols, and divine radiance',
    'arcane': 'with mystical purple and blue magical auras, arcane runes floating nearby',
    'nature': 'with natural wood and stone materials, growing vines, nature magic',
    'shadow': 'with dark shadowy wisps, purple void energy, mysterious dark magic',
    'time': 'with clockwork mechanisms, temporal distortions, and time magic effects'
  };

  const themeEffect = themePrompts[theme] || 'with magical energy and mystical effects';
  
  return `A ${magicItem.rarity} ${magicItem.type} called "${magicItem.name}" ${themeEffect}. TECHNICAL SPECIFICATIONS: Fantasy D&D magic item, highly detailed digital art, isolated on dramatic background, magical glow effects, rich textures, epic fantasy game art style, perfect for item illustration, 4K quality.`;
}

// Utility functions for treasure generation
function calculateBaseValue(partyLevel, lootAmount) {
  const multipliers = {
    'poor': 0.25,
    'sparse': 0.5,
    'normal': 1.0,
    'rich': 1.5,
    'royal': 3.0
  };
  
  // More dynamic base value calculation based on CR and level
  let baseValue;
  if (partyLevel <= 2) {
    baseValue = 100 + Math.floor(Math.random() * 100); // 100-200
  } else if (partyLevel <= 5) {
    baseValue = 500 + Math.floor(Math.random() * 1000); // 500-1500
  } else if (partyLevel <= 10) {
    baseValue = 2000 + Math.floor(Math.random() * 3000); // 2000-5000
  } else if (partyLevel <= 15) {
    baseValue = 8000 + Math.floor(Math.random() * 12000); // 8000-20000
  } else {
    baseValue = 25000 + Math.floor(Math.random() * 50000); // 25000-75000
  }
  
  return Math.floor(baseValue * multipliers[lootAmount]);
}

function getCoinsPercentage(treasureType) {
  const percentages = {
    'balanced': 0.4,
    'coins': 0.8,
    'magic': 0.2,
    'artifacts': 0.3,
    'consumables': 0.3,
    'trinkets': 0.4,
    'cursed': 0.3
  };
  
  return percentages[treasureType] || 0.4;
}

function generateCoins(totalValue) {
  const pp = Math.floor(totalValue / 1000);
  const remainderAfterPP = totalValue % 1000;
  const gp = Math.floor(remainderAfterPP / 100);
  const remainderAfterGP = remainderAfterPP % 100;
  const sp = Math.floor(remainderAfterGP / 10);
  const cp = remainderAfterGP % 10;
  
  return { pp, gp, sp, cp };
}

function generateBalancedItems(value, level) {
  const items = [];
  
  // Add some gems
  if (value > 100) {
    items.push({
      name: getRandomGem(),
      type: 'gem',
      value: Math.floor(Math.random() * 500) + 50,
      description: 'A beautiful precious gemstone'
    });
  }
  
  // Add art objects
  if (value > 250) {
    items.push({
      name: getRandomArtObject(),
      type: 'art',
      value: Math.floor(Math.random() * 1000) + 100,
      description: 'An exquisite work of art or craftsmanship'
    });
  }
  
  // Add magic items based on level
  if (level >= 3) {
    items.push(generateRandomMagicItem(level));
  }
  
  return items;
}

function generateMagicItems(value, level) {
  const items = [];
  const itemCount = Math.floor(value / 500) + 1;
  
  for (let i = 0; i < itemCount; i++) {
    items.push(generateRandomMagicItem(level));
  }
  
  return items;
}

function generateRandomMagicItem(level) {
  const itemTypes = ['weapon', 'armor', 'wondrous', 'potion', 'scroll', 'ring', 'wand'];
  const themes = ['elemental', 'divine', 'arcane', 'nature', 'shadow'];
  
  let rarity = 'common';
  if (level >= 5) rarity = 'uncommon';
  if (level >= 10) rarity = 'rare';
  if (level >= 15) rarity = 'very-rare';
  if (level >= 18) rarity = 'legendary';
  
  return {
    name: generateItemName(itemTypes[Math.floor(Math.random() * itemTypes.length)], themes[Math.floor(Math.random() * themes.length)], rarity),
    type: itemTypes[Math.floor(Math.random() * itemTypes.length)],
    rarity: rarity,
    description: 'A magical item with wondrous properties',
    value: getRarityValue(rarity)
  };
}

function generateItemName(itemType, theme, rarity) {
  const prefixes = {
    'elemental': ['Flaming', 'Frozen', 'Shocking', 'Earthen'],
    'divine': ['Blessed', 'Holy', 'Sacred', 'Divine'],
    'arcane': ['Arcane', 'Mystical', 'Enchanted', 'Magical'],
    'nature': ['Living', 'Growing', 'Natural', 'Wild'],
    'shadow': ['Shadow', 'Dark', 'Void', 'Cursed']
  };
  
  const itemNames = {
    'weapon': ['Sword', 'Axe', 'Bow', 'Dagger', 'Mace'],
    'armor': ['Shield', 'Plate', 'Chain Mail', 'Leather', 'Cloak'],
    'wondrous': ['Orb', 'Amulet', 'Crown', 'Gauntlets', 'Boots'],
    'ring': ['Ring', 'Band', 'Signet'],
    'wand': ['Wand', 'Rod', 'Staff']
  };
  
  const prefix = prefixes[theme][Math.floor(Math.random() * prefixes[theme].length)];
  const baseName = itemNames[itemType][Math.floor(Math.random() * itemNames[itemType].length)];
  
  return `${prefix} ${baseName}`;
}

function getRarityValue(rarity) {
  const values = {
    'common': 100,
    'uncommon': 500,
    'rare': 2500,
    'very-rare': 12500,
    'legendary': 62500
  };
  
  return values[rarity] || 100;
}

function getRandomGem() {
  const gems = ['Ruby', 'Sapphire', 'Diamond', 'Emerald', 'Amethyst', 'Topaz', 'Opal', 'Pearl'];
  return gems[Math.floor(Math.random() * gems.length)];
}

function getRandomArtObject() {
  const artObjects = ['Golden Chalice', 'Silver Statue', 'Ornate Tapestry', 'Jeweled Crown', 'Crystal Orb', 'Ivory Figurine'];
  return artObjects[Math.floor(Math.random() * artObjects.length)];
}

// Placeholder functions for other treasure types
function generateArtifacts(value, level, includeArtifacts) {
  return [generateRandomMagicItem(level)];
}

function generateConsumables(value, level) {
  return [{
    name: 'Healing Potion',
    type: 'potion',
    description: 'A magical healing potion',
    value: 50
  }];
}

function generateTrinkets(value, level) {
  return [{
    name: 'Mysterious Trinket',
    type: 'trinket',
    description: 'A curious object of unknown purpose',
    value: 25
  }];
}

function generateCursedItems(value, level) {
  return [generateRandomMagicItem(level)];
}

function generateItemDescription(itemType, theme, rarity) {
  return `A ${rarity} ${itemType} infused with ${theme} magic. This item radiates power and seems to have a mind of its own.`;
}

function generateItemProperties(itemType, theme, rarityInfo) {
  return [`+${rarityInfo.bonus} enchantment bonus`, `${theme} elemental effects`];
}

function generateItemLore(itemType, theme, rarity) {
  return `This ${itemType} was crafted by ancient masters and imbued with the power of ${theme}. Legends speak of its ${rarity} nature and the great deeds accomplished by its wielders.`;
}

module.exports = router;