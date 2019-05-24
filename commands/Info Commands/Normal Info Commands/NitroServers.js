const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const {list1, list2, list3, list4, list5, list6, list7, list8, list9, list10} = require('../../../util/util.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "nitroservers",
            memberName: "nitroservers",
            aliases: [`nitro`],
            examples: [`${client.commandPrefix}nitroservers`],
            description: "Gives you a list of Nitro emoji servers",
            group: "info"
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let embed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setAuthor(`132 Total Servers Listed.`, this.client.user.displayAvatarURL)
        .setTitle(`Nitro Servers [1]`)
        .setDescription(`**__DISCLAIMER: IF YOU DO NOT HAVE DISCORD NITRO YOU WILL NOT BE ABLE TO USE THESE EMOJIS!__**\n**If the links are expired join the support server and tell ${this.client.owners[0].tag} to update that invite**`)
        .addField(`Emoji List [1]`, list1)
        .addField(`Emoji List [2]`, list2)
        .addField(`Emoji List [3]`, list3)
        .addField(`Emoji List [4]`, list4)
        .addField(`Emoji List [5]`, list5)
        .addField(`Emoji List [6]`, list6)
        message.say(embed).then(m => {
        let embed2 = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`Nitro Servers [2]`)
            .addField(`Emoji List [7]`, list7)
            .addField(`Emoji List [8]`, list8)
            .addField(`Emoji List [9]`, list9)
            .addField(`Emoji List [10]`, list10)
        message.say(embed2)
        });
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}