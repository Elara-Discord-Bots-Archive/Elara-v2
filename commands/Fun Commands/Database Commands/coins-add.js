const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'give',
            memberName: 'give',
            aliases: [],
            guildOnly: true,
            examples: [`${client.commandPrefix}give @user amount`],
            description: 'Gives the user you provide the amount of coins you provide',
            group: 'fun',
               throttling: {
                usages: 1,
                duration: 10
            },
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to give coins to?",
                    type: "user"
                },
                {
                    key: "amount",
                    prompt: "How many coins do you want to give the person?",
                    type: 'integer',
                    min: 1,
                    max: 100000000
                }
            ]
        })
    }
    async run(message, {user, amount }) {
        try{
        if(this.client.perms(this.client, message, "MANAGE_GUILD")) return;
        if (user.bot) return message.channel.send(`You can't give coins to a bot.`)
        if (!this.client.isOwner(message.author.id)){
        if (message.author.id === user.id) return message.channel.send(`You can't add coins from yourself.`)
        }
        this.client.stats(this.client, "cmd", null, null, null);
        this.client.dbcoins.findOne({ userID: user.id, guildID: message.guild.id }, (err, db) => {
if (!db) {return message.channel.send(`There isn't a database for you, yet.`)}else {
        db.coins = db.coins + amount;
        db.save().catch(err => {
        console.log(err)
        return message.channel.send(`ERROR:\n${err}`)
        })
        let e = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setColor(`RANDOM`)
        .setTimestamp()
        .setDescription(`Added ${amount} coins to ${user}`)
        return message.channel.send(e)
}
})
}catch(e){
this.client.error(this.client, message, e);
this.client.logger(this.client, message.guild, e.stack, message, message.channel)
}
    }
}
