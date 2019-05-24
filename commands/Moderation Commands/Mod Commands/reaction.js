const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "react",
            memberName: "react",
            aliases: [`reactlast`],
            examples: [`${client.commandPrefix}react <emoji ID/Name Here>`],
            description: "Reacts to the last message you have sent.\n[**If the bot isn't in the server that emoji comes from then it will give you the `I can't use this emoji!` error.**]",
            clientPermissions: [`USE_EXTERNAL_EMOJIS`],
            group: "mod",
            args: [
                {
                    key: 'emoji',
                    prompt: `What emoji do you want me to react with? [\`${client.commandPrefix}react <emoji ID/Name here>\`]`,
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { emoji }) {
        this.client.stats(this.client, "cmd", null, null, null)

      try{ 
          let emojimention = emoji.replace("<", "").replace('>', '').replace(':', '').replace(':', '').replace(/\d+/, "");
          if (emojimention.startsWith("a")) emojimention = emojimention.replace('a', '')
          let emoji1 = this.client.emojis.find(e => e.name === emoji || e.name === emojimention) || this.client.emojis.find(e => e.id === emoji)
          if(!emoji1) return message.say(`I can't use that emoji! \`${this.client.commandPrefix}react emoji\``)
         message.channel.fetchMessages({ limit: 2 })
            .then(messages => {
                let msg = messages.filter(c => c.author.id === message.author.id)
                msg.last().react(emoji1.id)
                message.delete().catch()
            })
        } catch(e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
         }
    }
}