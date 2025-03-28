require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const fs = require("fs");
const path = require("path");

const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.MessageContent,
];
const partials = [
  Partials.Channel,
  Partials.Message,
  Partials.User,
  Partials.Reaction,
  Partials.GuildMember,
];

const client = new Client({
  intents,
  partials,
});

const events = fs.readdirSync(path.join(__dirname, "Events"));
for (const file of events) {
  const event = require(path.join(__dirname, "Events", file));
  console.log(`[+] Event: ${event.name}`);
  client.on(event.name, (...args) => event.run(client, ...args));
}

client.login(process.env.TOKEN);