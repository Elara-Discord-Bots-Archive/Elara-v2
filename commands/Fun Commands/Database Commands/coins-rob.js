const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const Coins = require('../../../util/models/money.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rob',
            memberName: 'rob',
            aliases: [],
            examples: [`${client.commandPrefix}rob @user`],
            description: 'Robs the user you mention',
            group: 'fun',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 100
            },
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to rob?",
                    type: "user"
                }
            ]
        })
    }
    async run(message, {user}) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if(message.author.id === user.id ) return message.channel.send(`You can't rob yourself! :face_palm:`)
        if(user.bot) return message.channel.send(`You can't rob a bot. Ahahaha`);
        if(message.guild.id === "551427856601972746" && user.id === "521397607571128331") return message.channel.send("NO U")
        if(this.client.isOwner(user.id)) return message.channel.send(`${this.client.emojis.get("536979276344328212")}`)
        if(user.id === "160851376274931712") return message.channel.send(`How dare you try to rob Mother Sabi!${this.client.emojis.get("536979276344328212")}`)
        const random = function(money) {
            let random = Math.floor(Math.random() * money)
            return random
        }
        Coins.findOne({guildID: message.guild.id, userID: message.author.id}, async (err, db) => {
                        
            Coins.findOne({guildID: message.guild.id, userID: user.id}, async (err,data) => {
                if(!data) {
                return message.channel.send(`${user.tag} doesn't have any coins for you to take!`);
                }else{
                    if(db){
                    let amount = random(data.coins);
                    if(data.coins === 1) amount = 1
                    if(data.coins === 0) return message.channel.send(`${user.tag} doesn't have any coins for you to rob!`)
                    db.coins = db.coins + amount
                    db.save().catch(err => console.log(err.stack))     
                    
                    data.coins = data.coins - amount
                    data.save().catch(err => console.log(err.stack));
                    let embed = new Discord.RichEmbed()
                    .setAuthor(user.tag, user.displayAvatarURL)
                    .setColor(`RANDOM`)
                    .setDescription(`${message.author} has robbed ${user} and got ${amount} coins!`)
                    .setTimestamp()
                    return message.channel.send(embed)
                    }
                }
            })
        })
        } catch (e) {
            this.client.error(this.client, message, e)
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
