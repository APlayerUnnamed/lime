const { SlashCommandBuilder } = require('@discordjs/builders');
const { DateTime } = require('luxon');
const { MessageEmbed } = require('discord.js');

async function getLatency() {
	// Translate
	try {
        const t1 = DateTime.now();
		const res = await translate('Junk', { to: 'en' });
		const t2 = DateTime.now();
        return t2 - t1;
	}
	catch (error) {
		return false;
	}
}



async function consoleLog(logMessage, type='INFO') {

	console.log('[' + DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS) + `] [${type}] >> ` + logMessage);

}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong!'),
	async execute(interaction, client) {
        const emb = new MessageEmbed()
				.setColor('2B7031')
				.setTitle('Pong!')
				.setDescription(`Latency is ${interaction.createdTimestamp - Date.now()}ms. API Latency is ${Math.round(client.ws.ping)}ms.`)
				.setTimestamp();
			await interaction.reply({ embeds: [emb], ephemeral: true });
		consoleLog(`${interaction.user.username} did /ping`);
	},
};