const { SlashCommandBuilder } = require('@discordjs/builders');
const { DateTime } = require('luxon');
const { MessageEmbed } = require('discord.js');
const { Client, Intents } = require("discord.js");
const { Player } = require("discord-player");


async function consoleLog(logMessage, type='INFO') {

	console.log('[' + DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS) + `] [${type}] >> ` + logMessage);

}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
        .setDescription('Resumes the music!'),
    async execute(interaction, client) {


        const queue = player.getQueue(interaction.guild.id); // Get the queue

        
        if (!queue) {
            const embF = new MessageEmbed().setDescription('❎⠀No Music is Playing!').setColor('#2f3136');
            return await interaction.reply({ embeds: [embF], ephemeral: true });
        }

        // If user is not in a channel
        if (!interaction.member.voice.channelId) {
            const embF = new MessageEmbed().setDescription('❎⠀You are not in a voice channel!').setColor('#2f3136');
            return await interaction.reply({ embeds: [embF], ephemeral: true })
        }

        // If user is in a different voice channel from the bots
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
            const iap = new MessageEmbed().setDescription('❎⠀The music is already playing!').setColor('#2f3136');
        if (!queue.setPaused()) return await interaction.reply({ embeds: [iap], ephemeral: true });
        try {
            queue.setPaused(false);
            // Embed
            consoleLog(`${interaction.user.username} did /resume`);
            const embF = new MessageEmbed().setDescription('✅⠀Resumed the music!').setColor('#2f3136');
            return await interaction.reply({ embeds: [embF], ephemeral: false })
        } catch (err) {
            consoleLog(err)
            const embFs = new MessageEmbed().setDescription('❎⠀Something went wrong!').setColor('#2f3136');
            consoleLog(`${interaction.user.username} did /resume`);
            return await interaction.reply({ embeds: [embFs], ephemeral: true });
        }
	},
};