module.exports = (bot) => {
    let prefix = `${bot.commandPrefix}help`
    bot.user.setPresence({ status: "online", game: { name: `${prefix}`, type: "STREAMING", url: "https://www.twitch.tv/elarabots_discord" } });
    var status = [
        `${prefix} | Serving: ${bot.guilds.size} Servers, ${bot.users.size} Users, ${bot.channels.size} Channels.`,
        `${prefix} | My Support Server: ${bot.options.invite}`
    ];
    setInterval(() => {
        let gameval = Math.floor((Math.random() * status.length));
        bot.user.setPresence({ status: "online", game: { name: status[gameval], type: "STREAMING", url: "https://www.twitch.tv/elarabots_discord" } })
    }, 60000);
};