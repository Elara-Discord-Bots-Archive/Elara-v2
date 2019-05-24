const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "bot",
            memberName: "bot",
            aliases: [],
            examples: [`${client.commandPrefix}bot <bot id here> <Permissions>`],
            description: "Gives you a invite for the bot id you provide.",
            group: "info",
            args: [
                {
                    key: 'user',
                    prompt: 'Please provide the bot id.',
                    type: 'user'
                },
                {
                    key: "perms",
                    prompt: "What perms [norole, basic, mod, admin, administrator]",
                    type: "string"
                }
            ]
        })
    }
    async run(message, { user, perms }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if(user.bot === false) return message.channel.send(`That is a user not a bot!`)
        let embed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setAuthor(user.tag,user.displayAvatarURL)
      if(perms.toLowerCase() === "norole") {
        embed.setDescription(`https://discordapp.com/oauth2/authorize?client_id=${user.id}&permissions=0&scope=bot`)
      }else 
      if(perms.toLowerCase() === "basic") {
        embed.setDescription(`https://discordapp.com/oauth2/authorize?client_id=${user.id}&permissions=120966465&scope=bot`)
      }else 
      if(perms.toLowerCase() === "mod"){
        embed.setDescription(`https://discordapp.com/oauth2/authorize?client_id=${user.id}&permissions=536210887&scope=bot`)
      }else 
      if(perms.toLowerCase() === "admin") {
        embed.setDescription(`https://discordapp.com/oauth2/authorize?client_id=${user.id}&permissions=2146958839&scope=bot`)
      }else 
      if(perms.toLowerCase() === "administrator") {
        embed.setDescription(`https://discordapp.com/oauth2/authorize?client_id=${user.id}&permissions=8&scope=bot`)
        }
        message.say(embed)
    }catch(e){
        this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel);
    }
    }
}