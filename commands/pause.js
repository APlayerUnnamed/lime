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
		.setName('pause')
        .setDescription('Pause the music!'),
    async execute(interaction, client) {

        await interaction.deferReply(); // Defer the reply

        const queue = player.getQueue(interaction.guild.id); // Get the queue

        
        const nm = new MessageEmbed() // No music playing embed
                .setColor('RED')
                .setTitle('Failed!')
                .setDescription('No music is currently playing!')
                .setTimestamp();
            consoleLog(`${interaction.user.username} did /pause`);
        if (!queue) return interaction.followUp({ embeds: [nm], ephemeral: true })

        if (queue.isPlaying) return await interaction.reply({ content: "The music is already playing!", ephemeral: true });


        // If user is not in a channel
        if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });

        // If user is in a different voice channel from the bots
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
        const iap = new MessageEmbed() // No music playing embed
                .setColor('RED')
                .setTitle('Failed!')
                .setDescription('The music is already paused!')
                .setTimestamp();
            consoleLog(`${interaction.user.username} did /pause`);
        if (queue.setPaused()) {
            queue.setPaused(false)
            return await interaction.followUp({ embeds: [iap], ephemeral: true });
        }
        try {
            queue.setPaused(true);
            // Embed
            const emb = new MessageEmbed()
                .setColor('DARK_GREEN')
                .setTitle('Success')
                .setDescription('Music Paused!')
                .setTimestamp();
            consoleLog(`${interaction.user.username} did /pause`);
            return await interaction.followUp({ embeds: [emb], ephemeral: true });
        } catch (err) {
            const emb = new MessageEmbed()
                .setColor('RED')
                .setTitle('Failed!')
                .setDescription('Failed to pause the music, is it even playing?')
                .setTimestamp();
            consoleLog(`${interaction.user.username} did /stop`);
            return await interaction.followUp({ embeds: [emb], ephemeral: true });
        }
	},
};