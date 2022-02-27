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
const { Player } = require('discord-player');






// Func at start

function between(min, max) {  
	const val = Math.floor(Math.random() * max - min + 1) + min;
	consoleLog('Made Random Number! \n ' + val);
	return val;
}

async function print(logMessage, type='INFO') {

	console.log('[' + DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS) + `] [${type}] >> ` + logMessage);

}
global.consoleLog = print


consoleLog('Program Started');

// Discord client
global.client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

// Player
global.player = new Player(client);

// Commands


//
// Other files
//

require('./misc/loader')
require('./player-events')
require('./misc/deploy-commands')



	




client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}





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







process.on('uncaughtException', err => {

	// This file has a nice little message that appears at the top randomly
	// The code bellow is the random number

	const value = between(1, 5)
	console
	let stringVal = '// Ugh, even the error handler isn\'t working correctly like oh my gosh.'
	if (value >= 1) {
		let stringVal = '// PANIC PANIC PANIC WERE OUT OF COFFEE'
	}
	if (value >= 2) {
		let stringVal = '// We seem'
	}
	if (value >= 3) {
		let stringVal = '// *sips cup* this is fine'
	}
	if (value >= 4) {
		let stringVal = '// BATTLE DUCKS beaks of rage!'
	}
	if (value >= 5) {
		let stringVal = '// Hey Adora.'
	}
	consoleLog(stringVal)

	console.error('There was an uncaught error', err);
	try {
		fs.unlinkSync('./crash.txt');
	} catch {
		console.log('Seems to be the first crash! Thats... good I guess!')
	}

	fs.writeFileSync('crash.txt', `I'm sorry but a unexpected error stopped the bot!\n` + stringVal + `\n\nError Occurred at ${DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}\nError within script "index.js"\nDetails:\n${err}`); 
	
	try {
	  const data = fs.readFileSync('./crash.txt', 'utf8')
	  console.log(data)
	} catch (err) {
	  console.error(err)
	}
		process.exit(1);
	});

consoleLog('Logging In');
client.login(token);
