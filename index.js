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
const translate = require('@vitalets/google-translate-api');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);

// On Start
consoleLog('Program Started');


// Func at start

async function consoleLog(logMessage) {

	console.log('[' + DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS) + '] >> ' + logMessage);

	fs.writeFileSync
}


const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
//
// Func
//
async function translateText(text, language) {
	// Translate
	try {
		const res = await translate(text, { to: language });
		return res.text;
	}
	catch (error) {
		return false;
	}
}


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

client.on('messageReactionAdd', async (reaction, user) => {
	// When a reaction is received, check if the structure is partial

	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}


	// Now the message has been cached and is fully available
	consoleLog(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	consoleLog(`${reaction.count} user(s) have given the same reaction to this message!`);


	const contents = fs.readFileSync('flags.json');
	// Define to JSON type
	const lang = JSON.parse(contents);
	const finalLang = lang[reaction.emoji];
	const contents2 = fs.readFileSync('lang.json');
	const lang2 = JSON.parse(contents2);
	const fullLang = lang2[finalLang];
	if (finalLang === undefined) {
		console.log(`${reaction.emoji.name}`);
	} else {
		reaction.remove();
		await reaction.message.channel.sendTyping();
		const link = 'https://discord.com/channels/' + reaction.message.guildId + '/' + reaction.message.channelId + '/' + reaction.message.id;


		let trans = await translateText(reaction.message.content, finalLang);
		const is = trans.toString().includes('<@!');
		if (is) {
			trans = false;
		}
		if (trans.toString() === 'false') {
			trans = await translateText('You can\'t translate that!', finalLang);
		}

		const translated = new MessageEmbed()
	        .setColor('2B2D31')
	        .setTitle(await translateText(`Translated to ${fullLang}`, finalLang))
	        .setDescription(await translateText('Translation:', finalLang) + '\n' + trans)
			.addField(`Original Message by ${reaction.message.author.username}`, `[${reaction.message.content}](${link})`)
	        .setTimestamp();
		consoleLog((await reaction.users.fetch()).firstKey())
		reaction.message.channel.send({ embeds: [translated], ephemeral: true });
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
