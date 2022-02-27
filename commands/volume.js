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
		.setName('volume')
        .setDescription('Set the bots volume!')
        .addIntegerOption((option) =>
			option.setName('level').setDescription('Volume level (1 - 10).').setRequired(true),
		),
    async execute(interaction, client) {

        await interaction.deferReply(); // Defer the reply

        const queue = player.getQueue(interaction.guild.id); // Get the queue

        let vol2 = interaction.options.get('level').value;

        let vol = vol2 * 10

        const nm = new MessageEmbed() // No music playing embed
                .setColor('RED')
                .setTitle('Failed!')
                .setDescription('No music is currently playing!')
                .setTimestamp();
            consoleLog(`${interaction.user.username} did /volume`);
        if (!queue) return await interaction.followUp({ embeds: [nm], ephemeral: true })

        

        // If user is not in a channel
        if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });

        // If user is in a different voice channel from the bots
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

        try {
            if (vol <= 100 && vol >= 1) {
                queue.setVolume(vol);
                const emb = new MessageEmbed()
                .setColor('DARK_GREEN')
                .setTitle('Success')
                .setDescription(`Volume set to ${vol}%!`)
                .setTimestamp();
                consoleLog(`${interaction.user.username} did /volume`);
                return await interaction.followUp({ embeds: [emb], ephemeral: true });
            } else {
                const emb = new MessageEmbed()
                .setColor('RED')
                .setTitle('Failed')
                .setDescription(`Volume ${interaction.options.get('level').value} is not a valid volume level!`)
                .setTimestamp();
                consoleLog(`${interaction.user.username} did /volume`);
                return await interaction.followUp({ embeds: [emb], ephemeral: true });
            }
            
            // Embed
            
        } catch (err) {
            const emb2 = new MessageEmbed()
                .setColor('RED')
                .setTitle('Failed!')
                .setDescription('Failed to set the volume, is it a real number?')
                .setTimestamp();
            consoleLog(`${interaction.user.username} did /volume`);
            return await interaction.followUp({ embeds: [emb2], ephemeral: true });
        }
	},
};