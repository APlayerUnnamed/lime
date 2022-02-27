
player.on('error', (queue, error) => {
    consoleLog(`There was a problem with the song queue => ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    consoleLog(`I'm having trouble connecting => ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    consoleLog(`🎵 Music started playing: **${track.title}** -> Channel: **${queue.connection.channel.name}** 🎧`);
});

player.on('trackAdd', (queue, track) => {
    consoleLog(`**${track.title}** added to playlist. ✅`);
});

player.on('botDisconnect', (queue) => {
    consoleLog('Someone from the audio channel Im connected to kicked me out, the whole playlist has been cleared! ❌');
    player.deleteQueue(queue.guild.id);
});

player.on('channelEmpty', (queue) => {
    consoleLog('I left the audio channel because there is no one on my audio channel. ❌');
    player.deleteQueue(queue.guild.id);
});

player.on('queueEnd', (queue) => {
    consoleLog('All play queue finished, I think you can listen to some more music. ✅');
    player.deleteQueue(queue.guild.id);
});