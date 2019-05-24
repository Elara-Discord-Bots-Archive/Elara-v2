const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js'),
    superagent = require("superagent");
module.exports = class hugCommand extends Command {
    constructor(client) {
        super(client, {
            name: "hug",
            memberName: "hug",
            aliases: ["hugs"],
            examples: [`${client.commandPrefix}hug @user/userid`],
            description: "Hugs the user you mention/userid",
            group: "image",
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to hug?",
                    type: "user"
                }
            ]
        })
    }
    async run(message, { user }) {
        this.client.stats(this.client, "cmd", null, null, null)
    try{
        let hugs = ["https://media.tenor.com/images/c5a29b75582f26c28f5d271384f673ad/tenor.gif", "https://media.tenor.com/images/5d5565fe47af258d83b4caa2a668ccfa/tenor.gif", "https://media.tenor.com/images/564eac526a8af795c90ce5985904096e/tenor.gif", "https://media.tenor.com/images/1e058dc8d0ccd337b6d26cbab43b6e30/tenor.gif", "https://media.tenor.com/images/adbb48575b54edaabd7383010bc2510a/tenor.gif", "https://media.tenor.com/images/d2612ede953556132273ee54366d7436/tenor.gif", "https://media.tenor.com/images/1d397e7690f2947a46a1a65a075ceae8/tenor.gif", "https://media.tenor.com/images/0993a2934b1d33e64847603a6f99466e/tenor.gif", "https://media.tenor.com/images/903bebd862383d3e86c9511a2bb75c3a/tenor.gif", "https://media.tenor.com/images/807ef805d5955bf6f31b0f79d672b89c/tenor.gif","https://media.tenor.com/images/e1ec62d32ab2ca10f7eb93574384ca96/tenor.gif", "https://media.tenor.com/images/27105b422c3262319892a2249c268856/tenor.gif"]
        let random = Math.floor(Math.random() * hugs.length);
        let hugEmbed = new Discord.RichEmbed()
            .setTitle(`Hug <a:hugs:485137939710345227>`)
            .setDescription(`**${message.author}** hugged **${user}**!`)
            .setImage(hugs[random])
            .setColor("RANDOM")
        message.channel.send(hugEmbed)
    } catch (e) {
        this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
    }
}
