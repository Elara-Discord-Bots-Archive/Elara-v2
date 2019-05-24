const Discord = require('discord.js');
const blacklisted = require('../util/models/blacklist.js');
const moment = require('moment');
module.exports.run = async (bot, guild) => {
    try{
    let client = bot;
    let db = await blacklisted.findOne({clientID: bot.user.id}, async (err, bl) => {bl})
    
    setTimeout(async () => {
    if(db.list.includes(guild.id)) return guild.leave()
    }, 5000)
    // require('../util/playing.js')(bot)
    const e = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setAuthor(`Owner: ${guild.owner.user.tag}`, guild.owner.user.displayAvatarURL)
        .setFooter(guild.name, guild.iconURL ? guild.iconURL : guild.owner.user.displayAvatarURL)
        .setThumbnail(guild.iconURL ? guild.iconURL : guild.owner.user.displayAvatarURL)
        .setTimestamp()
        .setTitle(`Server Joined`)
        .setDescription(`
        **Name: **${guild.name} (${guild.id})
        **Owner: **${guild.owner.user} \`${guild.owner.user.tag}\` (${guild.ownerID})
        **Region: **${bot.util.region[guild.region]}
        **Verification Level: **${bot.util.verifLevels[guild.verificationLevel]}
        **Member Count: **
        - Total: ${guild.memberCount}
        - Bots: ${guild.members.filter(m => m.user.bot).size}
        - Humans: ${guild.members.filter(m => !m.user.bot).size}
        **Role Count: **${guild.roles.size}
        **Emoji Count: **${guild.emojis.size}
        **Channel Count: **${guild.channels.size}
        **Large: **${guild.large ? "Yes" : "No"}
        **Created At: **${moment(guild.createdAt).format("dddd, MMMM Do YYYY")}
        `)
    bot.channels.get(bot.config.log).send(e);
    bot.owners.map(c => c.send(e))
    bot.db.findOne({ guildID: guild.id }, (err, settings) => {
        if (err) console.log(err);
        if (!settings) {
            const newSettings = new bot.db({
                guildName: guild.name,
                guildID: guild.id,
                prefix: "",
                logchannel: "",
                reportschannel: "",
                vclogs: "",
                actionlog: "",
                toggles: {user: false, mod: true, messages: true, server: true, joins: true}
            });

            newSettings.save().catch(err => console.log(err));
        }
    });
    bot.stats(bot, null, null, "guildjoin", null);
      let e2 = new Discord.RichEmbed()
      .setAuthor(client.user.tag, client.user.displayAvatarURL)
      .setColor(`#FF000`)
      .setDescription(`${guild.name} (${guild.id})\n**Member Count: **${guild.memberCount}\n**Created At: **${moment(guild.createdAt).format("dddd, MMMM Do YYYY")}\n\nWe now have ${client.guilds.size} Servers!`)
      .setTitle(`Server Joined`)
      .setTimestamp()
      .addField(`Owner`, `${guild.owner} \`${guild.owner.user.tag}\` (${guild.ownerID})`)
      .setThumbnail(guild.iconURL)
      .setFooter(guild.name, guild.iconURL)
      client.channels.get("499410445082427412").send(e2)
} catch (e) {
bot.logger(bot, guild, e.stack)
}
}
