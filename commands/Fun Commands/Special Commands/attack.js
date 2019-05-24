const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "attack",
            memberName: "attack",
            aliases: [],
            examples: [`${client.commandPrefix}attack`],
            description: "Sends the Attack Blob Cheer army!\n[SUPERCHIEFYT's Discord Command only.]",
            group: "special",
            guildOnly: true,
            throttling: {
            usages: 1,
            duration: 5
            },
            hidden: true
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if (!this.client.isOwner(message.author.id) && message.guild.id !== "371105897570631691" && message.channel.id !== "455141334248980484") return;
        let emoji = this.client.emojis.get("553570977695662081")
        let attack = [`
            ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji}
            ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji}
            ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji}
            ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji}
            ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji}
            ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji}
            `]
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setAuthor(`ATTACK OF THE BONGO CATS! `, emoji.url)
            .setDescription(attack)
        message.channel.send(embed)
        } catch (e) {
            message.channel.send(`ERROR:\n${e}`)
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
