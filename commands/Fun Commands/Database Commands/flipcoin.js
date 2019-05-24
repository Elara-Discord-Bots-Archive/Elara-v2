const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'flipcoin',
             memberName: 'flipcoin',
             aliases: [],
             examples: [`${client.commandPrefix}flipcoin amount`],
             description: 'Flips the amount of coins you provide',
             group: 'fun',
             throttling: {
                usages: 1,
                duration: 10
            },
             args: [
                 {
                     key: "amount",
                     prompt: "How many coins do you want to flip?",
                     type: 'integer',
                     min: 1,
                 }
             ]
})
}
        async run(message, {amount}) {
            this.client.stats(this.client, "cmd", null, null, null)
            try{
        this.client.dbcoins.findOne({userID: message.author.id, guildID: message.guild.id}, (err, db) => {
            if(!db){
                return message.channel.send(`There isn't a database for you, yet.`)
            }else{
                if(db.coins + 1 > amount){
                    let e = new Discord.RichEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL)
                        .setColor(`RANDOM`)
                        .setTimestamp()
                    let a = [
                        "Won",
                        "Won",
                        "Won",
                        "Won",
                        "Won",
                        "Won",
                        "Won",
                        "Lost",
                        "Lost",
                        "Lost",
                        "Lost",
                        "Lost",
                        "Lost",
                        "Lost",
                        "Lost",
                        "Lost",
                        "Lost"
                    ]
                    let result = Math.floor(Math.random() * a.length);
                    if(a[result] === "Won"){
                        db.coins = db.coins + amount;
                        db.save().catch(err => console.log(err))
                        e.setDescription(`You won ${amount} coins!\nYou're balance now is ${db.coins}`)
                        return message.say(e);
                    }else{
                        db.coins = db.coins - amount;
                        db.save().catch(err => console.log(err))
                        e.setDescription(`You lost ${amount} coins!\nYou're balance now is ${db.coins}`)
                        return message.say(e)
                    }
                }else{
                    return message.channel.send(`You don't have enough coins!`)
                }
            }
        })
            } catch (e) {
                this.client.error(this.client, message, e)
                this.client.logger(this.client, message.guild, e.stack, message, message.channel)
            }
}
}
