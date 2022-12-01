'use strict';

const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Set all commands currently in commands folder
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

  const guildId = process.env.DISCORD_TOKEN;
  const guild = client.guilds.cache.get(guildId);
  let commands;

  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.application?.commands;
  }

  commands?.create({
    name: 'help',
    description: 'Displays current bot commands',
  });

  commands?.create({
    name: 'monsters',
    description: 'Displays all currently available monsters',
  });
});

// Slash commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  client.commands.map(clientCommand => {
    if (commandName === clientCommand.name) {
      client.commands.get(clientCommand.name).execute(interaction);
    }
  });
});

// Sends message to discord channel based on user command
client.on('messageCreate', message => {
  const prefix = process.env.PREFIX;

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  client.commands.map(clientCommand => {
    if (commandName === clientCommand.name) {
      client.commands.get(clientCommand.name).execute(message, args);
    }
  });
});

client.login(process.env.DISCORD_TOKEN);
