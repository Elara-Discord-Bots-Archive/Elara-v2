const Discord = require('discord.js');
module.exports.run = async (bot, oldGuild, newGuild) => {
    try{
          let embed = new Discord.RichEmbed()
          .setColor(`#FF000`)
          .setTimestamp()
          .setAuthor(`Server Updated`, newGuild.iconURL)
          .addField(`Info`, `**Name:** ${newGuild.name}\n**ID:** ${newGuild.id}`)
        if(oldGuild.name !== newGuild.name) {embed.addField(`Name Change`, `**Before:** ${oldGuild.name}\n**After:** ${newGuild.name}`)}else
        if(oldGuild.iconURL !== newGuild.iconURL){embed.addField(`Icon Change`, `**Before:** ${oldGuild.iconURL ? `[Click Here](${oldGuild.iconURL})` : "None"}\n**After:** ${newGuild.iconURL ? `[Click Here](${newGuild.iconURL})` : "None"}`)}else{return;}
        bot.functions.server(bot, oldGuild, embed)
    }catch(e){
        bot.logger(bot, oldGuild, e.stack)
    }
}
