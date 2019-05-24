const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const vhearts = require('../../../util/models/VALCOINS.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'vheartremove',
            memberName: 'vheartremove',
            aliases: [`vh-`],
            examples: [`${client.commandPrefix}vheartremove @user <amount>`],
            description: `Removes Heartagrams from the mentioned user, [Luke(VAL) only command]`,
            group: 'special',
            guildOnly: true,
            throttling: {
            usages: 1,
            duration: 5
            },
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to remove the Heartagrams from?",
                    type: "user"
                },
                {
                    key: "amount",
                    prompt: "How many heartagrams do you want to remove from the person?",
                    type: "integer",
                    min: 1,
                    max: 9999999999
                }
            ]
        })
    }
    async run(message, { user, amount }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if (user.bot) return;
        if (!this.client.isOwner(message.author.id) && !this.client.users.get('248947473161256972')) return;
        vhearts.findOne({ userID: user.id}, (err, db) => {
            if (!db) {
                return message.channel.send(`That person doesn't have any Heartagrams to remove!`);
            } else {
                db.vcoins = db.vcoins - amount;
                db.save().catch(err => {
                    console.log(err)
                    return message.channel.send(`ERROR:\n${err}`)
                })
                let e = new Discord.RichEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL)
                    .setColor(`RANDOM`)
                    .setTimestamp()
                    .setDescription(`${message.author} has Removed ${user} ${amount} <a:Heartagram:520544378104709120> Heartagrams\nNow ${user} has ${db.vcoins} Heartagrams`)
                return message.channel.send(e)
            }
        })
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
