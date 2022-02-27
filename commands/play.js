const { SlashCommandBuilder } = require('@discordjs/builders');
const { DateTime } = require('luxon');
const { MessageEmbed } = require('discord.js');
const { Client, Intents } = require("discord.js");
const { Player } = require("discord-player");



module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
        .setDescription('Play a song!')
        .addStringOption((option) =>
			option.setName('query').setDescription('The song name').setRequired(true),
		),
    async execute(interaction, client) {

        await interaction.deferReply();

        const query = interaction.options.get("query").value;

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel
        });

        // If user is not in a channel
        if (!interaction.member.voice.channelId) return await interaction.followUp({ content: "You are not in a voice channel!", ephemeral: true });
        
        // If user is in a different voice channel from the bots
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

        
        // verify vc connection
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
            if (!queue.playing) await queue.play();
        } catch (aer) {
            consoleLog(aer)
            return await interaction.followUp({ content: "Could not join your voice channel!", ephemeral: true });
        }

        const track = await player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `Couldn't find results for **${query}**!` });

        queue.play(track);
        // Embed
        const emb = new MessageEmbed()
            .setColor('DARK_GREEN')
            .setTitle('Success')
            .addField('Title', track.title, false)
            .addField('Author', track.author, false)
            .addField('Requested By', interaction.user.username)
            .setTimestamp();
        consoleLog(`${interaction.user.username} did /play`);
		return await interaction.followUp({ embeds: [emb], ephemeral: true });
	},
};

// Music Lit

