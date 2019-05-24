const { Command } = require('../../../util/Commando');
const Discord = require('discord.js');
module.exports = class ShutdownCommand extends Command {
    constructor(client) {
        super(client, {
            name: "shutdown",
            memberName: 'shutdown',
            group: 'owner',
            ownerOnly: true,
            description: "Shuts down the bot",
            aliases: ["st", "die"],
            examples: [`${client.commandPrefix}shutdown`]
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null, null, "shutdown")
        try{
        message.react(this.client.util.emojis.rload)
        message.delete(15000).catch();
        const filter = m => m.author.id === message.author.id;
        message.reply("Are you sure you want to shutdown the bot? `y` or `n`, This command will timeout in 15 seconds").then(q => q.delete(15000))
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 10000
        }).then(async collected => {
            message.clearReactions()
            collected.delete(15000);
            if (collected.first().content.toLowerCase() === 'n' || collected.first().content.toLowerCase() === "no" || collected.first().content.toLowerCase() === "nah") {
                collected.first().delete(15000).catch();
                setTimeout(async () => {
                await message.react(this.client.util.emojis.nreact)
                }, 1000)
                return message.say("Shutdown Aborted").then(m => m.delete(15000).catch());
            }
            if (collected.first().content.toLowerCase() === "y" || collected.first().content.toLowerCase() === "yes" || collected.first().content.toLowerCase() === "yeah") {
                collected.first().delete(15000).catch();
                message.react(this.client.util.emojis.sreact)
                const modlogs = this.client.channels.get(this.client.config.log)
                message.say('Shutting Down :wave:').then(m => m.delete(15000).catch())
                let client = this.client;
                let botembed = new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setDescription(`Shutting Down :wave:`)
                .setTimestamp()
                .setColor(this.client.util.colors.red)
                await message.react(this.client.util.emojis.sreact);
                await modlogs.send(botembed);
                await client.destroy()
            }
        }).catch(err => {
            console.log(err)
            message.reply("Shutdown Aborted..").then(r => r.delete(15000));
        });
    } catch (e) {
    this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
    }
}