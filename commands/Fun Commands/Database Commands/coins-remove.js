const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'remove',
            memberName: 'remove',
            aliases: [],
            examples: [`${client.commandPrefix}remove @user amount`],
            description: 'Removes the amount of coins from the user.',
            group: 'fun',
            guildOnly: true,
               throttling: {
                usages: 1,
                duration: 10
            },
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to remove the coins from?",
                    type: "user"
                },
                {
                    key: "amount",
                    prompt: "How many coins do you want to remove.",
                    type: 'integer',
                    min: 1,
                    max: 100000000
                }
            ]
        })
    }
    async run(message, {user, amount }) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_GUILD")) return;
        try{
        if(message.author.id === user.id) return message.channel.send(`You can't remove coins from yourself.`)
        if(user.bot) return message.channel.send(`Bots don't need coins :face_palm:`);
        this.client.dbcoins.findOne({ userID:  user.id, guildID: message.guild.id }, (err, db) => {
            if (!db) {
                return message.channel.send(`There isn't a database for you, yet.`)
            } else {
                    db.coins = db.coins - amount;
                    db.save().catch(err => {
                        console.log(err)
                        return message.channel.send(`ERROR:\n${err}`)
                    })
                    let e = new Discord.RichEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL)
                        .setColor(`RANDOM`)
                        .setTimestamp()
                        .setDescription(`Removed ${amount} coins from ${user}`)
                        return message.channel.send(e)
            }
        })
        } catch (e) {
            this.client.error(this.client, message, e)
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
