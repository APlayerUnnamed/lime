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
		.setName('next')
        .setDescription('Next song in the playlist!'),
    async execute(interaction, client) {


        const queue = player.getQueue(interaction.guild.id);

        if (!queue) {
            const embF = new MessageEmbed().setDescription('❎⠀No Music is Playing!').setColor('#2f3136');
            return await interaction.reply({ embeds: [embF], ephemeral: true });
        }




        // If user is not in a channel
        if (!interaction.member.voice.channelId) {
            const embF = new MessageEmbed().setDescription('❎⠀You are not in a voice channel!').setColor('#2f3136');
            await interaction.deleteReply()
            return await interaction.reply({ embeds: [embF], ephemeral: true })
        }
        // If user is in a different voice channel from the bots
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });


        try {
            queue.skip();
            // Embed

            consoleLog(`${interaction.user.username} did /next`);
            const embS = new MessageEmbed().setDescription('✅⠀Skipped to the next song!').setColor('#2f3136');
            return await interaction.reply({ embeds: [embS], ephemeral: false });
        } catch (err) {
            const embFs = new MessageEmbed().setDescription('❎⠀Something went wrong!').setColor('#2f3136');
            consoleLog(`${interaction.user.username} did /next`);
            return await interaction.reply({ embeds: [embFs], ephemeral: true });
        }
	},
};