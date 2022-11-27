const { Client, GatewayIntentBits, Collection } = require('discord.js');
const axios = require('axios');
require('dotenv').config();
const fs = require('fs');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Set all commands in currently in folder
client.commands = new Collection();

const commandFiles = fs
  .readdirSync('./commands/')
  .filter(file => file.endsWith('.js'));

for (const commandFile of commandFiles) {
  const command = require(`./commands/${commandFile}`);

  client.commands.set(command.name, command);
}

// Notifies Discord Bot is online
client.once('ready', () => {
  console.log('MH Weakener is online!');
});

// Sends message to discord channel based on user command
client.on('messageCreate', async message => {
  const prefix = process.env.PREFIX;

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  client.commands.map(clientCommand => {
    if (command === clientCommand.name) {
      client.commands.get(clientCommand.name).execute(message, args);
    }
  });
});

client.login(process.env.DISCORD_TOKEN);
