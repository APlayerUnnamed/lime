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


        const queue = player.getQueue(interaction.guild.id); // Get the queue

        let vol2 = interaction.options.get('level').value;

        if (!queue) {
            const embF = new MessageEmbed().setDescription('❎⠀No Music is Playing!').setColor('#2f3136');
            return await interaction.followUp({ embeds: [embF], ephemeral: true });
        }

        let vol = vol2 * 10

        if (!interaction.member.voice.channelId) {
            const embF = new MessageEmbed().setDescription('❎⠀You are not in a voice channel!').setColor('#2f3136');
            return await interaction.reply({ embeds: [embF], ephemeral: true })
        }

        // If user is in a different voice channel from the bots
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

        try {
            if (vol <= 100 && vol >= 1) {
                queue.setVolume(vol);
                const embS = new MessageEmbed().setDescription(`✅⠀Volume set to ${vol}%`).setColor('#2f3136');
                return await interaction.reply({ embeds: [embS], ephemeral: false });
            } else {
                const embFs = new MessageEmbed().setDescription('❎⠀Thats not a valid level!').setColor('#2f3136');
                return await interaction.reply({ embeds: [embFs], ephemeral: true });
            }
            
            // Embed
            
        } catch (err) {
            const embFs = new MessageEmbed().setDescription('❎⠀Something went wrong!').setColor('#2f3136');
            return await interaction.reply({ embeds: [embFs], ephemeral: true });
        }
	},
};