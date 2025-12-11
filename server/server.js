require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser'); // Ensure body-parser is required

// Instantiate an express server:
const app = express();

// Use process.env.PORT if it exists, otherwise use 5001:
const PORT = process.env.PORT || 5001;

// Require auth-related middleware:
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const monsterRouter = require('./routes/monster.router');
const dungeonRouter = require('./routes/dungeon.router');
const treasureRouter = require('./routes/treasure.router');

// Apply middleware:
app.use(bodyParser.json({ limit: '50mb' })); // Increased payload limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

const cors = require("cors");
app.use(cors());

// Routes
app.use('/api/user', userRouter);
app.use("/api/monster", monsterRouter);
app.use('/api/dungeon', dungeonRouter);
app.use('/api/treasure', treasureRouter);

// Start the server:
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
