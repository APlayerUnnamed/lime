module.exports = (client, interaction) => {
	if (!interaction.isCommand()) return;
	if (interaction.guildId === null) { // Check guild
		return;
	}

    const command = client.commands.get(interaction.commandName);



    const queue = player.getQueue(interaction.guildId);


	
	

	// Get commands
	

	// Try executing the command
	try {
		// Execute the command
		command.execute(interaction, client);
	} catch (error) {
		// On fail
		console.error(error);
		interaction.reply({ content: 'There was an internal error while executing this command! If this persists please report it!', ephemeral: true });
	}

};