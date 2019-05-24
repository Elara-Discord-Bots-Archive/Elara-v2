const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const vhearts = require('../../../util/models/VALCOINS.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'vheartadd',
            memberName: 'vheartadd',
            aliases: [`vh+`],
            examples: [`${client.commandPrefix}vhc+ @user <amount>`],
            description: `Adds Heartagrams from the mentioned user, [Luke(VAL) only command]`,
            group: 'special',
            guildOnly: true,
            throttling: {
            usages: 1,
            duration: 5
            },
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to give the VAL Coin to?",
                    type: "user"
                },
                {
                    key: "amount",
                    prompt: "How many heartagrams do you want to give the person?",
                    type: "integer",
                    min: 1,
                    max: 9999999999
                }
            ]
        })
    }
    async run(message, { user,amount }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if (user.bot) return;
        if(!this.client.isOwner(message.author.id) && !this.client.users.get('248947473161256972')) return;
        vhearts.findOne({ userID: user.id}, (err, db) => {
            if (!db) {
                let newdb = new vhearts({
                    userID: user.id,
                    userTag: user.tag,
                    vcoins: amount
                });
                newdb.save().catch(err => console.log(err));
                let e = new Discord.RichEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL)
                    .setColor(`RANDOM`)
                    .setTimestamp()
                    .setDescription(`${message.author} has given ${user} ${amount} <a:Heartagram:520544378104709120> Heartagrams\nNow ${user} has ${amount} Heartagrams!`)
                return message.channel.send(e)
            } else {
                db.vcoins = db.vcoins + amount;
                db.save().catch(err => {
                    console.log(err)
                    return message.channel.send(`ERROR:\n${err}`)
                })
                let e = new Discord.RichEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL)
                    .setColor(`RANDOM`)
                    .setTimestamp()
                    .setDescription(`${message.author} has given ${user} ${amount} <a:Heartagram:520544378104709120> Heartagrams\nNow ${user} has ${db.vcoins} Heartagrams!`)
                return message.channel.send(e)
            }
        })
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
