const Discord = require('discord.js');
const moment = require('moment');
module.exports.run = (bot, guild) => {
    if(guild.available === false) return;
    try{
    let client = bot;
    bot.db.findOneAndRemove({ guildID: guild.id }).catch((err) => console.log(err));
    bot.stats(bot, null, null, null, "guildleft");
    // require('../util/playing.js')(bot)
    const Deletedserverembed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setAuthor(`Owner: ${guild.owner.user.tag}`, guild.owner.user.displayAvatarURL)
        .setFooter(`Guild Name: ${guild.name} ID: ${guild.id}`, guild.iconURL)
        .setThumbnail(guild.iconURL ? guild.iconURL : guild.owner.user.displayAvatarURL)
        .setTimestamp()
        .setTitle(`Server Left`)
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
    bot.channels.get(bot.config.log).send(Deletedserverembed)
    bot.owners.map(c => c.send(Deletedserverembed))
      let e2 = new Discord.RichEmbed()
      .setAuthor(client.user.tag, client.user.displayAvatarURL)
      .setColor(`#FF0000`)
      .setDescription(`${guild.name} (${guild.id})\n**Member Count: **${guild.memberCount}\n**Created At: **${moment(guild.createdAt).format("dddd, MMMM Do YYYY")}\n\nWe now have ${client.guilds.size} Servers!`)
      .setTitle(`Server Left`)
      .setTimestamp()
      .addField(`Owner`, `${guild.owner} \`${guild.owner.user.tag}\` (${guild.ownerID})`)
      .setThumbnail(guild.iconURL)
      .setFooter(guild.name, guild.iconURL)
      client.channels.get("499410445082427412").send(e2)
    } catch (e) {
        bot.logger(bot, guild, e.stack)
    }
}
