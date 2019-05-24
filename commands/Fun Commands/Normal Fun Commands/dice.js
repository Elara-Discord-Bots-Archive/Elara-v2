const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "dice",
            memberName: "dice",
            aliases: ["diceroll", "roll", "rolldice"],
            examples: [`${client.commandPrefix}dice`],
            description: "Rolls the dice",
            throttling: {
            usages: 1,
            duration: 5
            },
            group: "fun"
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        message.say(`:game_die: **${message.author.username}**, you rolled a **${Math.floor(Math.random() * 10) + 1}**!`);
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
