const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('../config.json');
const fs = require('fs');
const { cp } = require('fs/promises');
const { DateTime } = require('luxon');

// Reset command var
const commands = [];
// Command files 'e.g. ping.js'
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));



consoleLog(commandFiles)

for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	commands.push(command.data.toJSON());
	consoleLog(JSON.stringify(command.data.toJSON()))
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(
	Routes.applicationCommands(clientId), { body: commands },
)
	// If commands are loaded...
	.then(() => consoleLog('Successfully registered application commands...'))
	.catch(console.error);