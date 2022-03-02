
player.on('error', (queue, error) => {
    consoleLog(`Song Queue Warn${error.message}`, 'WARN');
});

player.on('connectionError', (queue, error) => {
    consoleLog(`Connection Issue Warn ${error.message}`, 'WARN');
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    consoleLog(`Started playing {track.title}`);
});

player.on('trackAdd', (queue, track) => {
    consoleLog(`**${track.title}** was added to the playlist`);
});

player.on('botDisconnect', (queue) => {
    consoleLog('I have been kicked from the audio channel');
    player.deleteQueue(queue.guild.id);
});

player.on('channelEmpty', (queue) => {
    consoleLog('Left empty audio channel');
    player.deleteQueue(queue.guild.id);
});

player.on('queueEnd', (queue) => {
    consoleLog('Queue Finished!');
    player.deleteQueue(queue.guild.id);
});