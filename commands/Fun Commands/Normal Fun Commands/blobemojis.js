const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "blob",
            memberName: "blob",
            aliases: [`blobemoji`],
            examples: [`${client.commandPrefix}blob`],
            description: "Posts a random blob in the chat :D",
            group: "fun",
            throttling: {
            usages: 1,
            duration: 5
            },
            clientPermissions: ["USE_EXTERNAL_EMOJIS"]
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let blob = this.client.guilds.get("390751646671568897").emojis.map(c => c)
        let result = Math.floor(Math.random() * blob.length);
        message.say(`${blob[result]}`)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
