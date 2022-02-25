const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('./config.json');
const fs = require('fs');
const { cp } = require('fs/promises');
const { DateTime } = require('luxon');

async function consoleLog(logMessage) {

	console.log('[' + DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS) + '] >> ' + logMessage);

}

const contents = fs.readFileSync("lang.json");
// Define to JSON type
const jsonContent = JSON.parse(contents);
console.log((JSON.stringify(jsonContent)))
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(
	Routes.applicationCommands(clientId), { body: commands },
)
	.then(() => consoleLog('Successfully registered application commands...'))
	.catch(console.error);