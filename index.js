require("dotenv").config();
const { Bot } = require("grammy");

const bot = new Bot(process.env.BOT_API_KEY);

//commands
require("./src/commands/start.js")(bot);

//topic
require("./src/handlers/topic.js")(bot);

//inline handler
require("./src/handlers/inline-handler.js")(bot);

//error
require("./src/handlers/error.js")(bot);

//random

bot.start();
