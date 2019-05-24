const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const Coins = require('../../../util/models/money.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pay',
            memberName: 'pay',
            aliases: [],
            examples: [`${client.commandPrefix}pay @user amount`],
            description: 'Pays the user you mention.',
            group: 'fun',
            guildOnly: true,
               throttling: {
                usages: 1,
                duration: 10
            },
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to pay?",
                    type: "user"
                },
                {
                    key: "amount",
                    prompt: "How many coins do you want to pay that user?",
                    type: 'integer',
                    min: 1,
                    max: 100000000
                }
            ]
        })
    }
    async run(message, {user, amount }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if(message.author.id === user.id ) return message.channel.send(`You can't pay yourself! :face_palm:`)
        if(user.bot) return message.channel.send(`Bots don't need coins :face_palm:`);
        Coins.findOne({guildID: message.guild.id, userID: message.author.id}, async (err, db) => {
            if(db){
               if(db.coins + 1 < amount){
                   return message.channel.send(`You don't have enough coins!`)
               }else{
                   db.coins = db.coins - amount
                   db.save().catch(err => console.log(err.stack))
               }
            }
            Coins.findOne({guildID: message.guild.id, userID: user.id}, async (err,data) => {
                if(!data){
                    let newdb = new Coins({
                        userTag: user.tag,
                        userID: user.id,
                        guildID: message.guild.id,
                        coins: amount
                    });
                    newdb.save().catch(err => console.log(err.stack));
                    let embed = new Discord.RichEmbed()
                    .setAuthor(user.tag, user.displayAvatarURL)
                    .setColor(`RANDOM`)
                    .setDescription(`${message.author} has given ${user}: ${amount} coins!`)
                    .setTimestamp()
                    return message.channel.send(embed)
                }else{
                    data.coins = data.coins + amount
                    data.save().catch(err => console.log(err.stack));
                    let embed = new Discord.RichEmbed()
                    .setAuthor(user.tag, user.displayAvatarURL)
                    .setColor(`RANDOM`)
                    .setDescription(`${message.author} has given ${user}: ${amount} coins!`)
                    .setTimestamp()
                    return message.channel.send(embed)
                }
            })
        })
        } catch (e) {
            this.client.error(this.client, message, e)
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
