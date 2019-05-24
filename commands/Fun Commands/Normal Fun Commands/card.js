const { Command } = require('../../../util/Commando'),
    { cards } = require('../../../util/photos.js'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "card",
            memberName: "card",
            aliases: ["cards"],
            examples: [`${client.commandPrefix}card`],
            description: "Posts a random card",
            group: "fun",
            throttling: {
            usages: 1,
            duration: 5
            },
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let result = Math.floor((Math.random() * cards.length));
        let embed = new Discord.RichEmbed()
            .setColor("#FF000")
            .setDescription(`${this.client.util.emojis.eload} Loading the Card, Please Wait..`)
        let msg = await message.channel.send(embed);
        let e = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription("Heres you're card")
        .setImage(cards[result])
        msg.edit(e)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
