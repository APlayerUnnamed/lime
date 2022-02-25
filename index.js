// Discord JS
// index.js
// APlayerUnnamed


// Function Formatting
//
// example() {
//
//	data goes here
//
// }

// require()
const { DateTime } = require('luxon');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);

// On Start
consoleLog('Program Started');


// Func at start

async function consoleLog(logMessage, type='INFO') {

	console.log('[' + DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS) + `] [${type}] >> ` + logMessage);

}

// Discord client
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

//
// Func
//

// ** NONE **

//
// Commands
//
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}
let isWarn = false;

client.on('message', async (message) => {
	isWarn = false;
	if (isWarn == false) {
}

});


client.on("messageCreate", async (message) => {
	// Disregard messages the bot sent
	if (message.author.bot) return false;


	if (message.content.includes('@here') || message.content.includes('@everyone') || message.type == "REPLY") return false;

	if (message.mentions.has(client.user.id)) {
		// If a user pings the bot

		// Build the embed
		const fm1 = new MessageEmbed()
			.setColor('DARK_GREEN')
			.setDescription('Just five more minutes;');
		// Send the message
		const fm = await message.author.send({ embeds: [fm1] });
		await wait(3000);
		await message.delete();
		// Build the new message
		const fm2 = new MessageEmbed()
			.setColor('DARK_GREEN')
			.setDescription('Just five more minutes;\n    please.');
		fm.edit({ embeds: [fm2] });

	}
});

// On interaction
client.on('interactionCreate', async interaction => {

	// If interaction is not a commands
	if (!interaction.isCommand()) return;

	// Get commands
	const command = client.commands.get(interaction.commandName);

	// Try executing the command
	try {
		// Execute the command
		await command.execute(interaction, client);
	} catch (error) {
		// On fail
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.once('ready', () => {

	// Set Client Details

	try {
		// Set username
		client.user.setUsername('Translate');
		// Set status
		client.user.setActivity('/translate', { type: 'WATCHING' });
		// Change pfp
		const pfp = 'https://raw.githubusercontent.com/APlayerUnnamed/translation-bot/main/assets/translate-hd.png';
		if (client.user.avatar != pfp) {
			client.user.setAvatar(pfp);
		} else {
			consoleLog(`PFP Already Set - ${pfp}`);
		}
	
	} catch (error) {
		// On Error
		consoleLog('WARNING >> Could not set bot details');
	}
	// On Ready Messages
	consoleLog(`${client.user.username} by APlayerUnnamed is ready!`);
	consoleLog('This bot is powered by DiscordJS and Google Translate');
	

});


client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	console.log(interaction);
});

process.on('uncaughtException', err => {

	console.error('There was an uncaught error', err);
	fs.writeFileSync('crash.txt', `I'm sorry but a unexpected error stopped the bot!\n// We seem to have run out of coffee\n\nError Occurred at ${DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}\nError within script "index.js"\nDetails:\n${err}`);fs.writeFileSync('crash.txt', `I'm sorry but a unexpected error stopped the bot!\n// We seem to have run out of coffee\nError Occurred at ${new Date()}\nError within script "index.js"\nDetails:\n${err}`);
	process.exit(1);
});

consoleLog('Logging In');
client.login(token);
