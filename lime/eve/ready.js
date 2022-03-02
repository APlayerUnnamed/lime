module.exports = async (client) => {
    // Set Client Details

	try {
		// Set username
		client.user.setUsername('lime');
		// Set status
		client.user.setActivity('You!', { type: 'WATCHING' });
		// Change pfp
		const pfp = 'https://raw.githubusercontent.com/APlayerUnnamed/lime/main/assets/lime-nor.png';
		
	
	} catch (error) {
		// On Error
		consoleLog('WARNING >> Could not set bot details');
	}
	// On Ready Messages
	consoleLog(`${client.user.username} by APlayerUnnamed is ready!`);
};