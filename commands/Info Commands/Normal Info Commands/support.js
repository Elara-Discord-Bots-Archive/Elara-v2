const { Command } = require('../../../util/Commando');
const Discord = require('discord.js');
module.exports = class SCommand extends Command {
    constructor(client) {
        super(client, {
            name: "support",
            memberName: "support",
            aliases: [`botsupport`],
            examples: [`${client.commandPrefix}support`],
            description: "Gives you the invite to the support server",
            group: "info",
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let embed = new Discord.RichEmbed()
            .setAuthor(`Elara Support`, "https://cdn.discordapp.com/icons/499409162661396481/28c6fa39e722e2c0aea60f15ca105c1d.webp?size=2048")
            .setColor(`RANDOM`)
            .setThumbnail(`https://cdn.discordapp.com/icons/499409162661396481/28c6fa39e722e2c0aea60f15ca105c1d.webp?size=2048`)
            .setDescription(`[Support Server](${this.client.options.invite})`)
        message.say(embed)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
